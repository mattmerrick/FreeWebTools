'use client';

import { useState } from 'react';

const userAgents = [
  'Google',
  'Googlebot-Image',
  'Googlebot-Mobile',
  'msnbot',
  'Slurp',
  'Slurp/cat',
  'Yahoo-MMCrawler',
  'Yahoo-Blogs',
  'Teoma',
  'Gigabot',
  'DMOZ',
  'nutch',
  'ia_archiver',
  'baiduspider',
  'naverbot',
  'psbot'
];

const RobotsTxtForm = () => {
  const [crawlDelay, setCrawlDelay] = useState('');
  const [sitemap, setSitemap] = useState('');
  const [restrictedDirs, setRestrictedDirs] = useState(['/cgi-bin/']);
  const [userAgentSettings, setUserAgentSettings] = useState(
    userAgents.reduce((acc, agent) => ({ ...acc, [agent]: 'Allow' }), {})
  );
  const [generatedRobotsTxt, setGeneratedRobotsTxt] = useState('');

  const handleGenerate = () => {
    const robotsTxt = `
User-agent: *
Crawl-delay: ${crawlDelay || '0'}
${sitemap ? `Sitemap: ${sitemap}` : ''}
${userAgents.map(agent => `
User-agent: ${agent}
${userAgentSettings[agent] === 'Allow' ? 'Allow: /' : 'Disallow: /'}
`).join('')}
${restrictedDirs.map(dir => `Disallow: ${dir}`).join('\n')}
`;

    setGeneratedRobotsTxt(robotsTxt.trim());
  };

  const handleUserAgentChange = (agent, value) => {
    setUserAgentSettings(prevSettings => ({ ...prevSettings, [agent]: value }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedRobotsTxt);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedRobotsTxt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'robots.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Free Robots.txt Generator</h1>
      <p className="mb-4 text-white-700">
        This free tool helps you create a robots.txt file for your website based on your inputs.
        The robots.txt file, placed in your website's root directory, guides search engines on which parts of your site to index. Use it to prevent crawlers from accessing sensitive or irrelevant areas, such as admin pages. This tool uses the Robots Exclusion Protocol to help you generate the file easily by specifying the pages to exclude.
      </p>
      <div className="mb-4">
        <label className="block text-sm font-medium text-white-700">
          Crawl-Delay:
          <input
            type="number"
            value={crawlDelay}
            onChange={(e) => setCrawlDelay(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-white-700">
          Sitemap URL:
          <input
            type="text"
            value={sitemap}
            onChange={(e) => setSitemap(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {userAgents.map(agent => (
          <div key={agent} className=" p-4 rounded-md shadow-md">
            <label className="block text-sm font-medium text-white-700">
              {agent}:
              <select
                value={userAgentSettings[agent]}
                onChange={(e) => handleUserAgentChange(agent, e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="Allow">Allow</option>
                <option value="Disallow">Disallow</option>
              </select>
            </label>
          </div>
        ))}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleGenerate}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Generate Robots.txt
        </button>
        <button
          onClick={handleCopy}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Copy to Clipboard
        </button>
        <button
          onClick={handleDownload}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Download Robots.txt
        </button>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2 mt-4">Generated Robots.txt</h2>
        <pre className="bg-gray-100 p-4 rounded-md">{generatedRobotsTxt}</pre>
      </div>
      <footer className="mt-8">
       <p>Powered By <a href="/">Niche Tools</a></p>
      </footer>
    </div>
  );
};

export default RobotsTxtForm;
