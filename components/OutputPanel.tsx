'use client';

interface OutputPanelProps {
  output: string;
  isLoading: boolean;
}

export default function OutputPanel({ output, isLoading }: OutputPanelProps) {
  return (
    <div className="h-full bg-gray-900 rounded-lg border border-gray-700 p-4 overflow-auto">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-gray-400 text-sm font-semibold">Output</span>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-3 text-blue-400">
          <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm">Executing...</span>
        </div>
      ) : output ? (
        <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap">{output}</pre>
      ) : (
        <p className="text-gray-500 text-sm italic">No output yet. Run your code to see results.</p>
      )}
    </div>
  );
}
