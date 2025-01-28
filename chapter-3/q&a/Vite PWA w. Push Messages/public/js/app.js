if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js').then((registration) => {
        console.log('Firebase Messaging service worker registered:', registration);
    }).catch((error) => {
        console.error('Firebase Messaging service worker registration failed:', error);
    });
}