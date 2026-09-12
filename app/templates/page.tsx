'use client';

import { useTheme } from '@/lib/theme-context';
import { translations } from '@/lib/i18n';

const templates = [
  {
    id: 'react-app',
    name: 'React Web App',
    type: 'web',
    description: 'Modern React app with TypeScript and Tailwind CSS',
    icon: '⚛️',
    code: `import React from 'react';\n\nfunction App() {\n  return (\n    <div className="min-h-screen bg-gray-900 text-white">\n      <h1>Hello World</h1>\n    </div>\n  );\n}\n\nexport default App;`
  },
  {
    id: 'mobile-app',
    name: 'React Native App',
    type: 'mobile',
    description: 'Cross-platform mobile app starter',
    icon: '📱',
    code: `import React from 'react';\nimport { View, Text, StyleSheet } from 'react-native';\n\nconst App = () => (\n  <View style={styles.container}>\n    <Text style={styles.text}>Hello Mobile!</Text>\n  </View>\n);\n\nconst styles = StyleSheet.create({\n  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },\n  text: { fontSize: 24, fontWeight: 'bold' }\n});\n\nexport default App;`
  },
  {
    id: 'express-api',
    name: 'Express API',
    type: 'code',
    description: 'RESTful API with Express and Node.js',
    icon: '🚀',
    code: `const express = require('express');\nconst app = express();\n\napp.use(express.json());\n\napp.get('/api/hello', (req, res) => {\n  res.json({ message: 'Hello World!' });\n});\n\napp.listen(3000, () => {\n  console.log('Server running on port 3000');\n});`
  },
  {
    id: 'automation',
    name: 'Web Automation',
    type: 'automation',
    description: 'Browser automation with Puppeteer',
    icon: '🤖',
    code: `const puppeteer = require('puppeteer');\n\nasync function automate() {\n  const browser = await puppeteer.launch();\n  const page = await browser.newPage();\n  await page.goto('https://example.com');\n  await page.screenshot({ path: 'screenshot.png' });\n  await browser.close();\n}\n\nautomate();`
  },
  {
    id: 'nextjs-app',
    name: 'Next.js App',
    type: 'web',
    description: 'Full-stack Next.js application',
    icon: '▲',
    code: `export default function Home() {\n  return (\n    <main className="min-h-screen p-24">\n      <h1 className="text-4xl font-bold">Welcome to Next.js!</h1>\n    </main>\n  );\n}`
  },
  {
    id: 'python-script',
    name: 'Python Script',
    type: 'code',
    description: 'Python automation script',
    icon: '🐍',
    code: `#!/usr/bin/env python3\nimport requests\n\ndef main():\n    response = requests.get('https://api.github.com')\n    print(response.json())\n\nif __name__ == '__main__':\n    main()`
  }
];

export default function TemplatesPage() {
  const { locale } = useTheme();
  const t = translations[locale];

  const handleUseTemplate = (template: typeof templates[0]) => {
    // Save to localStorage and redirect to IDE
    localStorage.setItem('currentProject', JSON.stringify({
      id: Date.now().toString(),
      name: template.name,
      type: template.type,
      code: template.code,
      created: new Date().toISOString()
    }));
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">{t.templates}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map(template => (
            <div 
              key={template.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 hover:border-purple-500/60 transition-all cursor-pointer group"
            >
              <div className="text-5xl mb-4">{template.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{template.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{template.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-purple-400 uppercase">{template.type}</span>
                <button
                  onClick={() => handleUseTemplate(template)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all opacity-0 group-hover:opacity-100"
                >
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
