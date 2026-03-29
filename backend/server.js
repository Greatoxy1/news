// server.js
import express from "express";
import mongoose from "mongoose";
import webpush from "web-push";
import Subscription from "./models/Subscription.model.js";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// -------------------------
// Connect to MongoDB
// -------------------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// -------------------------
// VAPID keys for push notifications
// -------------------------
webpush.setVapidDetails(
  process.env.VAPID_EMAIL,
  process.env.VITE_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// -------------------------
// NEWS API route
// -------------------------
app.get("/news", async (req, res) => {
  const page = req.query.page || 1;

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&page=${page}&apiKey=${process.env.NEWS_API_KEY}`
    );

    const articles = response.data.articles.map(article => ({
      title: article.title,
      url: article.url,
      image: article.urlToImage,
      source: article.source.name
    }));

    res.json(articles);

  } catch (error) {
    console.error("NEWS API ERROR:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// -------------------------
// Subscribe endpoint
// -------------------------
app.post("/api/subscribe", async (req, res) => {
  const { subscription, topic } = req.body;
  await Subscription.updateOne(
    { endpoint: subscription.endpoint },
    { endpoint: subscription.endpoint, keys: subscription.keys, topic },
    { upsert: true }
  );
  res.status(201).json({ message: "Subscribed" });
});

// -------------------------
// Unsubscribe endpoint
// -------------------------
app.post("/api/unsubscribe", async (req, res) => {
  const { endpoint } = req.body;
  await Subscription.deleteOne({ endpoint });
  res.json({ message: "Unsubscribed" });
});

// -------------------------
// Send notification manually
// -------------------------
app.post("/api/notify", async (req, res) => {
  const { topic, title, body } = req.body;
  const payload = JSON.stringify({ title, body });

  const subs = await Subscription.find({ topic });

  await Promise.all(subs.map(sub =>
    webpush.sendNotification({ endpoint: sub.endpoint, keys: sub.keys }, payload)
      .catch(err => {
        if (err.statusCode === 410) Subscription.deleteOne({ endpoint: sub.endpoint });
      })
  ));

  res.json({ message: `Sent to ${subs.length} subscribers` });
});

// -------------------------
// Start server
// -------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));