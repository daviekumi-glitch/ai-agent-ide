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

## 🏗️ Android APK (automated)

Every push to `main` triggers GitHub Actions to:
1. Build the Next.js app as a static export (`out/`)
2. Sync it into the committed `android/` Capacitor project
3. Build a **signed release APK** (keystore stored as GitHub Actions secrets)
4. Verify the signature with `apksigner`
5. Publish it to the GitHub Releases page

Download the latest APK from the Releases page — no Android Studio needed.

Local development: `npm run dev` · Build web: `npm run build` · Sync Android: `npm run build:android`

## 🔒 Honest scope

This build runs fully offline on-device: authentication is PBKDF2-hashed local accounts, JavaScript executes on-device with console capture, code generation is template-based (React / React Native / Node.js / Flutter), and Python/Java/Kotlin get honest on-device analysis instead of pretending to execute. No server, no fake AI.

---
Created by Davie Kuminga
