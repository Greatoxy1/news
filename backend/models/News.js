import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  image: String,
  publishedAt: Date
});

export default mongoose.model("News", newsSchema);