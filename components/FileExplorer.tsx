'use client';

import React, { useState } from 'react';
import { File, Folder, Plus, Trash2, Edit2, ChevronRight, ChevronDown } from 'lucide-react';

interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
}

export default function FileExplorer({ onFileSelect }: { onFileSelect: (file: FileNode) => void }) {
  const [files, setFiles] = useState<FileNode[]>([
    {
      id: '1',
      name: 'src',
      type: 'folder',
      children: [
        { id: '2', name: 'index.js', type: 'file', content: '// Your code here' },
        { id: '3', name: 'App.js', type: 'file', content: 'import React from "react";' }
      ]
    }
  ]);

  const [expanded, setExpanded] = useState<Set<string>>(new Set(['1']));
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpanded(newExpanded);
  };

  const handleFileClick = (file: FileNode) => {
    setSelectedId(file.id);
    if (file.type === 'file') {
      onFileSelect(file);
    } else {
      toggleExpand(file.id);
    }
  };

  const addFile = (parentId: string | null) => {
    const name = prompt('Enter file name:');
    if (!name) return;

    const newFile: FileNode = {
      id: Date.now().toString(),
      name,
      type: name.includes('.') ? 'file' : 'folder',
      children: name.includes('.') ? undefined : [],
      content: ''
    };

    if (!parentId) {
      setFiles([...files, newFile]);
    } else {
      const addToTree = (nodes: FileNode[]): FileNode[] => {
        return nodes.map(node => {
          if (node.id === parentId) {
            return {
              ...node,
              children: [...(node.children || []), newFile]
            };
          }
          if (node.children) {
            return { ...node, children: addToTree(node.children) };
          }
          return node;
        });
      };
      setFiles(addToTree(files));
    }
  };

  const deleteFile = (id: string) => {
    const deleteFromTree = (nodes: FileNode[]): FileNode[] => {
      return nodes.filter(node => node.id !== id).map(node => {
        if (node.children) {
          return { ...node, children: deleteFromTree(node.children) };
        }
        return node;
      });
    };
    setFiles(deleteFromTree(files));
  };

  const renderNode = (node: FileNode, depth: number = 0) => {
    const isExpanded = expanded.has(node.id);
    const isSelected = selectedId === node.id;

    return (
      <div key={node.id}>
        <div
          className={`flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
            isSelected ? 'bg-blue-100 dark:bg-blue-900' : ''
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => handleFileClick(node)}
        >
          {node.type === 'folder' && (
            <span onClick={(e) => { e.stopPropagation(); toggleExpand(node.id); }}>
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
          )}
          {node.type === 'folder' ? <Folder size={16} className="text-yellow-500" /> : <File size={16} className="text-blue-500" />}
          <span className="flex-1 text-sm">{node.name}</span>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100">
            {node.type === 'folder' && (
              <button
                onClick={(e) => { e.stopPropagation(); addFile(node.id); }}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              >
                <Plus size={14} />
              </button>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); deleteFile(node.id); }}
              className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded"
            >
              <Trash2 size={14} className="text-red-500" />
            </button>
          </div>
        </div>
        {node.type === 'folder' && isExpanded && node.children && (
          <div>
            {node.children.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full border-r dark:border-gray-700 overflow-y-auto group">
      <div className="flex items-center justify-between p-3 border-b dark:border-gray-700">
        <h3 className="font-semibold text-sm">Explorer</h3>
        <button
          onClick={() => addFile(null)}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
        >
          <Plus size={16} />
        </button>
      </div>
      <div className="p-2">
        {files.map(node => renderNode(node))}
      </div>
    </div>
  );
}
