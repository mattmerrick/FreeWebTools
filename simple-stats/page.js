'use client';

import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

export default function AwesomeStats() {
  const [background, setBackground] = useState('bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600');
  const [header, setHeader] = useState('5000');
  const [headerSize, setHeaderSize] = useState(60);
  const [subheader, setSubheader] = useState('Followers');
  const [subheaderSize, setSubheaderSize] = useState(24);
  const cardRef = useRef(null);

  const handleExport = async () => {
    const canvas = await html2canvas(cardRef.current);
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'stats-card.png';
    link.click();
  };

  const resetForm = () => {
    setHeader('5000');
    setHeaderSize(60);
    setSubheader('Followers');
    setSubheaderSize(24);
    setBackground('bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600');
  };

  return (
    <div className="flex flex-col w-screen h-screen">
      <main className="flex flex-col md:flex-row items-center justify-center flex-grow p-6">
        <div className="rounded-lg p-6 w-full md:w-1/3">
          <h3 className="text-2xl font-semibold mb-4">Simple Stats</h3>
          <p className="mb-6">Share Simple Stats for your followers on social media like X, Instagram, Facebook and more.</p>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium leading-none">Background</label>
              <div role="radiogroup" className="grid grid-cols-6 gap-2.5">
                {[
                  'bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600',
                  'bg-gradient-to-br from-red-500 via-pink-500 to-violet-500',
                  'bg-gradient-to-tr from-violet-800 via-pink-600 to-orange-500',
                  'bg-gradient-to-r from-orange-400 to-rose-400',
                  'bg-gradient-to-r from-[#4284DB] to-[#29EAC4]',
                  'bg-gradient-to-br from-[#fc00ff] to-[#00dbde]',
                  'bg-gradient-to-br from-[#25b3fb] via-[#fa8ae4] to-[#fcce5b]',
                  'bg-gradient-to-br from-[#86efac] via-[#3b82f6] to-[#9333ea]',
                  'bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400',
                  'bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500',
                  'bg-gradient-to-r from-pink-500 to-rose-500',
                  'bg-gradient-to-r from-teal-400 to-yellow-200'
                ].map((bg, index) => (
                  <label key={index} className="hover:cursor-pointer">
                    <input type="radio" name="background" value={bg} onChange={() => setBackground(bg)} />
                    <div className={`w-10 h-10 rounded-md ${bg}`}></div>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium leading-none">Header</label>
              <input
                className="flex h-9 w-full rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                id="header"
                value={header}
                onChange={(e) => setHeader(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2.5 mb-1">
              <label className="text-sm font-medium leading-none">Header Size</label>
              <input
                type="range"
                min="30"
                max="90"
                value={headerSize}
                onChange={(e) => setHeaderSize(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium leading-none">Subheader</label>
              <input
                className="flex h-9 w-full rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                id="subheader"
                value={subheader}
                onChange={(e) => setSubheader(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2.5 mb-1">
              <label className="text-sm font-medium leading-none">Subheader Size</label>
              <input
                type="range"
                min="14"
                max="44"
                value={subheaderSize}
                onChange={(e) => setSubheaderSize(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleExport}
                className="bg-primary text-white px-4 py-2 rounded-md shadow hover:bg-primary/90 flex items-center space-x-2"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <div>Export</div>
              </button>
              <button onClick={resetForm} className="bg-secondary text-white px-4 py-2 rounded-md shadow hover:bg-secondary/80">
                Reset
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full h-full flex justify-center md:items-center">
          <div className="h-fit w-fit rounded-lg overflow-clip">
            <div ref={cardRef} className={`relative w-[340px] md:w-[480px] aspect-[16/9] ${background}`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col gap-2 justify-center py-2 px-3 items-center min-h-[4rem] w-80">
                  <div className="font-bold text-white text-center" style={{ fontSize: `${headerSize}px`, lineHeight: '1' }}>{header}</div>
                  <div className="font-semibold text-white text-center" style={{ fontSize: `${subheaderSize}px`, lineHeight: '1', marginTop: `${subheaderSize / 4}px` }}>{subheader}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
