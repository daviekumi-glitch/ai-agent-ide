'use client'

import { useState } from 'react'
import { GitBranch, GitCommit, GitPullRequest, Upload, Download, CheckCircle } from 'lucide-react'

interface Commit {
  hash: string
  message: string
  author: string
  date: string
}

export default function GitPanel() {
  const [branch, setBranch] = useState('main')
  const [commits, setCommits] = useState<Commit[]>([
    { hash: 'a1b2c3d', message: 'Initial commit', author: 'Davie Kuminga', date: '2 hours ago' },
    { hash: 'e4f5g6h', message: 'Add deployment features', author: 'Davie Kuminga', date: '1 hour ago' }
  ])
  const [commitMessage, setCommitMessage] = useState('')
  const [syncing, setSyncing] = useState(false)

  const handleCommit = () => {
    if (!commitMessage.trim()) return
    
    const newCommit: Commit = {
      hash: Math.random().toString(36).substring(7),
      message: commitMessage,
      author: 'Davie Kuminga',
      date: 'Just now'
    }
    
    setCommits([newCommit, ...commits])
    setCommitMessage('')
  }

  const handleSync = async () => {
    setSyncing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setSyncing(false)
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="p-4 border-b dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold dark:text-white flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            Version Control
          </h2>
          <button
            onClick={handleSync}
            disabled={syncing}
            className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-blue-700 disabled:bg-gray-400"
          >
            {syncing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Syncing...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Push
              </>
            )}
          </button>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded dark:text-gray-300">
            {branch}
          </span>
          <span className="text-gray-500">• {commits.length} commits</span>
        </div>
      </div>

      {/* Commit Input */}
      <div className="p-4 border-b dark:border-gray-700">
        <textarea
          value={commitMessage}
          onChange={(e) => setCommitMessage(e.target.value)}
          placeholder="Commit message..."
          className="w-full p-2 border dark:border-gray-600 rounded-lg mb-2 dark:bg-gray-800 dark:text-white resize-none"
          rows={2}
        />
        <button
          onClick={handleCommit}
          disabled={!commitMessage.trim()}
          className="w-full py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
        >
          <GitCommit className="w-4 h-4" />
          Commit Changes
        </button>
      </div>

      {/* Commit History */}
      <div className="flex-1 overflow-auto p-4">
        <h3 className="font-semibold mb-3 dark:text-white flex items-center gap-2">
          <GitPullRequest className="w-4 h-4" />
          Commit History
        </h3>
        <div className="space-y-2">
          {commits.map((commit) => (
            <div key={commit.hash} className="p-3 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium dark:text-white truncate">{commit.message}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
                    <span className="font-mono">{commit.hash}</span>
                    <span>•</span>
                    <span>{commit.author}</span>
                    <span>•</span>
                    <span>{commit.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
