'use client';

import { useState } from 'react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: string;
}

export default function CodeEditor({ code, onChange, language }: CodeEditorProps) {
  const [lineNumbers, setLineNumbers] = useState<number[]>([1, 2, 3, 4, 5]);

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    onChange(value);
    
    // Update line numbers
    const lines = value.split('\n').length;
    setLineNumbers(Array.from({ length: lines }, (_, i) => i + 1));
  };

  return (
    <div className="flex h-full bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
      {/* Line numbers */}
      <div className="bg-gray-800 text-gray-500 p-4 text-right select-none font-mono text-sm">
        {lineNumbers.map((num) => (
          <div key={num} className="leading-6">
            {num}
          </div>
        ))}
      </div>

      {/* Code area */}
      <textarea
        value={code}
        onInput={handleInput}
        className="flex-1 bg-transparent text-gray-100 p-4 font-mono text-sm outline-none resize-none leading-6"
        spellCheck={false}
        placeholder={`Write ${language} code here...`}
      />
    </div>
  );
}
