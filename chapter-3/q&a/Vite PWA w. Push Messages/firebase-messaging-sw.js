importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js')

const firebaseConfig = {
    apiKey: "AIzaSyA7NmdqcNKsXKiYUSTl1GskGlLltkQVEm4",
    authDomain: "pwa-app-c08dc.firebaseapp.com",
    projectId: "pwa-app-c08dc",
    storageBucket: "pwa-app-c08dc.firebasestorage.app",
    messagingSenderId: "862404053497",
    appId: "1:862404053497:web:7979da0e348659dfe25528"
};

const app = firebase.initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
    const { notification } = payload;
    const { title, body } = notification;

    const notificationOptions = {
        body: body,
        icon: icon || 'assets/logo.png'
    };

		self.registration.showNotification(title, notificationOptions);
});