# 📱 AI Agent IDE - Complete Android APK Build Guide

## 🚀 Quick Build (Automated)

```bash
# Clone repository
git clone https://github.com/daviekumi-glitch/ai-agent-ide.git
cd ai-agent-ide

# Run automated build script
chmod +x BUILD_ANDROID_APK.sh
./BUILD_ANDROID_APK.sh
```

## 📋 Prerequisites

1. **Node.js** (v18+)
2. **Android Studio** (latest version)
3. **JDK** 11 or higher
4. **Android SDK** (API Level 31+)

## 🔧 Step-by-Step Manual Build

### 1. Install Dependencies

```bash
npm install
```

### 2. Build Next.js Application

```bash
npm run build
```

### 3. Setup Capacitor

```bash
# Install Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android

# Initialize Capacitor (if not done)
npx cap init "AI Agent IDE" "com.daviekuminga.agentide"

# Add Android platform
npx cap add android

# Copy web assets
npx cap copy android

# Sync project
npx cap sync android
```

### 4. Open in Android Studio

```bash
npx cap open android
```

### 5. Build Release APK

**Option A: Using Android Studio**
1. In Android Studio: `Build → Generate Signed Bundle / APK`
2. Select **APK**
3. Choose **release** variant
4. Sign with your keystore
5. Build

**Option B: Using Command Line**

```bash
cd android
./gradlew assembleRelease
```

## 📦 Output Location

Release APK will be at:
```
android/app/build/outputs/apk/release/app-release.apk
```

## 🔐 Signing the APK

### Create Keystore (First Time)

```bash
keytool -genkey -v -keystore ai-agent-ide.keystore \
  -alias agentide -keyalg RSA -keysize 2048 -validity 10000
```

### Sign APK

```bash
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 \
  -keystore ai-agent-ide.keystore \
  android/app/build/outputs/apk/release/app-release-unsigned.apk \
  agentide
```

### Align APK

```bash
zipalign -v 4 app-release-unsigned.apk AI-Agent-IDE-v4.0.0.apk
```

## ✅ Testing

### Install APK on Device

```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

### Debug Mode

```bash
npm run dev
npx cap run android
```

## 🎨 Features Included

✅ Python code execution
✅ JavaScript/HTML preview
✅ Cool generation animations
✅ Live code preview
✅ File management
✅ Multi-language support
✅ Dark/Light themes
✅ Offline PWA support
✅ Real-time collaboration
✅ Git integration
✅ Plugin system

## 📱 App Info

- **Package Name**: com.daviekuminga.agentide
- **Version**: 4.0.0
- **Min SDK**: 22 (Android 5.1)
- **Target SDK**: 33 (Android 13)

## 🐛 Troubleshooting

### Build Fails

```bash
# Clean and rebuild
cd android
./gradlew clean
./gradlew assembleRelease
```

### Capacitor Issues

```bash
# Remove and re-add Android
npx cap remove android
npx cap add android
npx cap sync android
```

## 📞 Support

Repository: https://github.com/daviekumi-glitch/ai-agent-ide
Developer: Davie Kuminga
