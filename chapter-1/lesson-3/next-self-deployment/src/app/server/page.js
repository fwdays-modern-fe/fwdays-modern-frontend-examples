import { Suspense } from 'react';

// Simulated data fetch with intentional delay
async function fetchData() {
    // Simulate a longer loading time (e.g., 5 seconds)
    await new Promise(resolve => setTimeout(resolve, 1000));

    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    return res.json();
}

function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-pulse text-xl font-semibold text-gray-600">
                Loading data... Please wait
            </div>
        </div>
    );
}

async function ServerContent() {
    const data = await fetchData();

    return (
        <div
            className="min-h-screen text-white flex items-center justify-center"
        >
            <p className="font-semibold text-xl">Дані отримані з серверу: {data.title}</p>
        </div>
    );
}

export default function Server() {
    return (
        <Suspense fallback={<Loading />}>
            <ServerContent />
        </Suspense>
    );
}