import { useState, useEffect } from "react";
import axios from "axios";

function Subscribe() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js")
        .then(() => console.log("Service Worker registered"))
        .catch(err => console.error("SW registration failed:", err));
    }
  }, []);

  const handleSubscribe = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          import.meta.env.VITE_VAPID_PUBLIC_KEY
        ),
      });

      await axios.post("https://news-xurb.onrender.com/news/api/subscribe", {
        subscription,
        topic: "breaking"
      });

      setMessage("Subscribed successfully! 🔔");
    } catch (err) {
      console.error(err);
      setMessage("Subscription failed.");
    }
  };

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
  }

  return (
    <div>
      <h3>Subscribe to Globbal News</h3>
      <button onClick={handleSubscribe}>Subscribe</button>
      <p>{message}</p>
    </div>
  );
}

export default Subscribe;