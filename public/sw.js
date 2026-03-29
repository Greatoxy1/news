// Listen for push events
self.addEventListener("push", event => {
  const data = event.data ? event.data.json() : { title: "News Alert", body: "Click to open app" };

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "/icon.png",
    badge: "/badge.png"
  });
});

// Open app when notification is clicked
self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window" }).then(clientList => {
      if (clientList.length > 0) return clientList[0].focus();
      if (clients.openWindow) return clients.openWindow("/");
    })
  );
});