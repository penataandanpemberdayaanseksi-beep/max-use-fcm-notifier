/* MAX-USE FCM PILOT - Service Worker */
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyAuetWAAKfKl6tApMvRUUhDKZ63tKva1Y4",
  authDomain: "max-use-fcm-pilot.firebaseapp.com",
  projectId: "max-use-fcm-pilot",
  storageBucket: "max-use-fcm-pilot.firebasestorage.app",
  messagingSenderId: "440169017283",
  appId: "1:440169017283:web:2faa1a5daba9a9600e9776"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'MAX-USE Updating';
  const options = {
    body: payload.notification?.body || 'Ada notifikasi baru dari MAX-USE.',
    icon: payload.notification?.icon || 'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png',
    badge: payload.notification?.badge || 'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png',
    tag: payload.data?.tag || 'maxuse-updating',
    data: {
      url: payload.data?.url || 'https://max-use.framer.website/updating',
      nomor: payload.data?.nomor || ''
    },
    vibrate: [220, 90, 220, 90, 320],
    requireInteraction: false
  };
  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification?.data?.url || 'https://max-use.framer.website/updating';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('max-use.framer.website') && 'focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(targetUrl);
    })
  );
});
