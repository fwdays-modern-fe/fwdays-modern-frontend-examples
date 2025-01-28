//Версії кешу
const staticCacheName= 'site-static-v11';
const dynamicCacheName= 'site-dynamic-v4';

//Стстичні файли, що ми хочемо кешувати на постійній основі
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/index.js',
    '/js/analytics.js',
    '/js/profile.js',
    '/css/styles.css',
    '/css/analytics.css',
    '/css/profile.css',

    //Для роботи з Firebase
    '/js/db.js',
    'js/expense-service.js',
    'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js',
    'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js',

    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.4/css/bulma.min.css',
    'https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&display=swap'
];

//install service worker - для кушування статичних файлів
self.addEventListener('install', evt => {
    console.log('service worker is installed', evt);

    //waitUntil - чекаємо поки кешування не буде завершено
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
});

//activate service worker - для видалення старих кешів
self.addEventListener('activate', evt => {
    
    //Чекаємо поки старі кеші не будуть видалені
    evt.waitUntil(
        caches.keys().then(keys => {
           
            //Видаляємо всі старі кеші, крім поточного
            return Promise.all(
                keys
                    .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                    .map(key => caches.delete(key))
            ).then(() => {
                console.log('Old caches have been removed.');
            });
        })
    );
});

// //fetch event - для кешування динамічних файлів та перехоплення помилок
// self.addEventListener('fetch', evt => {
//     if (evt.request.url.includes('firestore.googleapis')) {
//         return;
//     }

//     //Перевірка чи запит є на статичний файл
//     evt.respondWith(
// 		caches.match(evt.request).then(cachesRes => {
            
//             //Повертаємо кеш якщо він є, якщо ні - робимо запит на сервер
//             return cachesRes || fetch(evt.request).then(fetchRes => {

//                 //Відкриваємо динамічний кеш
//                 return caches.open(dynamicCacheName).then(cache => {

//                     //Кешуємо запит на сервер в динамічний кеш
//                     cache.put(evt.request.url, fetchRes.clone());

//                     //Виклик функції ліміту кешу
//                     limitCacheSize(dynamicCacheName, 20);

//                     //Повертаємо відповідь від сервера
//                     return fetchRes;
//                 });
//             });
//         })
//         //Перехоплення помилок та відображення сторінки fallback.html
//         .catch(() => {
//             //Також ми можемо окремо додати хендлери на різні типи файлів
//             //Наприклад повернути дефолтну картинку замість будь якої іншої
//             if (evt.request.url.indexOf('.html') > -1) {
//                 return caches.match('/pages/fallback.html')
//             }
//         })
//     );
// });


//Кеш ліміт хелпер
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                //Викликаємо рекурсивно функцію видалення кешу
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        })
    })
};