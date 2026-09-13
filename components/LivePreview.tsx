'use client';

import { useEffect, useRef, useState } from 'react';

interface LivePreviewProps {
  code: string;
  language: string;
}

export default function LivePreview({ code, language }: LivePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (language !== 'html' && language !== 'javascript') return;

    try {
      const iframe = iframeRef.current;
      if (!iframe) return;

      const doc = iframe.contentDocument;
      if (!doc) return;

      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: system-ui, -apple-system, sans-serif;
                padding: 20px;
                margin: 0;
              }
            </style>
          </head>
          <body>
            ${code}
            <script>
              window.onerror = function(msg, url, lineNo, columnNo, error) {
                window.parent.postMessage({
                  type: 'error',
                  message: msg
                }, '*');
                return false;
              };
            </script>
          </body>
        </html>
      `);
      doc.close();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Preview error');
    }
  }, [code, language]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'error') {
        setError(event.data.message);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="h-full flex flex-col bg-gray-900">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-300 font-medium">Live Preview</span>
        </div>
        <button
          onClick={() => iframeRef.current?.contentWindow?.location.reload()}
          className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="px-4 py-2 bg-red-900/30 border-b border-red-800 text-red-400 text-sm">
          ⚠️ {error}
        </div>
      )}

      <iframe
        ref={iframeRef}
        className="flex-1 w-full bg-white"
        sandbox="allow-scripts allow-same-origin"
        title="Preview"
      />
    </div>
  );
}
