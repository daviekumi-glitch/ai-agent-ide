'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/lib/theme-context';
import { translations } from '@/lib/i18n';

export default function Navigation() {
  const pathname = usePathname();
  const { locale } = useTheme();
  const t = translations[locale];

  const links = [
    { href: '/', label: t.home, icon: '🏠' },
    { href: '/projects', label: t.projects, icon: '📁' },
    { href: '/templates', label: t.templates, icon: '📋' },
    { href: '/settings', label: t.settings, icon: '⚙️' },
  ];

  return (
    <nav className="bg-gray-900/90 backdrop-blur-sm border-b border-purple-500/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t.appName}
            </span>
          </div>
          <div className="flex space-x-4">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  pathname === link.href
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span>{link.icon}</span>
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
