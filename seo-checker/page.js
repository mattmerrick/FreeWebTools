'use client';

import Head from 'next/head';
import { useState } from 'react';

export default function SEOChecker() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!url) {
      alert('Please enter a URL');
      return;
    }
    
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (response.ok) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, 'text/html');

        const results = {
          title: doc.querySelector('title') ? doc.querySelector('title').textContent : null,
          metaDescription: doc.querySelector('meta[name="description"]') ? doc.querySelector('meta[name="description"]').content : null,
          metaKeywords: doc.querySelector('meta[name="keywords"]') ? doc.querySelector('meta[name="keywords"]').content : null,
          metaAuthor: doc.querySelector('meta[name="author"]') ? doc.querySelector('meta[name="author"]').content : null,
          favicon: doc.querySelector('link[rel="icon"]') ? doc.querySelector('link[rel="icon"]').href : null,
          openGraph: doc.querySelector('meta[property^="og:"]') ? doc.querySelector('meta[property^="og:"]').content : null,
          openGraphImage: doc.querySelector('meta[property="og:image"]') ? doc.querySelector('meta[property="og:image"]').content : null,
          headings: Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(heading => heading.outerHTML),
          canonical: doc.querySelector('link[rel="canonical"]') ? doc.querySelector('link[rel="canonical"]').href : null,
          robots: doc.querySelector('meta[name="robots"]') ? doc.querySelector('meta[name="robots"]').content : null,
          viewport: doc.querySelector('meta[name="viewport"]') ? doc.querySelector('meta[name="viewport"]').content : null,
          lang: doc.querySelector('html').getAttribute('lang') || 'Not Declared',
          hreflang: Array.from(doc.querySelectorAll('link[rel="alternate"][hreflang]')).map(link => link.outerHTML),
          links: Array.from(doc.querySelectorAll('a')).map(a => ({ href: a.href, text: a.textContent })),
          social: {
            facebook: !!doc.querySelector('a[href*="facebook.com"]'),
            twitter: !!doc.querySelector('a[href*="twitter.com"]') || !!doc.querySelector('a[href*="x.com"]'),
            linkedin: !!doc.querySelector('a[href*="linkedin.com"]'),
            instagram: !!doc.querySelector('a[href*="instagram.com"]')
          }
        };

        setResults(results);
      } else {
        setError('Error fetching the URL.');
      }
    } catch (error) {
      setError('Error fetching the URL.');
    }

    setLoading(false);
  };

  return (
    <div>
      <Head>
        <title>Free SEO Checker</title>
        <meta name="title" content="Free SEO Checker" />
        <meta name="description" content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nichetools.net/seo-checker" />
        <meta property="og:title" content="Free SEO Checker" />
        <meta property="og:description" content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!" />
        <meta property="og:image" content="https://nichetools.net/seo-checker/Checker.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://nichetools.net/seo-checker" />
        <meta property="twitter:title" content="Free SEO Checker" />
        <meta property="twitter:description" content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!" />
        <meta property="twitter:image" content="https://nichetools.net/seo-checker/images/meta-tags.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      </Head>
      <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold text-center mb-4">Free SEO Checker</h1>
          <p className="text-center mb-4">
            Welcome to our free SEO Checker! This tool analyzes the SEO elements of a given website URL and provides detailed feedback on how to improve your site's performance and ranking. Our tool checks various SEO aspects including title tags, meta descriptions, headings, and more to ensure your site is fully optimized for search engines.
          </p>
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex justify-center">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="border border-gray-300 p-2 rounded-l w-full md:w-1/2"
                placeholder="Enter URL"
              />
              <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">
                Check
              </button>
            </div>
          </form>
          {loading && <p>Checking...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {results && (
            <div id="results" className="p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-4">Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ResultCard title="Title" value={results.title} />
                <ResultCard title="Meta Description" value={results.metaDescription} />
                <ResultCard title="Meta Keywords" value={results.metaKeywords} />
                <ResultCard title="Meta Author" value={results.metaAuthor} />
                <ResultCard title="Favicon" value={results.favicon} />
                <ResultCard title="Open Graph" value={results.openGraph} />
                <ResultCard title="Open Graph Image" value={results.openGraphImage} />
                <ResultCard title="Canonical" value={results.canonical} />
                <ResultCard title="Robots" value={results.robots} />
                <ResultCard title="Viewport" value={results.viewport} />
                <ResultCard title="Language" value={results.lang} />
                <ResultCard title="Hreflang" value={results.hreflang.join(', ')} />
                <ResultCard title="Links" value={results.links.map(link => `${link.text}: ${link.href}`).join(', ')} />
                <ResultCard title="Social Media Presence" value={`Facebook: ${results.social.facebook}, Twitter: ${results.social.twitter}, LinkedIn: ${results.social.linkedin}, Instagram: ${results.social.instagram}`} />
              </div>
            </div>
          )}
          <div className="text-center mt-4">
            Powered by <a href="https://nichetools.net/?utm_source=seochecker&utm_medium=website&utm_campaign=footer" className="text-blue-500" target="_blank" rel="noopener noreferrer">Niche Tools</a>
          </div>
        </div>
      </div>
    </div>
  );
}

const ResultCard = ({ title, value }) => (
  <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-800">
    <span className="font-medium">{title}:</span>
    <span className="ml-2">{value || 'N/A'}</span>
  </div>
);
