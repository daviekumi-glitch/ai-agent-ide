'use client';

import React, { useState, useEffect } from 'react';
import { debugger as debugTool, testRunner, profiler, TestResult, PerformanceMetrics } from '@/lib/debugging-tools';

interface DebugPanelProps {
  code: string;
  language: string;
}

export default function DebugPanel({ code, language }: DebugPanelProps) {
  const [activeTab, setActiveTab] = useState<'breakpoints' | 'tests' | 'performance'>('breakpoints');
  const [breakpoints, setBreakpoints] = useState<number[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [perfMetrics, setPerformanceMetrics] = useState<PerformanceMetrics | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [debugOutput, setDebugOutput] = useState('');

  const addBreakpoint = (line: number) => {
    debugTool.addBreakpoint(line);
    setBreakpoints([...breakpoints, line]);
  };

  const runDebug = async () => {
    setIsRunning(true);
    try {
      const result = await debugTool.debug(code);
      setDebugOutput(result.output + '\n\nVariables:\n' + JSON.stringify(result.variables, null, 2));
    } catch (error: any) {
      setDebugOutput(`Error: ${error.message}`);
    }
    setIsRunning(false);
  };

  const runTests = async () => {
    setIsRunning(true);
    try {
      const results = await testRunner.runTests(code, language);
      setTestResults(results);
    } catch (error: any) {
      console.error('Test execution error:', error);
    }
    setIsRunning(false);
  };

  const runProfiler = async () => {
    setIsRunning(true);
    try {
      const metrics = await profiler.profile(code);
      setPerformanceMetrics(metrics);
    } catch (error: any) {
      console.error('Profiling error:', error);
    }
    setIsRunning(false);
  };

  const summary = testResults.length > 0 ? testRunner.generateTestSummary(testResults) : null;

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('breakpoints')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'breakpoints'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          🐛 Debugger
        </button>
        <button
          onClick={() => setActiveTab('tests')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'tests'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          ✅ Tests
        </button>
        <button
          onClick={() => setActiveTab('performance')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'performance'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          ⚡ Performance
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'breakpoints' && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <button
                onClick={runDebug}
                disabled={isRunning}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {isRunning ? 'Running...' : '▶ Start Debug'}
              </button>
              <button
                onClick={() => addBreakpoint(1)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                ➕ Add Breakpoint
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Breakpoints</h3>
              {breakpoints.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm">No breakpoints set</p>
              ) : (
                <ul className="space-y-1">
                  {breakpoints.map((bp, idx) => (
                    <li key={idx} className="text-sm">Line {bp}</li>
                  ))}
                </ul>
              )}
            </div>

            {debugOutput && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Debug Output</h3>
                <pre className="text-sm overflow-x-auto">{debugOutput}</pre>
              </div>
            )}
          </div>
        )}

        {activeTab === 'tests' && (
          <div className="space-y-4">
            <button
              onClick={runTests}
              disabled={isRunning}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            >
              {isRunning ? 'Running Tests...' : '▶ Run Tests'}
            </button>

            {summary && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Test Summary</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Total Tests</p>
                    <p className="text-2xl font-bold">{summary.total}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Pass Rate</p>
                    <p className="text-2xl font-bold text-green-600">{summary.passRate.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Passed</p>
                    <p className="text-xl font-semibold text-green-600">{summary.passed}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Failed</p>
                    <p className="text-xl font-semibold text-red-600">{summary.failed}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {testResults.map((result, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg ${
                    result.status === 'passed'
                      ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                      : result.status === 'failed'
                      ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                      : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {result.status === 'passed' ? '✅' : result.status === 'failed' ? '❌' : '⊝'} {result.name}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{result.duration}ms</span>
                  </div>
                  {result.error && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">{result.error}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-4">
            <button
              onClick={runProfiler}
              disabled={isRunning}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
            >
              {isRunning ? 'Profiling...' : '▶ Profile Code'}
            </button>

            {perfMetrics && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Execution Time</p>
                  <p className="text-2xl font-bold">{perfMetrics.executionTime.toFixed(2)} ms</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Memory Used</p>
                  <p className="text-2xl font-bold">{(perfMetrics.memoryUsed / 1024).toFixed(2)} KB</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">CPU Usage</p>
                  <div className="mt-2 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                    <div
                      className="bg-purple-500 h-4 rounded-full transition-all"
                      style={{ width: `${perfMetrics.cpuUsage}%` }}
                    />
                  </div>
                  <p className="text-sm mt-1">{perfMetrics.cpuUsage.toFixed(1)}%</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
