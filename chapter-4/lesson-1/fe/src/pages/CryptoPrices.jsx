import React, { useState, useEffect } from 'react';

const CryptoPrices = () => {
    const [prices, setPrices] = useState({
        BTC: 0,
        ETH: 0,
        SOL: 0
    });

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch('http://localhost:8080/crypto');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPrices({
                    BTC: data['XXBTZUSD'] ? data['XXBTZUSD']['c'][0] : 0,
                    ETH: data['XETHZUSD'] ? data['XETHZUSD']['c'][0] : 0,
                    SOL: data['SOLUSD'] ? data['SOLUSD']['c'][0] : 0
                });
            } catch (error) {
                console.error('Failed to fetch prices:', error);
            }
        };
        fetchPrices();
        const interval = setInterval(fetchPrices, 5000);  // Refetch every 5 seconds

        return () => clearInterval(interval); // Clean up on component unmount
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(prices).map(([symbol, price]) => (
                    <div key={symbol} className="bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-2xl p-6 hover:shadow-3xl transition-shadow duration-300">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">{symbol}</h2>
                        <p className="text-4xl text-green-600 font-semibold">${parseFloat(price).toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CryptoPrices;
