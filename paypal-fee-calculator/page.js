'use client';

import React, { useState } from 'react';
import Head from 'next/head';

const countries = [
  { name: 'United States', currency: 'USD', domesticFee: 2.9, internationalFee: 4.4 },
  { name: 'Canada', currency: 'CAD', domesticFee: 2.9, internationalFee: 3.9 },
  { name: 'United Kingdom', currency: 'GBP', domesticFee: 2.9, internationalFee: 4.4 },
  { name: 'Australia', currency: 'AUD', domesticFee: 3.6, internationalFee: 3.6 },
  { name: 'European Union', currency: 'EUR', domesticFee: 3.4, internationalFee: 3.4 },
  // Add more countries and their fees here
];

const fixedFees = {
  USD: 0.49, AUD: 0.59, CAD: 0.59, EUR: 0.39, GBP: 0.39,
  // Add more currencies and their fixed fees here
};

export default function Home() {
  const [amount, setAmount] = useState('');
  const [country, setCountry] = useState(countries[0]);
  const [feeType, setFeeType] = useState('domestic');
  const [fee, setFee] = useState(null);
  const [netAmount, setNetAmount] = useState(null);

  const calculateFee = (amount, feePercentage, currency) => {
    const fixedFee = fixedFees[currency];
    const calculatedFee = (amount * (feePercentage / 100)) + fixedFee;
    return calculatedFee.toFixed(2);
  };

  const handleCalculate = () => {
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount)) {
      const feePercentage = feeType === 'domestic' ? country.domesticFee : country.internationalFee;
      const calculatedFee = calculateFee(parsedAmount, feePercentage, country.currency);
      setFee(calculatedFee);
      setNetAmount((parsedAmount - calculatedFee).toFixed(2));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>PayPal Fee Calculator</title>
        <meta name="description" content="Calculate PayPal fees easily" />
      </Head>
      <main className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to PayPal Fee Calculator</h1>
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-4">PayPal Fee Calculator</h2>
          <input
            className="text-2xl p-4 mb-4 border border-gray-300 rounded w-full"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
          <select
            className="text-2xl p-4 mb-4 border border-gray-300 rounded w-full"
            value={country.name}
            onChange={(e) => setCountry(countries.find(c => c.name === e.target.value))}
          >
            {countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name} ({country.currency})
              </option>
            ))}
          </select>
          <select
            className="text-2xl p-4 mb-4 border border-gray-300 rounded w-full"
            value={feeType}
            onChange={(e) => setFeeType(e.target.value)}
          >
            <option value="domestic">Domestic Fee</option>
            <option value="international">International Fee</option>
          </select>
          <button 
            className="text-xl px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={handleCalculate}
          >
            Calculate
          </button>
          {fee && (
            <div className="mt-6 text-xl">
              <p>PayPal Fee: ${fee}</p>
              <p>Net Amount: ${netAmount}</p>
            </div>
          )}
        </div>
        <section className="mt-12 max-w-xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
          <p className="text-lg">
            This PayPal Fee Calculator helps you determine the fee charged by PayPal for transactions. 
            Simply enter the amount you wish to send or receive, select your country/region and the type of fee (domestic or international), 
            and click "Calculate" to see the fee and the net amount you'll get after the fee is deducted.
          </p>
        </section>
      </main>
    </div>
  );
}
