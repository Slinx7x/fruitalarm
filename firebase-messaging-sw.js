// ================================================================
//  FruitAlarm — firebase-messaging-sw.js
//  Service worker that receives push notifications when locked
//  Must be at the ROOT of your site (same folder as index.html)
// ================================================================

importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey:            "AIzaSyBPbVv3fEpBdu_tFWQFvJ-0V_Q5BpAIAc0",
  authDomain:        "fruitalarm.firebaseapp.com",
  projectId:         "fruitalarm",
  storageBucket:     "fruitalarm.firebasestorage.app",
  messagingSenderId: "816625926759",
  appId:             "1:816625926759:web:7142c3e01f87b9a1d30ac2",
});

const messaging = firebase.messaging();

// Handle push when app is in background or phone is locked
messaging.onBackgroundMessage(payload => {
  console.log("FruitAlarm background message:", payload);
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon:    "/icon.svg",
    badge:   "/icon.svg",
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    requireInteraction: true,  // stays on screen until user taps
    tag:     "fruit-stock-alert",
    actions: [
      { action: "open", title: "Open FruitAlarm" },
      { action: "dismiss", title: "Dismiss" },
    ],
  });
});

// When user taps the notification — open the app
self.addEventListener("notificationclick", event => {
  event.notification.close();
  if (event.action === "dismiss") return;
  event.waitUntil(
    clients.matchAll({ type:"window", includeUncontrolled:true }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow("/");
    })
  );
});
