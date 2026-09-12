'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';
type Locale = 'en' | 'ny' | 'es' | 'fr' | 'pt';

interface ThemeContextType {
  theme: Theme;
  locale: Locale;
  toggleTheme: () => void;
  setLocale: (locale: Locale) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [locale, setLocaleState] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const savedLocale = localStorage.getItem('locale') as Locale | null;
    
    if (savedTheme) setTheme(savedTheme);
    if (savedLocale) setLocaleState(savedLocale);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', theme);
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('locale', locale);
    }
  }, [locale, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
  };

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, locale, toggleTheme, setLocale }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
