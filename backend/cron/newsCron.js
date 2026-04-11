import cron from "node-cron";
import webpush from "web-push";
import Subscription from "../models/Subscription.model.js";

cron.schedule("0 6 * * *", async () => {
  console.log("🔔 Running news notification cron...");

  const latestNews = {
    title: "Breaking News 🚨",
    body: "Something new just happened!"
  };

  try {
    const subs = await Subscription.find({ topic: "breaking" });

    await Promise.all(
      subs.map(sub =>
        webpush
          .sendNotification(
            {
              endpoint: sub.endpoint,
              keys: sub.keys
            },
            JSON.stringify(latestNews)
          )
          .catch(err => {
            console.error("Push failed:", err.statusCode);

            if (err.statusCode === 410) {
              return Subscription.deleteOne({ endpoint: sub.endpoint });
            }
          })
      )
    );

    console.log(`✅ Sent ${subs.length} notifications`);
  } catch (err) {
    console.error("Cron error:", err);
  }
});