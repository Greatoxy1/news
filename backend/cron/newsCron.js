import cron from "node-cron";
import webpush from "web-push";
import Subscription from "../models/Subscription.model.js";
import State from "../models/State.model.js";
import axios from "axios";

console.log("🚀 newsCron file loaded");

cron.schedule("0 6 * * *", async () => {
  console.log("🔔 CRON RUNNING");

  try {
    // 🔥 Call NewsAPI directly (better than self-request)
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=1&apiKey=${process.env.NEWS_API_KEY}`
    );

    const latest = response.data.articles?.[0];
    if (!latest) return;

    // 🔒 Get last sent title from DB
    const state = await State.findOne({ key: "lastTitle" });

    if (state?.value === latest.title) {
      return;
    }

    // 💾 Save latest title BEFORE sending
    await State.updateOne(
      { key: "lastTitle" },
      { value: latest.title },
      { upsert: true }
    );

    const payload = JSON.stringify({
  title: "Test Notification " + Date.now(),
  body: "Testing push notifications",
  url: "https://globbalnews.com"
});

    const subs = await Subscription.find();
    console.log("Subscribers:", subs.length);

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

        if (err.statusCode === 410 || err.statusCode === 404) {
          await Subscription.deleteOne({ endpoint: sub.endpoint });
          console.log("🗑 Removed dead subscription");
        }
      }
    }

    console.log("✅ Sent:", latest.title);

 } catch (err) {
  console.error({
    status: err.statusCode,
    message: err.message,
    body: err.body,
  });
}
});