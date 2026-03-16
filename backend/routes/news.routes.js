import express from "express";
import mongoose from "mongoose";

// Create a simple News model
const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    category: { type: String, default: "general" },
    source: { type: String, default: "Global News" },
  },
  { timestamps: true }
);

const News = mongoose.model("News", newsSchema);

const router = express.Router();

// GET all news
router.get("/", async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new news
router.post("/", async (req, res) => {
  const { title, body, category, source } = req.body;
  try {
    const newsItem = await News.create({ title, body, category, source });
    res.json({ message: "News added", newsItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;