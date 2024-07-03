'use client';

import { useState } from 'react';

const Home = () => {
  const [length, setLength] = useState(12);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [customSymbols, setCustomSymbols] = useState(false);
  const [customSymbolsInput, setCustomSymbolsInput] = useState('!@#$%^&*()_+~`|}{[]:;?><,./-=');
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const defaultSymbolChars = '@#$';
    let charSet = '';
    
    if (uppercase) charSet += upperChars;
    if (lowercase) charSet += lowerChars;
    if (numbers) charSet += numberChars;
    if (symbols) charSet += defaultSymbolChars;
    if (customSymbols) charSet += customSymbolsInput;

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      generatedPassword += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }

    setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard');
  };

  const embeddedCode = `
    <div id="password-generator"></div>
    <script src="https://nichetools.net/password-generator.js"></script>
  `;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-4">
      <h1 className="text-4xl font-bold mb-6">Strong Password Generator</h1>
      
      <div className="w-full max-w-md  p-6 rounded shadow-md">
        <label htmlFor="length" className="block text-lg font-medium mb-2">Password Length:</label>
        <input 
          type="number" 
          id="length" 
          value={length} 
          onChange={(e) => setLength(e.target.value)} 
          min="8" max="128" 
          className="w-full p-2 border rounded mb-4"
        />

        <div className="flex items-center mb-2">
          <input 
            type="checkbox" 
            id="uppercase" 
            checked={uppercase} 
            onChange={(e) => setUppercase(e.target.checked)} 
            className="mr-2"
          />
          <label htmlFor="uppercase" className="text-lg">Uppercase</label>
        </div>

        <div className="flex items-center mb-2">
          <input 
            type="checkbox" 
            id="lowercase" 
            checked={lowercase} 
            onChange={(e) => setLowercase(e.target.checked)} 
            className="mr-2"
          />
          <label htmlFor="lowercase" className="text-lg">Lowercase</label>
        </div>

        <div className="flex items-center mb-2">
          <input 
            type="checkbox" 
            id="numbers" 
            checked={numbers} 
            onChange={(e) => setNumbers(e.target.checked)} 
            className="mr-2"
          />
          <label htmlFor="numbers" className="text-lg">Numbers</label>
        </div>

        <div className="flex items-center mb-2">
          <input 
            type="checkbox" 
            id="symbols" 
            checked={symbols} 
            onChange={(e) => setSymbols(e.target.checked)} 
            className="mr-2"
          />
          <label htmlFor="symbols" className="text-lg">Symbols</label>
        </div>

        <div className="flex items-center mb-2">
          <input 
            type="checkbox" 
            id="customSymbols" 
            checked={customSymbols} 
            onChange={(e) => setCustomSymbols(e.target.checked)} 
            className="mr-2"
          />
          <label htmlFor="customSymbols" className="text-lg">Custom Symbols</label>
        </div>
        <input 
          type="text" 
          id="customSymbolsInput" 
          value={customSymbolsInput} 
          onChange={(e) => setCustomSymbolsInput(e.target.value)} 
          className="w-full p-2 border rounded mb-4" 
          disabled={!customSymbols}
        />

        <button 
          onClick={generatePassword} 
          className="w-full bg-blue-500 text-white p-2 rounded mb-4"
        >
          Generate Password
        </button>

        <input 
          type="text" 
          value={password} 
          readOnly 
          className="w-full p-2 border rounded mb-4 text-lg font-bold"
        />
        
        <button 
          onClick={copyToClipboard} 
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Copy to Clipboard
        </button>
      </div>

      <div className="w-full max-w-md  p-6 rounded shadow-md mt-6">
        <h2 className="text-2xl font-bold mb-4">Embed this generator on your site</h2>
        <textarea
          readOnly
          value={embeddedCode}
          className="w-full p-2 border rounded mb-4"
          rows="4"
        />
        <button
          onClick={() => navigator.clipboard.writeText(embeddedCode)}
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Copy Embed Code
        </button>
        <br></br>
        <p>Powered by <a href="/">Niche Tools</a></p>
      </div>
    </div>
  );
};

export default Home;
