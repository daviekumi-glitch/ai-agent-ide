'use client';

import { useEffect, useState } from 'react';

interface GenerationAnimationProps {
  isGenerating: boolean;
  message?: string;
}

export default function GenerationAnimation({ isGenerating, message }: GenerationAnimationProps) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (!isGenerating) return;

    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, [isGenerating]);

  if (!isGenerating) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl border border-purple-500/30 max-w-md w-full">
        {/* Animated Logo */}
        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-2 bg-gray-900 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-purple-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Message */}
        <h3 className="text-xl font-bold text-white text-center mb-2">
          {message || 'Generating Code'}{dots}
        </h3>
        <p className="text-gray-400 text-center text-sm mb-6">
          AI agents are working hard to create your project
        </p>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient-x"></div>
        </div>

        {/* Particle Effect */}
        <div className="mt-6 flex justify-center space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
