'use client';

import { useState } from 'react';
import Header from '../components/Header';
import AgentSelector from '../components/AgentSelector';
import CodeEditor from '../components/CodeEditor';
import OutputPanel from '../components/OutputPanel';
import ActionBar from '../components/ActionBar';
import { executeCode, generateCode } from '@/lib/client-engine';

export default function Home() {
  const [selectedAgent, setSelectedAgent] = useState('code');
  const [code, setCode] = useState('// Write your code here\nconsole.log("Hello from AI Agent IDE!");');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [language, setLanguage] = useState('javascript');

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('');

    // Real on-device execution (offline-capable build)
    setOutput(executeCode(code, language));
    setIsRunning(false);
  };

  const handleClear = () => {
    setCode('');
    setOutput('');
  };

  const handleSave = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${language === 'python' ? 'py' : language === 'java' ? 'java' : language === 'kotlin' ? 'kt' : 'js'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleGenerate = async (prompt: string) => {
    // Template-based on-device generation
    setIsRunning(true);
    try {
      setCode(generateCode(prompt, 'react-native'));
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Header onGenerate={handleGenerate} />
      
      <div className="container mx-auto p-4 space-y-4">
        <AgentSelector
          selected={selectedAgent}
          onSelect={setSelectedAgent}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[500px]">
          <CodeEditor code={code} onChange={setCode} language={language} />
          <OutputPanel output={output} isLoading={isRunning} />
        </div>

        <ActionBar
          onRun={handleRun}
          onClear={handleClear}
          onSave={handleSave}
          isRunning={isRunning}
        />
      </div>
    </div>
  );
}
