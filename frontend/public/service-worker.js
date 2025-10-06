
self.addEventListener("push", (event) => {
    if (!event.data) return;

    const data = event.data.json();
    const options = {
        body: data.body || "New booking",
        icon: "/icon.png",
        badge: "/badge.png",
        data: data.url || "/",
    };

    event.waitUntil(
        self.registration.showNotification(data.title || "New Booking", options)
    );
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    const targetUrl = event.notification.data || "/";
    event.waitUntil(clients.openWindow(targetUrl));
});

