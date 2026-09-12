'use client'

import { useState, ReactNode } from 'react'
import { Menu, X, Code, FileText, GitBranch, Rocket, Settings } from 'lucide-react'

interface MobileLayoutProps {
  children: ReactNode
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'code' | 'files' | 'git' | 'deploy' | 'settings'>('code')

  const tabs = [
    { id: 'code', name: 'Code', icon: Code },
    { id: 'files', name: 'Files', icon: FileText },
    { id: 'git', name: 'Git', icon: GitBranch },
    { id: 'deploy', name: 'Deploy', icon: Rocket },
    { id: 'settings', name: 'Settings', icon: Settings }
  ]

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-3 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          {sidebarOpen ? <X className="w-6 h-6 dark:text-white" /> : <Menu className="w-6 h-6 dark:text-white" />}
        </button>
        <h1 className="text-lg font-bold dark:text-white">AI Agent IDE</h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Mobile Drawer */}
        <div className={`
          fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700
          transform transition-transform lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <nav className="p-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Backdrop */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <div className="lg:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700">
        <div className="flex justify-around py-2">
          {tabs.slice(0, 4).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg ${
                activeTab === tab.id
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <tab.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
