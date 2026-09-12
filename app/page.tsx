'use client';

import { useState } from 'react';
import Header from '../components/Header';
import AgentSelector from '../components/AgentSelector';
import CodeEditor from '../components/CodeEditor';
import OutputPanel from '../components/OutputPanel';
import ActionBar from '../components/ActionBar';

export default function Home() {
  const [selectedAgent, setSelectedAgent] = useState('code');
  const [code, setCode] = useState('// Write your code here\nconsole.log("Hello from AI Agent IDE!");');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [language, setLanguage] = useState('javascript');

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('');

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language, agent: selectedAgent }),
      });

      const data = await response.json();
      
      if (data.success) {
        setOutput(data.output);
      } else {
        setOutput(`Error: ${data.error}`);
      }
    } catch (error: any) {
      setOutput(`Execution failed: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
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
    setIsRunning(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, agent: selectedAgent, framework: 'react-native' }),
      });

      const data = await response.json();
      if (data.success) {
        setCode(data.code);
      }
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
          selectedAgent={selectedAgent}
          onSelectAgent={setSelectedAgent}
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
