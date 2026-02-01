import cron from "node-cron";
import webpush from "web-push";
import Subscription from "../models/Subscription.model.js";

cron.schedule("*/30 * * * *", async () => {
  console.log("🔔 Running news notification cron...");

  const latestNews = {
    title: "Breaking News 🚨",
    body: "Something new just happend !"
  };

  const subs = await Subscription.find({ topic: "breaking" });

  await Promise.all(
    subs.map(sub =>
      webpush.sendNotification(
        sub.subscription,
        JSON.stringify(latestNews)
      ).catch(err => console.error("Push failed:", err))
    )
  );

  console.log(`✅ Sent ${subs.length} notifications`);
});
