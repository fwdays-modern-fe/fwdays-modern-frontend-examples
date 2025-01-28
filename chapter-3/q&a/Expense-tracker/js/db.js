import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    initializeFirestore,
    persistentLocalCache,
    persistentMultipleTabManager
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js";

import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyA7NmdqcNKsXKiYUSTl1GskGlLltkQVEm4",
    authDomain: "pwa-app-c08dc.firebaseapp.com",
    projectId: "pwa-app-c08dc",
    storageBucket: "pwa-app-c08dc.firebasestorage.app",
    messagingSenderId: "862404053497",
    appId: "1:862404053497:web:7979da0e348659dfe25528"
};

// Ініціюємо Firebase
export const app = initializeApp(firebaseConfig);


// Ініціюємо Firestore
export const db = initializeFirestore(app, {
    localCache: persistentLocalCache({
        tebManager: persistentMultipleTabManager() //presistantSungleTabManager()
    })
});

// Ініціюємо Firebase Messaging
export const messaging = getMessaging(app);


// Отримуємо токен для двосторонньої комунікації
getToken(messaging, { vapidKey: '' }).then((currentToken) => {
    if (currentToken) {
        console.log('current token:', currentToken);
    } else {
        console.log('No registration token available. Request permission to generate one.');
    }
}).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
});

onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
});

// Ініціюємо Firebase Analytics
export const analytics = getAnalytics(app);

// Підписка на евенти beforeinstallprompt та appinstalled для аналітики встановлення PWA
let defferedPrompt;

window.addEventListener('beforeinstallprompt', (e) => {

    e.preventDefault();

    defferedPrompt = e;

    console.log("PWA: beforeinstallprompt fired");

    logEvent(analytics, 'pwa_install_prompt_shown', {});
});

window.addEventListener('appinstalled', (evt) => {
    console.log('PWA: appinstalled fired', evt);

    logEvent(analytics, 'pwa_app_installed', {});

    console.log('PWA: pwa_app_installed fired');
});

