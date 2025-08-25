import { notifications } from "@mantine/notifications";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: "dexa-hr-c6973.firebaseapp.com",
  projectId: "dexa-hr-c6973",
  storageBucket: "dexa-hr-c6973.firebasestorage.app",
  messagingSenderId: "385543288136",
  appId: "1:385543288136:web:7c31e76f0c4616b0616f7d",
  measurementId: "G-B18G168NVN"
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);

// Get FCM token for push notification
export const requestNotificationPermission = async () => {
  try {
    const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");

    const token = await getToken(messaging, { 
      vapidKey: "BIB6OYgu4qmSG9MalBHrHfkTwB9od3z6-9CNt8VFbLlQaNHLWDnJvuoSmWb63QEPm5J8gZ-mik49juyyatIleYk",
      serviceWorkerRegistration: registration
    });
    return token;
  } catch (err) {
    console.error("Error getting token", err);
  }
};

// Listener for foreground notifications
onMessage(messaging, (payload) => {
  console.log("Message received:", payload);

  notifications.show({
    title: payload.notification?.title || "New Notification",
    message: payload.notification?.body || "You have a new message",
    color: "yellow",
  });
});