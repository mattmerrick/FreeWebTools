'use client';
import { useState } from 'react';

const PhoneNumberGenerator = () => {
  const [countryCode, setCountryCode] = useState('+1');
  const [countryName, setCountryName] = useState('United States');
  const [phoneNumbers, setPhoneNumbers] = useState([]);

  const generatePhoneNumbers = () => {
    const newPhoneNumbers = [];
    for (let i = 0; i < 3; i++) {
      newPhoneNumbers.push(
        `${countryCode} (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`
      );
    }
    setPhoneNumbers(newPhoneNumbers);
  };

  const handleCountryChange = (e) => {
    setCountryCode(e.target.value);
    setCountryName(e.target.selectedOptions[0].dataset.country);
  };

  const copyToClipboard = () => {
    const text = phoneNumbers.join('\n');
    navigator.clipboard.writeText(text);
    alert('Phone numbers copied to clipboard!');
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Phone Number Generator</h1>
      <p className="mb-2">Country</p>
      <select onChange={handleCountryChange} className="mb-4 p-2 border rounded w-full">
        {/* Add country options here */}
        <option value="+1" data-country="United States">United States</option>
        <option value="+1" data-country="Canada">Canada</option>
        {/* Add more options as needed */}
      </select>
      <div className="mt-4">
        <button onClick={generatePhoneNumbers} className="bg-blue-500 text-white py-2 px-4 rounded w-full">Generate</button>
        <p id="generatedFor" className={phoneNumbers.length > 0 ? '' : 'hidden'}>Phone Number Generated For {countryName}</p>
        {phoneNumbers.map((number, index) => (
          <p key={index} className="text-lg">{number}</p>
        ))}
      </div>
      {phoneNumbers.length > 0 && (
        <button onClick={copyToClipboard} className="bg-green-500 text-white py-2 px-4 rounded w-full mt-4">Copy to Clipboard</button>
      )}
    </div>
  );
};

export default PhoneNumberGenerator;
