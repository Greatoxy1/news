import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import webpush from "web-push";

import newsRoutes from "./routes/news.routes.js";
import authRoutes from "./routes/auth.routes.js";
import Subscription from "./models/Subscription.model.js";

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

  app.use(cors({
  origin: [
    "https://news-xurb.onrender.com",
    "https://globbalnews.com",
        "https://localhost:5173"           // for local development

  ],
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());
app.use("/news", newsRoutes);

// VAPID setup
webpush.setVapidDetails(
  process.env.VAPID_EMAIL,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// Routes
app.use("/api/auth", authRoutes);

app.get("/news", async (req, res) => {
  try {
    console.log("API KEY:", process.env.NEWS_API_KEY); // 👈 debug

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
    );

    const data = await response.json();
    console.log(data); // 👈 see what NewsAPI returns

    res.json(data.articles || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});
// Subscription endpoints
app.post("/api/subscribe", async (req, res) => {
  const { subscription, topic } = req.body;
  await Subscription.updateOne(
    { endpoint: subscription.endpoint },
    { endpoint: subscription.endpoint, keys: subscription.keys, topic },
    { upsert: true }
  );
  res.status(201).json({ message: "Subscribed" });
});

app.post("/api/unsubscribe", async (req, res) => {
  const { endpoint } = req.body;
  await Subscription.deleteOne({ endpoint });
  res.json({ message: "Unsubscribed" });
});


// Trigger notifications manually
app.post("/api/notify", async (req, res) => {
  const { topic, title, body } = req.body;
  const payload = JSON.stringify({ title, body });
  const subs = await Subscription.find({ topic });
  await Promise.all(subs.map(sub =>
    webpush.sendNotification({ endpoint: sub.endpoint, keys: sub.keys }, payload)
      .catch(err => { if (err.statusCode === 410) Subscription.deleteOne({ endpoint: sub.endpoint }); })
  ));
  res.json({ message: `Sent to ${subs.length} subscribers` });
});

app.get("/", (_, res) => res.send("Backend running ✅"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));