self.addEventListener("push", (event) => {
    const data = event?.data?.json();

    const options = {
        body: data.body,
        icon: "/icon.png", // Optional icon
        badge: "/badge.png",
        data: data?.url || "/",
    };

    event?.waitUntil(
        self.registration?.showNotification(data.title || "New Booking", options)
    );
});

self.addEventListener("notificationclick", (event) => {
    event?.notification?.close();
    event?.waitUntil(
        clients?.openWindow(event?.notification?.data || "/")
    );
});
