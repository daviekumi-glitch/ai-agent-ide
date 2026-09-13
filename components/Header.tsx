'use client'

import { Code2, Menu, Settings, Github, Wand2 } from 'lucide-react'
import { useState } from 'react'

export default function Header({ onGenerate }: { onGenerate?: (prompt: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [prompt, setPrompt] = useState('')

  return (
    <header className="glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center glow">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AI Agent IDE
            </h1>
            <p className="text-xs text-gray-400">By Davie Kuminga</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a 
            href="https://github.com/daviekumi-glitch/ai-agent-ide" 
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 glass rounded-lg hover:bg-white/10 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          {onGenerate && (
            <div className="hidden md:flex items-center gap-2">
              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what to build..."
                className="glass px-3 py-1.5 rounded-lg text-sm w-56 outline-none"
              />
              <button
                onClick={() => { if (prompt.trim()) { onGenerate(prompt.trim()); setPrompt(''); } }}
                className="p-2 glass rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Generate code"
              >
                <Wand2 className="w-5 h-5" />
              </button>
            </div>
          )}
          <button className="p-2 glass rounded-lg hover:bg-white/10 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 glass rounded-lg hover:bg-white/10 transition-colors lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
