'use client';

import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [liters, setLiters] = useState('');
  const [gallons, setGallons] = useState('');

  const handleLitersChange = (e) => {
    const litersValue = parseFloat(e.target.value);
    setLiters(e.target.value);
    if (!isNaN(litersValue)) {
      setGallons((litersValue * 0.264172).toFixed(2));
    } else {
      setGallons('');
    }
  };

  const handleGallonsChange = (e) => {
    const gallonsValue = parseFloat(e.target.value);
    setGallons(e.target.value);
    if (!isNaN(gallonsValue)) {
      setLiters((gallonsValue / 0.264172).toFixed(2));
    } else {
      setLiters('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Head>
        <title>Liters to Gallons Converter</title>
        <meta name="description" content="Convert liters to gallons and vice versa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Liters to Gallons Converter</h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-1/2">
              <label htmlFor="liters" className="font-semibold mb-1">Liters</label>
              <input
                type="number"
                id="liters"
                value={liters}
                onChange={handleLitersChange}
                placeholder="Enter liters"
                className="p-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="gallons" className="font-semibold mb-1">Gallons</label>
              <input
                type="number"
                id="gallons"
                value={gallons}
                onChange={handleGallonsChange}
                placeholder="Enter gallons"
                className="p-2 border rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Common Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">How many liters are in 1 gallon?</h3>
              <p>1 gallon is equal to 3.78541 liters.</p>
            </div>
            <div>
              <h3 className="font-semibold">How many gallons are in 1 liter?</h3>
              <p>1 liter is equal to 0.264172 gallons.</p>
            </div>
            <div>
              <h3 className="font-semibold">How many liters are in a US gallon?</h3>
              <p>There are 3.78541 liters in a US gallon.</p>
            </div>
            <div>
              <h3 className="font-semibold">How many liters are in an Imperial gallon?</h3>
              <p>There are 4.54609 liters in an Imperial gallon.</p>
            </div>
            <div>
              <h3 className="font-semibold">How do you convert liters to gallons?</h3>
              <p>To convert liters to gallons, multiply the number of liters by 0.264172.</p>
            </div>
            <div>
              <h3 className="font-semibold">How do you convert gallons to liters?</h3>
              <p>To convert gallons to liters, multiply the number of gallons by 3.78541.</p>
            </div>
            <div>
              <h3 className="font-semibold">Why are US and Imperial gallons different?</h3>
              <p>The US gallon is based on the wine gallon used in England prior to 1824, while the Imperial gallon is based on the British Imperial system.</p>
            </div>
            <div>
              <h3 className="font-semibold">How many liters are in a half gallon?</h3>
              <p>There are 1.89271 liters in a half gallon.</p>
            </div>
            <div>
              <h3 className="font-semibold">How many gallons are in 5 liters?</h3>
              <p>5 liters is equal to 1.32086 gallons.</p>
            </div>
            <div>
              <h3 className="font-semibold">What is the formula to convert liters to gallons?</h3>
              <p>The formula to convert liters to gallons is: gallons = liters × 0.264172.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

