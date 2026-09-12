'use client'

import { Code2, Smartphone, Globe, Zap } from 'lucide-react'

const agents = [
  { id: 'code', name: 'Code Generator', icon: Code2, color: 'from-blue-500 to-cyan-500' },
  { id: 'mobile', name: 'Mobile App', icon: Smartphone, color: 'from-purple-500 to-pink-500' },
  { id: 'web', name: 'Web App', icon: Globe, color: 'from-green-500 to-emerald-500' },
  { id: 'automation', name: 'Automation', icon: Zap, color: 'from-orange-500 to-red-500' },
]

export default function AgentSelector({ selected, onSelect }: { selected: string, onSelect: (id: string) => void }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {agents.map((agent) => {
        const Icon = agent.icon
        const isSelected = selected === agent.id
        
        return (
          <button
            key={agent.id}
            onClick={() => onSelect(agent.id)}
            className={`card flex items-center gap-3 p-4 ${isSelected ? 'ring-2 ring-primary glow' : ''}`}
          >
            <div className={`w-10 h-10 bg-gradient-to-br ${agent.color} rounded-lg flex items-center justify-center`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-sm">{agent.name}</span>
          </button>
        )
      })}
    </div>
  )
}
