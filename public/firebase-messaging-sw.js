/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCR8o-i3M4fGZB_hmUc9USi27fcuJ5TMfM",
  authDomain: "dexa-hr-c6973.firebaseapp.com",
  projectId: "dexa-hr-c6973",
  storageBucket: "dexa-hr-c6973.firebasestorage.app",
  messagingSenderId: "385543288136",
  appId: "1:385543288136:web:7c31e76f0c4616b0616f7d",
  measurementId: "G-B18G168NVN"
});

const messaging = firebase.messaging();

// This handles background notifications
messaging.onBackgroundMessage(function(payload) {
  console.log("Received background message ", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logo192.png"
  });
});
