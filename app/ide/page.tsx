'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import FileExplorer from '@/components/FileExplorer';
import CodeEditor from '@/components/CodeEditor';
import PreviewPanel from '@/components/PreviewPanel';
import AIAssistant from '@/components/AIAssistant';
import { Play, Code, Eye, Split } from 'lucide-react';

interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
}

export default function IDEPage() {
  const [currentFile, setCurrentFile] = useState<FileNode | null>(null);
  const [code, setCode] = useState('');
  const [viewMode, setViewMode] = useState<'code' | 'preview' | 'split'>('split');

  const handleFileSelect = (file: FileNode) => {
    setCurrentFile(file);
    setCode(file.content || '');
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (currentFile) {
      // Auto-save logic here
    }
  };

  const runCode = () => {
    // Trigger preview update
    setViewMode('preview');
  };

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header />
      
      {/* Main IDE Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* File Explorer Sidebar */}
        <div className="w-64 bg-gray-50 dark:bg-gray-800">
          <FileExplorer onFileSelect={handleFileSelect} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="flex items-center justify-between p-3 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {currentFile ? currentFile.name : 'No file selected'}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('code')}
                className={`px-3 py-1.5 rounded flex items-center gap-2 text-sm ${
                  viewMode === 'code'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <Code size={16} />
                Code
              </button>
              <button
                onClick={() => setViewMode('split')}
                className={`px-3 py-1.5 rounded flex items-center gap-2 text-sm ${
                  viewMode === 'split'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <Split size={16} />
                Split
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`px-3 py-1.5 rounded flex items-center gap-2 text-sm ${
                  viewMode === 'preview'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <Eye size={16} />
                Preview
              </button>
              <button
                onClick={runCode}
                className="px-4 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded flex items-center gap-2 text-sm font-medium"
              >
                <Play size={16} />
                Run
              </button>
            </div>
          </div>

          {/* Editor and Preview */}
          <div className="flex-1 flex overflow-hidden">
            {/* Code Editor */}
            {(viewMode === 'code' || viewMode === 'split') && (
              <div className={viewMode === 'split' ? 'w-1/2 border-r dark:border-gray-700' : 'w-full'}>
                <CodeEditor
                  code={code}
                  onChange={handleCodeChange}
                  language="javascript"
                />
              </div>
            )}

            {/* Preview Panel */}
            {(viewMode === 'preview' || viewMode === 'split') && (
              <div className={viewMode === 'split' ? 'w-1/2' : 'w-full'}>
                <PreviewPanel code={code} type="web" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
}
