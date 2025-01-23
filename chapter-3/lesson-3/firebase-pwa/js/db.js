import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    initializeFirestore,
    persistentLocalCache,
    persistentMultipleTabManager
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
        tabManager: persistentMultipleTabManager()
    })
});