import api from "./api.js";

import axios from "axios";

const publicVapidKey = import.meta.env.VITE_NOTIFY_KEY; // From Step 1


export async function subscribeUser(email, send = true) {
    if (!email) { return false; }

    // 1️⃣ Check if browser supports notifications & service workers
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
        console.warn("Push notifications are not supported in this browser.");
        return false;
    }

    // 2️⃣ Register service worker
    const registration = await navigator.serviceWorker.register("/service-worker.js", { scope: "/" });

    // 3️⃣ Check if user already subscribed
    const existingSubscription = await registration.pushManager.getSubscription();
    if (existingSubscription) {
        const response = await  api.post('/api/notify-sub', {email: email, sub: JSON.stringify(existingSubscription), send: send});
        return response.data;
    }

    // 4️⃣ Ask for permission if not granted
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
        console.warn("Notification permission denied");
        return false;
    }


    const newSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });


    const response = await  api.post('/api/notify-sub', {email: email, sub: JSON.stringify(newSubscription), send: send});

    console.log("User successfully subscribed!");

    return response?.data;
}

// Helper: convert Base64 string to Uint8Array
function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}

