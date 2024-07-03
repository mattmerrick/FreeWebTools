'use client';
import { useState } from 'react';

export default function MarkdownToSheets() {
  const [markdown, setMarkdown] = useState('');
  const [convertedText, setConvertedText] = useState('');

  const handleMarkdownChange = (event) => {
    setMarkdown(event.target.value);
  };

  const convertToSheetsFormat = () => {
    const lines = markdown.split('\n').map(line => line.trim().replace(/\|/g, ''));
    const tableRows = lines.map(line => {
      const cells = line.split('|').map(cell => `<td>${cell.trim()}</td>`).join('');
      return `<tr>${cells}</tr>`;
    }).join('');
    const tableMarkup = `<table>${tableRows}</table>`;
    setConvertedText(tableMarkup);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(convertedText)
      .then(() => alert('Text copied to clipboard'))
      .catch((error) => console.error('Failed to copy text to clipboard:', error));
  };

  return (
    <div>
      <h1>Markdown to Sheets Converter</h1>
      <div>
        <h2>Enter Markdown</h2>
        <textarea
          value={markdown}
          onChange={handleMarkdownChange}
          rows={10}
          cols={50}
        />
        <button onClick={convertToSheetsFormat}>Convert to Sheets Format</button>
      </div>
      <div>
        <h2>Converted Text</h2>
        <div dangerouslySetInnerHTML={{ __html: convertedText }} />
        {convertedText && <button onClick={copyToClipboard}>Copy to Clipboard</button>}
        {convertedText && <p>Copy the text above and paste it into Google Sheets, Excel, Airtable, etc.</p>}
      </div>
    </div>
  );
}




