// server.js
import express from "express";
import mongoose from "mongoose";
import webpush from "web-push";
import Subscription from "./models/Subscription.model.js";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import "./cron/newsCron.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

let lastSentTitle = "";
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

app.get("/news/headlines", async (req, res) => {
  const response = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`
  );

  const titles = response.data.articles.map(a => a.title);
  res.json(titles);
});

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
      source: article.source.name,
      publishedAt: article.publishedAt
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

app.get("/sitemap.xml", async (req, res) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=50&apiKey=${process.env.NEWS_API_KEY}`
    );

    const articles = response.data.articles;

    const baseUrl = "https://globbalnews.com";

    const urls = articles.map(article => {
      const slug = article.title
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "-");

      return `
        <url>
          <loc>${baseUrl}/article/${slug}</loc>
        </url>
      `;
    }).join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${baseUrl}</loc>
        </url>
        ${urls}
      </urlset>
    `;

    res.header("Content-Type", "application/xml");
    res.send(sitemap);

  } catch (err) {
    console.error("Sitemap error:", err.message);
    res.status(500).send("Error generating sitemap");
  }
});

// -------------------------
// External cron trigger
// -------------------------
app.get("/send-news", async (req, res) => {
  try {
    console.log("🔔 External cron triggered");

    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=1&apiKey=${process.env.NEWS_API_KEY}`
    );

   const latest = response.data.articles[0];

if (!latest) {
  return res.send("No news found");
}

if (latest.title === lastSentTitle) {
  return res.send("Duplicate skipped");
}

    const payload = JSON.stringify({
      title: latest.title,
      body: latest.source.name || "Click to read more",
      url: latest.url
    });

    const subs = await Subscription.find();

    for (const sub of subs) {
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: {
              p256dh: sub.keys.p256dh,
              auth: sub.keys.auth
            }
          },
          payload
        );
      } catch (err) {
        console.error("❌ Push failed:", err.statusCode);

        if (err.statusCode === 404 || err.statusCode === 410) {
          await Subscription.deleteOne({ endpoint: sub.endpoint });
        }
      }
    }
    lastSentTitle = latest.title;
    res.send("✅ Notifications sent");

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Start server
// -------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));