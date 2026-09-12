'use client';

interface ActionBarProps {
  onRun: () => void;
  onClear: () => void;
  onSave: () => void;
  isRunning: boolean;
}

export default function ActionBar({ onRun, onClear, onSave, isRunning }: ActionBarProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg border border-gray-700">
      <button
        onClick={onRun}
        disabled={isRunning}
        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isRunning ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Running...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
            Run Code
          </>
        )}
      </button>

      <button
        onClick={onClear}
        className="px-4 py-2.5 bg-gray-700 text-gray-300 rounded-lg font-semibold hover:bg-gray-600 transition-all"
      >
        Clear
      </button>

      <button
        onClick={onSave}
        className="px-4 py-2.5 bg-gray-700 text-gray-300 rounded-lg font-semibold hover:bg-gray-600 transition-all"
      >
        Save
      </button>
    </div>
  );
}
