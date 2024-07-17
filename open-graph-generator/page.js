'use client';

import { useState } from 'react';

const OpenGraphGenerator = () => {
  const [title, setTitle] = useState('');
  const [siteName, setSiteName] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState('article');
  const [description, setDescription] = useState('');
  const [imageCount, setImageCount] = useState(1);
  const [images, setImages] = useState(['']);
  const [copied, setCopied] = useState(false);

  const handleImageCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setImageCount(count);
    setImages(Array(count).fill(''));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const generateMetaTags = () => {
    let metaTags = `
<meta property="og:title" content="${title}" />
<meta property="og:site_name" content="${siteName}" />
<meta property="og:url" content="${url}" />
<meta property="og:type" content="${type}" />
<meta property="og:description" content="${description}" />
    `;
    images.forEach((image, index) => {
      metaTags += `<meta property="og:image" content="${image}" />\n`;
    });
    return metaTags;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateMetaTags());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Open Graph Generator: The Ultimate Tool for Boosting Your Social Media Presence</h1>
      <p className="mb-6">
        Generate Open Graph meta tags to control how your website's content appears when shared on social media platforms.
      </p>
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4">
          <label className="block text-sm font-medium w-full md:w-1/3">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full md:w-2/3 border rounded p-2"
          />
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4">
          <label className="block text-sm font-medium w-full md:w-1/3">Site Name</label>
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="w-full md:w-2/3 border rounded p-2"
          />
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4">
          <label className="block text-sm font-medium w-full md:w-1/3">Site URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full md:w-2/3 border rounded p-2"
          />
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4">
          <label className="block text-sm font-medium w-full md:w-1/3">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full md:w-2/3 border rounded p-2"
          >
            <option value="article">Article</option>
            <option value="book">Book</option>
            <option value="book.author">Book Author</option>
            <option value="book.genre">Book Genre</option>
            <option value="business">Business</option>
            <option value="fitness.course">Fitness Course</option>
            <option value="music.album">Music Album</option>
            <option value="music.musician">Music Musician</option>
            <option value="music.playlist">Music Playlist</option>
            <option value="music.radio_station">Music Radio Station</option>
            <option value="music.song">Music Song</option>
            <option value="object">Object (Generic Object)</option>
            <option value="place">Place</option>
            <option value="product">Product</option>
            <option value="product.group">Product Group</option>
            <option value="product.item">Product Item</option>
            <option value="profile">Profile</option>
            <option value="election">Election</option>
            <option value="restaurant">Restaurant</option>
            <option value="restaurant.menu">Restaurant Menu</option>
            <option value="restaurant.menu_item">Restaurant Menu Item</option>
            <option value="restaurant.menu_section">Restaurant Menu Section</option>
            <option value="video.episode">Video Episode</option>
            <option value="video.movie">Video Movie</option>
            <option value="video.tv_show">Video TV Show</option>
            <option value="video.other">Video Other</option>
            <option value="website">Website</option>
          </select>
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4">
          <label className="block text-sm font-medium w-full md:w-1/3">Number of Images</label>
          <select
            value={imageCount}
            onChange={handleImageCountChange}
            className="w-full md:w-2/3 border rounded p-2"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        {images.map((image, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4">
            <label className="block text-sm font-medium w-full md:w-1/3">Image {index + 1} URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => handleImageChange(index, e.target.value)}
              className="w-full md:w-2/3 border rounded p-2"
            />
          </div>
        ))}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4">
          <label className="block text-sm font-medium w-full md:w-1/3">Description (up to 200 characters)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full md:w-2/3 border rounded p-2"
            maxLength="200"
          />
        </div>
      </div>
      <button
        onClick={copyToClipboard}
        className={`mt-4 bg-blue-500 text-white py-2 px-4 rounded ${copied ? 'animate-bounce' : ''}`}
      >
        {copied ? 'Copied!' : 'Copy Meta Tags to Clipboard'}
      </button>
      <pre className="mt-4 bg-gray-100 p-4 rounded">{generateMetaTags()}</pre>
      <h2 className="text-xl font-bold mt-8">Understanding Open Graph</h2>
      <p className="mt-2">
        Open Graph is a protocol that allows you to control how your website's content appears when it is shared on social media platforms. This protocol is used by Facebook, LinkedIn, Twitter, and other social media platforms to display preview information for links shared on their platforms. Understanding Open Graph is essential if you want to make sure that your website's content is displayed correctly when it is shared on social media.
      </p>
      <h3 className="text-lg font-bold mt-6">What Is an Open Graph Generator?</h3>
      <p className="mt-2">
        An Open Graph generator is a tool that generates Open Graph tags for your website's content. These tags include information such as the title, description, and image of your website's content. Open Graph generators are useful because they allow you to control how your website's content is displayed when it is shared on social media platforms. Some popular Open Graph generators include OpenGraph.xyz, OpenGraphPreview.com, and OpenGraph.Dev.
      </p>
      <h3 className="text-lg font-bold mt-6">How Do You Make an Open Graph?</h3>
      <p className="mt-2">
        To make an Open Graph for your website's content, you need to add Open Graph tags to your website's HTML code. These tags include information such as the title, description, and image of your website's content. You can add these tags manually or by using an Open Graph generator. Once you have added the Open Graph tags to your website's HTML code, you should test your website's content to make sure that the Open Graph tags are working correctly.
      </p>
      <h3 className="text-lg font-bold mt-6">Is Open Graph Good for SEO?</h3>
      <p className="mt-2">
        Open Graph can indirectly improve your website's SEO by improving click-through rates (CTR) from social media platforms. When your website's content is shared on social media platforms, it is more likely to be clicked on if it has an attractive preview. Open Graph tags allow you to control how your website's content appears when it is shared on social media platforms, which can improve the click-through rate of your website's content. However, Open Graph tags do not directly affect your website's search engine rankings.
      </p>
      <p className="text-center font-bold">Powered By <a href="/" class="text-blue-500 hover:underline">Niche Tools</a></p>
    </div>
  );
};

export default OpenGraphGenerator;
