// pages/utm-generator.js
'use client';
import { useState } from 'react';
import Head from 'next/head';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const UTMLinkGenerator = () => {
  const [url, setUrl] = useState('');
  const [utmSource, setUtmSource] = useState('');
  const [utmMedium, setUtmMedium] = useState('');
  const [utmCampaign, setUtmCampaign] = useState('');
  const [utmTerm, setUtmTerm] = useState('');
  const [utmContent, setUtmContent] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const generateUTMUrl = () => {
    const params = new URLSearchParams();
    if (utmSource) params.append('utm_source', utmSource);
    if (utmMedium) params.append('utm_medium', utmMedium);
    if (utmCampaign) params.append('utm_campaign', utmCampaign);
    if (utmTerm) params.append('utm_term', utmTerm);
    if (utmContent) params.append('utm_content', utmContent);

    const fullUrl = `${url}?${params.toString()}`;
    setGeneratedUrl(fullUrl);
    setCopied(false); // Reset copy status when URL is regenerated
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Head>
        <title>UTM Link Generator - Create SEO-Friendly URLs</title>
        <meta name="description" content="Easily create SEO-friendly URLs with UTM parameters using our simple UTM link generator tool." />
        <meta name="keywords" content="UTM, UTM generator, UTM link generator, SEO, marketing" />
        <meta name="author" content="Your Name" />
      </Head>
      <main className="max-w-2xl mx-auto p-8 shadow-lg rounded-lg bg-white">
        <h1 className="text-2xl font-bold mb-6">UTM Link Generator</h1>
        <p className="mb-4">Create SEO-friendly URLs with UTM parameters for your marketing campaigns.</p>
        <form onSubmit={(e) => { e.preventDefault(); generateUTMUrl(); }} className="space-y-4">
          <div>
            <label htmlFor="url" className="block font-semibold">Base URL:</label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="utm-source" className="block font-semibold">UTM Source:</label>
            <input
              type="text"
              id="utm-source"
              value={utmSource}
              onChange={(e) => setUtmSource(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="utm-medium" className="block font-semibold">UTM Medium:</label>
            <input
              type="text"
              id="utm-medium"
              value={utmMedium}
              onChange={(e) => setUtmMedium(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="utm-campaign" className="block font-semibold">UTM Campaign:</label>
            <input
              type="text"
              id="utm-campaign"
              value={utmCampaign}
              onChange={(e) => setUtmCampaign(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="utm-term" className="block font-semibold">UTM Term:</label>
            <input
              type="text"
              id="utm-term"
              value={utmTerm}
              onChange={(e) => setUtmTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="utm-content" className="block font-semibold">UTM Content:</label>
            <input
              type="text"
              id="utm-content"
              value={utmContent}
              onChange={(e) => setUtmContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button type="submit" className="w-full p-2 bg-blue-600 text-white font-bold rounded">Generate UTM Link</button>
        </form>
        {generatedUrl && (
          <div className="mt-6 p-4 bg-gray-100 rounded border border-gray-300">
            <h2 className="text-xl font-semibold mb-2">Generated UTM URL</h2>
            <p className="break-words mb-4">{generatedUrl}</p>
            <CopyToClipboard text={generatedUrl} onCopy={() => setCopied(true)}>
              <button className="p-2 bg-green-600 text-white font-bold rounded">{copied ? 'Copied!' : 'Copy to Clipboard'}</button>
            </CopyToClipboard>
            <p>Get access to our list of 1000+ web tools you can build today <a href="https://nichetools.net" className="text-blue-600 underline">Learn More</a></p>
          </div>
        )}
      </main>
    </div>
  );
};

export default UTMLinkGenerator;
