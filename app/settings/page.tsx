'use client';

import { useState } from 'react';
import { useTheme } from '@/lib/theme-context';
import { translations, Locale } from '@/lib/i18n';

export default function SettingsPage() {
  const { theme, locale, toggleTheme, setLocale } = useTheme();
  const t = translations[locale];
  
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gpt-4');
  const [autoSave, setAutoSave] = useState(true);

  const handleSave = () => {
    localStorage.setItem('apiKey', apiKey);
    localStorage.setItem('model', model);
    localStorage.setItem('autoSave', String(autoSave));
    alert(t.success);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">{t.settings}</h1>

        {/* Theme Settings */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6 border border-purple-500/30">
          <h2 className="text-xl font-semibold text-white mb-4">{t.theme}</h2>
          <div className="flex items-center justify-between">
            <span className="text-gray-300">
              {theme === 'dark' ? t.darkMode : t.lightMode}
            </span>
            <button
              onClick={toggleTheme}
              className="relative w-14 h-7 bg-purple-600 rounded-full transition-colors hover:bg-purple-700"
            >
              <div className={`absolute top-1 ${theme === 'dark' ? 'right-1' : 'left-1'} w-5 h-5 bg-white rounded-full transition-transform`}></div>
            </button>
          </div>
        </div>

        {/* Language Settings */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6 border border-purple-500/30">
          <h2 className="text-xl font-semibold text-white mb-4">{t.language}</h2>
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as Locale)}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 border border-gray-600 focus:border-purple-500 focus:outline-none"
          >
            <option value="en">English</option>
            <option value="ny">Chichewa</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="pt">Português</option>
          </select>
        </div>

        {/* AI Model Settings */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6 border border-purple-500/30">
          <h2 className="text-xl font-semibold text-white mb-4">AI Model</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 border border-gray-600 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Model</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 border border-gray-600 focus:border-purple-500 focus:outline-none"
              >
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="claude-3">Claude 3</option>
                <option value="gemini-pro">Gemini Pro</option>
              </select>
            </div>
          </div>
        </div>

        {/* Editor Settings */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6 border border-purple-500/30">
          <h2 className="text-xl font-semibold text-white mb-4">Editor</h2>
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Auto Save</span>
            <button
              onClick={() => setAutoSave(!autoSave)}
              className={`relative w-14 h-7 rounded-full transition-colors ${autoSave ? 'bg-purple-600' : 'bg-gray-600'}`}
            >
              <div className={`absolute top-1 ${autoSave ? 'right-1' : 'left-1'} w-5 h-5 bg-white rounded-full transition-transform`}></div>
            </button>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all"
        >
          {t.save}
        </button>
      </div>
    </div>
  );
}
