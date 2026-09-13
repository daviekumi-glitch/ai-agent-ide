# AI Agent IDE v3.2.0

> Professional AI-powered development environment for building mobile apps, websites, and automating workflows

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

## 🚀 Features

### Core Capabilities
- ✨ **AI Code Generation** - Generate complete applications using AI agents
- 📱 **Mobile App Builder** - Create Android/iOS apps with React Native
- 🌐 **Web Development** - Build modern web applications
- 🤖 **Automation Engine** - Automate workflows and tasks
- 🔄 **Real-time Collaboration** - Code together with team members
- 🐛 **Integrated Debugger** - Debug with breakpoints and variable inspection
- ✅ **Test Runner** - Run and manage unit tests
- ⚡ **Performance Profiler** - Analyze code performance
- 💡 **IntelliSense** - Smart code completion and suggestions
- 🌍 **Multi-language** - Support for English, Spanish, French, and Chichewa
- 🎨 **Theme System** - Light/dark mode with custom themes
- 📱 **PWA Support** - Install as native app, works offline

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- Android Studio (for APK building)

### Quick Start

```bash
# Clone repository
git clone https://github.com/daviekumi-glitch/ai-agent-ide.git
cd ai-agent-ide

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Build Android APK
npm run build:android
```

## 🏗️ Building Android APK

```bash
# Install Capacitor
npm install @capacitor/core @capacitor/android

# Initialize Capacitor
npx cap init

# Build Next.js app
npm run build

# Sync with Android
npx cap sync android

# Open in Android Studio
npx cap open android

# Build APK in Android Studio
```

## 🛠️ Development

### Project Structure
```
ai-agent-ide/
├── app/              # Next.js app router pages
├── components/       # React components
├── lib/             # Utilities and libraries
├── public/          # Static assets
├── android/         # Android native project
└── capacitor.config.ts
```

### Key Features

#### AI Code Generation
```typescript
import { generateCode } from '@/lib/ai-agent';

const code = await generateCode({
  type: 'mobile-app',
  description: 'Todo app with Firebase',
  language: 'typescript'
});
```

#### Real-time Collaboration
```typescript
import { CollaborationManager } from '@/lib/collaboration';

const collab = new CollaborationManager(userId);
await collab.connect(projectId);
collab.onEdit((edit) => {
  // Handle collaborative edits
});
```

#### Debugging Tools
```typescript
import { debugger, testRunner, profiler } from '@/lib/debugging-tools';

// Add breakpoint
debugger.addBreakpoint(10);

// Run tests
const results = await testRunner.runTests(code, 'javascript');

// Profile performance
const metrics = await profiler.profile(code);
```

## 🌐 API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/generate` - Generate code with AI
- `POST /api/execute` - Execute code safely
- `GET /api/projects` - List user projects
- `POST /api/projects` - Create new project

## 🔧 Configuration

### Environment Variables
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

### Theme Customization
Edit `tailwind.config.js` to customize colors and styles.

## 📱 Mobile Features

- Native Android/iOS support via Capacitor
- Offline-first with service workers
- Push notifications
- Camera and file access
- Biometric authentication support

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](./LICENSE) file

## 👨‍💻 Author

**Davie Kuminga**  
Davie Cyber Team  

## 🔗 Links

- Repository: https://github.com/daviekumi-glitch/ai-agent-ide
- Issues: https://github.com/daviekumi-glitch/ai-agent-ide/issues

## 📱 APK Download

Latest release APK available in [Releases](https://github.com/daviekumi-glitch/ai-agent-ide/releases)

---

**Version:** 3.2.0  
**Last Updated:** 2026-09-13  
Built with ❤️ by Davie Cyber Team
