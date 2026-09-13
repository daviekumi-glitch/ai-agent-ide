'use client';

import { useState, useEffect } from 'react';

interface OnboardingStep {
  title: string;
  description: string;
  image?: string;
  action?: string;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    title: 'Welcome to AI Agent IDE',
    description: 'Build mobile apps, websites, and automate workflows with the power of AI agents.',
    action: 'Get Started'
  },
  {
    title: 'AI-Powered Code Generation',
    description: 'Describe what you want to build, and our AI agents will generate complete, production-ready code for you.',
    action: 'Next'
  },
  {
    title: 'Real-time Preview',
    description: 'See your changes instantly with live preview. Works for web apps, mobile UIs, and more.',
    action: 'Next'
  },
  {
    title: 'Collaborative Workflow',
    description: 'Share projects, collaborate in real-time, and deploy with one click to multiple platforms.',
    action: 'Next'
  },
  {
    title: 'Ready to Build?',
    description: 'Create your first project and experience the future of AI-powered development.',
    action: 'Start Building'
  }
];

export default function OnboardingTutorial() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('ai-agent-ide-onboarding-complete');
    if (!hasSeenOnboarding) {
      setIsVisible(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const completeOnboarding = () => {
    localStorage.setItem('ai-agent-ide-onboarding-complete', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const step = ONBOARDING_STEPS[currentStep];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl max-w-2xl w-full p-8 relative">
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-600/20 mb-6">
              <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">{step.title}</h2>
            <p className="text-gray-300 text-lg leading-relaxed">{step.description}</p>
          </div>

          <div className="flex items-center justify-center space-x-2 mb-8">
            {ONBOARDING_STEPS.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep 
                    ? 'w-8 bg-blue-600' 
                    : 'w-2 bg-gray-600'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handleSkip}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Skip Tutorial
            </button>

            <button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              {step.action}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
