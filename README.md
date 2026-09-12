# 🚀 AI Agent IDE

Professional AI-powered IDE for building mobile apps, web apps, and automation scripts.

**Developed by:** Davie Kuminga | Davie Cyber Team

## ✨ Features

- 🤖 **AI Code Generation** - Generate code using advanced AI models
- 📱 **Mobile App Builder** - Create Android/iOS apps with React Native
- 🌐 **Web App Builder** - Build modern web applications
- ⚡ **Automation Scripts** - Automate tasks with AI-generated scripts
- 🌍 **Multi-Language Support** - English, Chichewa, Spanish, French, Portuguese
- 🎨 **Theme Support** - Light and dark themes
- 📁 **Project Management** - Create, edit, and organize projects
- 📋 **Templates Library** - Quick-start templates for common projects
- ⚙️ **Settings** - Customize AI model, API keys, and preferences

## 🔧 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Android Studio (for Android builds)
- Xcode (for iOS builds, Mac only)

### Setup

```bash
# Clone the repository
git clone https://github.com/daviekumi-glitch/ai-agent-ide.git
cd ai-agent-ide

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📱 Build for Android

```bash
# Install Capacitor CLI globally
npm install -g @capacitor/cli

# Build the web app
npm run build

# Sync with Android
npx cap sync android

# Open in Android Studio
npx cap open android
```

## 🌍 Supported Languages

- 🇬🇧 English
- 🇲🇼 Chichewa (Chinyanja)
- 🇪🇸 Spanish
- 🇫🇷 French
- 🇵🇹 Portuguese

## 🎨 Theme System

The app supports:
- 🌙 Dark Mode (default)
- ☀️ Light Mode

Theme preference is saved locally and persists across sessions.

## 📖 Usage

### Creating a New Project

1. Navigate to **Projects** page
2. Click **Create New Project**
3. Enter project name, type, and description
4. Click **Save**

### Using Templates

1. Go to **Templates** page
2. Browse available templates
3. Click **Use Template** on your chosen template
4. Template code will be loaded in the IDE

### Generating Code with AI

1. Select an AI agent (Code, Mobile, Web, or Automation)
2. Enter your prompt describing what you want to build
3. Click **Generate**
4. AI will generate the code for you
5. Click **Run** to execute the code

### Settings Configuration

1. Go to **Settings**
2. Configure:
   - Theme (Light/Dark)
   - Language
   - AI API Key
   - AI Model selection
   - Auto-save preferences

## 🔑 API Configuration

To use AI features, you need an API key:

1. Get an API key from OpenAI, Anthropic, or Google AI
2. Go to Settings
3. Enter your API key
4. Select your preferred model
5. Save settings

## 📂 Project Structure

```
ai-agent-ide/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main IDE interface
│   ├── projects/          # Projects management
│   ├── templates/         # Templates library
│   ├── settings/          # Settings page
│   └── api/               # API routes
├── components/            # React components
│   ├── Navigation.tsx     # Navigation bar
│   ├── Header.tsx         # App header
│   ├── CodeEditor.tsx     # Code editor
│   ├── OutputPanel.tsx    # Output display
│   └── ActionBar.tsx      # Action buttons
├── lib/                   # Utilities
│   ├── i18n.ts           # Translations
│   └── theme-context.tsx  # Theme provider
└── public/               # Static assets
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💻 Developer

**Davie Kuminga**  
Davie Cyber Team

GitHub: [@daviekumi-glitch](https://github.com/daviekumi-glitch)  
Repository: [ai-agent-ide](https://github.com/daviekumi-glitch/ai-agent-ide)

## 🆘 Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ using Next.js, React, TypeScript, and Capacitor**
