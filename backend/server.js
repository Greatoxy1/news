import dotenv from "dotenv";
dotenv.config();

import express from "express";
import webpush from "web-push";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.routes.js";
import Subscription from "./models/Subscription.model.js";

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is missing in .env");
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

webpush.setVapidDetails(
  process.env.VAPID_EMAIL,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

app.post("/api/subscribe", async (req, res) => {
  const { subscription, topic } = req.body;

  try {
    await Subscription.updateOne(
      { endpoint: subscription.endpoint },
      {
        endpoint: subscription.endpoint,
        keys: subscription.keys,
        topic
      },
      { upsert: true }
    );

    res.status(201).json({ message: "Subscribed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/unsubscribe", async (req, res) => {
  const { endpoint } = req.body;
  await Subscription.deleteOne({ endpoint });
  res.json({ message: "Unsubscribed" });
});

app.post("/api/notify", async (req, res) => {
   console.log("🔥 /api/notify HIT");
  const { topic, title, body } = req.body;
  const payload = JSON.stringify({ title, body });

  try {
    const subs = await Subscription.find({ topic });
    console.log(`Sending notification to ${subs.length} subscribers`);

    await Promise.all(
      subs.map(sub =>
        webpush
          .sendNotification(
            { endpoint: sub.endpoint, keys: sub.keys },
            payload
          )
          .catch(err => {
            if (err.statusCode === 410) {
              return Subscription.deleteOne({ endpoint: sub.endpoint });
            }
            console.error("Push error:", err.statusCode);
          })
      )
    );

    res.json({ message: "Notifications sent" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (_, res) => res.send("Backend running ✅"));

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
