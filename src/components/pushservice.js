const VAPID_PUBLIC_KEY = import.meta.env.VAPID_PUBLIC_KEY;

export async function subscribe(topic) {
  try {
    const reg = await navigator.serviceWorker.ready;

    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
    });

    const res = await fetch("https://localhost:5000/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subscription: sub, topic })
    });

    if (!res.ok) throw new Error("Failed to subscribe on server");

    return { success: true };
  } catch (err) {
    console.error("Subscription error:", err);
    return { success: false, error: err.message };
  }
}

export async function unsubscribe() {
  try {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();

    if (!sub) return { success: false, error: "No subscription found" };

    const res = await fetch("https://localhost:5000/api/unsubscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ endpoint: sub.endpoint })
    });

    if (!res.ok) throw new Error("Failed to unsubscribe on server");

    await sub.unsubscribe();

    return { success: true };
  } catch (err) {
    console.error("Unsubscribe error:", err);
    return { success: false, error: err.message };
  }
}