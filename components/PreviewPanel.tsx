'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Smartphone, Monitor, RefreshCw, ExternalLink } from 'lucide-react';

interface PreviewPanelProps {
  code: string;
  type: 'web' | 'mobile';
}

export default function PreviewPanel({ code, type }: PreviewPanelProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [refreshKey, setRefreshKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current && code) {
      const iframeDoc = iframeRef.current.contentDocument;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(generatePreviewHTML(code));
        iframeDoc.close();
      }
    }
  }, [code, refreshKey]);

  const generatePreviewHTML = (sourceCode: string) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { margin: 0; padding: 20px; font-family: system-ui, -apple-system, sans-serif; }
    * { box-sizing: border-box; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    ${sourceCode}
  </script>
</body>
</html>
    `;
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Preview Toolbar */}
      <div className="flex items-center justify-between p-3 border-b dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('desktop')}
            className={`p-2 rounded ${
              viewMode === 'desktop' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <Monitor size={18} />
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`p-2 rounded ${
              viewMode === 'mobile' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <Smartphone size={18} />
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setRefreshKey(prev => prev + 1)}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            title="Refresh Preview"
          >
            <RefreshCw size={18} />
          </button>
          <button
            onClick={() => {
              const blob = new Blob([generatePreviewHTML(code)], { type: 'text/html' });
              const url = URL.createObjectURL(blob);
              window.open(url, '_blank');
            }}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            title="Open in New Window"
          >
            <ExternalLink size={18} />
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div
          className={`bg-white rounded-lg shadow-2xl overflow-hidden ${
            viewMode === 'mobile' ? 'w-[375px] h-[667px]' : 'w-full h-full'
          }`}
        >
          <iframe
            ref={iframeRef}
            key={refreshKey}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-modals"
            title="Preview"
          />
        </div>
      </div>
    </div>
  );
}
