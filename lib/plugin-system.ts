// Plugin System for AI Agent IDE

export interface Plugin {
  id: string
  name: string
  version: string
  description: string
  author: string
  icon?: string
  enabled: boolean
  config?: Record<string, any>
  hooks: {
    onInit?: () => void | Promise<void>
    onCodeGenerate?: (code: string) => string | Promise<string>
    onFileCreate?: (filename: string, content: string) => void | Promise<void>
    onBuild?: (project: any) => void | Promise<void>
    onDeploy?: (config: any) => void | Promise<void>
  }
}

export class PluginManager {
  private plugins: Map<string, Plugin> = new Map()
  private enabledPlugins: Set<string> = new Set()

  registerPlugin(plugin: Plugin) {
    this.plugins.set(plugin.id, plugin)
    if (plugin.enabled) {
      this.enabledPlugins.add(plugin.id)
      plugin.hooks.onInit?.()
    }
  }

  enablePlugin(pluginId: string) {
    const plugin = this.plugins.get(pluginId)
    if (plugin) {
      this.enabledPlugins.add(pluginId)
      plugin.enabled = true
      plugin.hooks.onInit?.()
    }
  }

  disablePlugin(pluginId: string) {
    this.enabledPlugins.delete(pluginId)
    const plugin = this.plugins.get(pluginId)
    if (plugin) {
      plugin.enabled = false
    }
  }

  getPlugin(pluginId: string): Plugin | undefined {
    return this.plugins.get(pluginId)
  }

  getAllPlugins(): Plugin[] {
    return Array.from(this.plugins.values())
  }

  getEnabledPlugins(): Plugin[] {
    return Array.from(this.enabledPlugins)
      .map(id => this.plugins.get(id))
      .filter((p): p is Plugin => p !== undefined)
  }

  async executeHook<T extends keyof Plugin['hooks']>(
    hookName: T,
    ...args: any[]
  ): Promise<any> {
    const results: any[] = []
    
    for (const plugin of this.getEnabledPlugins()) {
      const hook = plugin.hooks[hookName]
      if (hook) {
        try {
          const result = await (hook as (...hookArgs: unknown[]) => unknown)(...args)
          results.push(result)
        } catch (error) {
          console.error(`Error executing hook ${hookName} in plugin ${plugin.id}:`, error)
        }
      }
    }
    
    return results
  }
}

// Singleton instance
export const pluginManager = new PluginManager()

// Built-in plugins
export const builtInPlugins: Plugin[] = [
  {
    id: 'code-formatter',
    name: 'Code Formatter',
    version: '1.0.0',
    description: 'Automatically format code using Prettier',
    author: 'Davie Kuminga',
    enabled: true,
    hooks: {
      onCodeGenerate: async (code: string) => {
        // Simulate formatting
        return code.trim()
      }
    }
  },
  {
    id: 'ai-suggestions',
    name: 'AI Code Suggestions',
    version: '1.0.0',
    description: 'Get AI-powered code suggestions as you type',
    author: 'Davie Kuminga',
    enabled: true,
    hooks: {
      onInit: () => {
        console.log('AI Suggestions plugin initialized')
      }
    }
  },
  {
    id: 'live-collaboration',
    name: 'Live Collaboration',
    version: '1.0.0',
    description: 'Real-time code collaboration with team members',
    author: 'Davie Kuminga',
    enabled: false,
    hooks: {
      onFileCreate: async (filename: string, content: string) => {
        console.log(`File created: ${filename}`)
        // Sync with collaboration server
      }
    }
  },
  {
    id: 'auto-deploy',
    name: 'Auto Deploy',
    version: '1.0.0',
    description: 'Automatically deploy on successful build',
    author: 'Davie Kuminga',
    enabled: false,
    hooks: {
      onBuild: async (project: any) => {
        console.log('Auto-deploying project...')
        // Trigger deployment
      }
    }
  }
]

// Initialize built-in plugins
builtInPlugins.forEach(plugin => pluginManager.registerPlugin(plugin))
