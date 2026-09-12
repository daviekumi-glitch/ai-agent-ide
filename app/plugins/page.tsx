'use client'

import { useState, useEffect } from 'react'
import { Puzzle, Download, Check, Settings as SettingsIcon } from 'lucide-react'
import { pluginManager, builtInPlugins, Plugin } from '@/lib/plugin-system'

export default function PluginsPage() {
  const [plugins, setPlugins] = useState<Plugin[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setPlugins(pluginManager.getAllPlugins())
  }, [])

  const togglePlugin = (pluginId: string) => {
    const plugin = pluginManager.getPlugin(pluginId)
    if (plugin) {
      if (plugin.enabled) {
        pluginManager.disablePlugin(pluginId)
      } else {
        pluginManager.enablePlugin(pluginId)
      }
      setPlugins([...pluginManager.getAllPlugins()])
    }
  }

  const filteredPlugins = plugins.filter(plugin =>
    plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plugin.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center gap-3 mb-6">
            <Puzzle className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold dark:text-white">Plugins & Extensions</h1>
              <p className="text-gray-600 dark:text-gray-400">Extend IDE functionality with plugins</p>
            </div>
          </div>

          {/* Search */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search plugins..."
            className="w-full p-3 border dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* Plugin Grid */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlugins.map((plugin) => (
            <div
              key={plugin.id}
              className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
            >
              {/* Plugin Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Puzzle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold dark:text-white">{plugin.name}</h3>
                    <p className="text-sm text-gray-500">v{plugin.version}</p>
                  </div>
                </div>
                
                {/* Enable/Disable Toggle */}
                <button
                  onClick={() => togglePlugin(plugin.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    plugin.enabled
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  {plugin.enabled ? (
                    <span className="flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      Enabled
                    </span>
                  ) : (
                    'Disabled'
                  )}
                </button>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {plugin.description}
              </p>

              {/* Author */}
              <div className="text-xs text-gray-500 dark:text-gray-500 mb-4">
                By {plugin.author}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  {plugin.enabled ? 'Update' : 'Install'}
                </button>
                <button className="p-2 border dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  <SettingsIcon className="w-5 h-5 dark:text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPlugins.length === 0 && (
          <div className="text-center py-12">
            <Puzzle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No plugins found
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Try adjusting your search query
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
