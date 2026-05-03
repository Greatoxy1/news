import cron from "node-cron";
import webpush from "web-push";
import Subscription from "../models/Subscription.model.js";
import axios from "axios";

// ✅ GLOBAL variable (persists between runs)
console.log("🚀 newsCron file loaded");
let lastTitle = "";

cron.schedule("0 6 * * *", async () => {
  console.log("🔔 CRON RUNNING");

  try {
    const res = await axios.get(
      "https://news-xurb.onrender.com/news?page=1"
    );

    const latest = res.data
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))[0];
    if (!latest) return;

    // ✅ DUPLICATE CHECK
    if (latest.title === lastTitle) {
      console.log("⏭ Duplicate news skipped");
      return;
    }

    // ✅ update memory
    console.log("Latest title:", latest.title);
    console.log("Last title:", lastTitle);
    const payload = JSON.stringify({
      title: latest.title,
      body: latest.source || "Click to read more",
      url: latest.url
    });

    const subs = await Subscription.find();
    console.log("Total subs:", subs.length);
    console.log("Breaking subs:", subs.filter(s => s.topic === "breaking").length);
    await Promise.all(
      subs.map(sub =>
        webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: {
              p256dh: sub.keys.p256dh,
              auth: sub.keys.auth
            }
          },
          payload
        )
      )
    );

    console.log("✅ Sent:", latest.title);

  } catch (err) {
          console.error("❌ Push failed:", err.statusCode, err.body);

      if (err.statusCode === 410 || err.statusCode === 404) {
        await Subscription.deleteMany({});
        console.log("🗑 Removed dead subscription");
      }
  }
});