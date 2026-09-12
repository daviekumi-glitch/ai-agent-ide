'use client'

import { useState } from 'react'
import { ChevronRight, Server, Package, Cloud, Check, AlertCircle } from 'lucide-react'

interface DeployConfig {
  platform: 'vercel' | 'netlify' | 'android' | 'custom'
  buildCommand: string
  outputDir: string
  envVars: Record<string, string>
}

export default function DeployPanel() {
  const [deploying, setDeploying] = useState(false)
  const [deployStatus, setDeployStatus] = useState<'idle' | 'building' | 'deploying' | 'success' | 'error'>('idle')
  const [deployLogs, setDeployLogs] = useState<string[]>([])
  const [selectedPlatform, setSelectedPlatform] = useState<'vercel' | 'netlify' | 'android' | 'custom'>('vercel')

  const platforms = [
    { id: 'vercel', name: 'Vercel', icon: Cloud, color: 'bg-black' },
    { id: 'netlify', name: 'Netlify', icon: Server, color: 'bg-teal-600' },
    { id: 'android', name: 'Android APK', icon: Package, color: 'bg-green-600' },
    { id: 'custom', name: 'Custom Server', icon: Server, color: 'bg-blue-600' }
  ]

  const handleDeploy = async () => {
    setDeploying(true)
    setDeployStatus('building')
    setDeployLogs([])

    // Simulate build process
    const buildSteps = [
      '🔨 Building project...',
      '📦 Installing dependencies...',
      '⚙️  Running build scripts...',
      '🎨 Optimizing assets...',
      '📤 Uploading to platform...',
      '🚀 Deployment successful!'
    ]

    for (const step of buildSteps) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setDeployLogs(prev => [...prev, step])
    }

    setDeployStatus('success')
    setDeploying(false)
  }

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="p-4 border-b dark:border-gray-700">
        <h2 className="text-lg font-bold dark:text-white">Deploy Project</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Build and deploy your application</p>
      </div>

      {/* Platform Selection */}
      <div className="p-4 border-b dark:border-gray-700">
        <label className="block text-sm font-medium mb-2 dark:text-white">Select Platform</label>
        <div className="grid grid-cols-2 gap-2">
          {platforms.map(platform => (
            <button
              key={platform.id}
              onClick={() => setSelectedPlatform(platform.id as any)}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedPlatform === platform.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
              }`}
            >
              <platform.icon className="w-6 h-6 mb-1" />
              <div className="text-sm font-medium dark:text-white">{platform.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Build Logs */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm min-h-[200px]">
          {deployLogs.length === 0 ? (
            <div className="text-gray-500">Build logs will appear here...</div>
          ) : (
            deployLogs.map((log, i) => (
              <div key={i} className="mb-1">{log}</div>
            ))
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800">
        <button
          onClick={handleDeploy}
          disabled={deploying}
          className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 ${
            deploying
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {deployStatus === 'success' ? (
            <>
              <Check className="w-5 h-5" />
              Deployed Successfully
            </>
          ) : deployStatus === 'error' ? (
            <>
              <AlertCircle className="w-5 h-5" />
              Deployment Failed
            </>
          ) : deploying ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Deploying...
            </>
          ) : (
            <>
              <ChevronRight className="w-5 h-5" />
              Deploy to {platforms.find(p => p.id === selectedPlatform)?.name}
            </>
          )}
        </button>
      </div>
    </div>
  )
}
