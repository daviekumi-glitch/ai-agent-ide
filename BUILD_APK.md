# 🚀 Building Production APK for AI Agent IDE

## Prerequisites

1. **Node.js** (v18 or later)
2. **Android Studio** with SDK installed
3. **Java JDK** (v11 or later)
4. **Capacitor CLI** installed globally

## Step-by-Step Build Process

### 1. Install Dependencies

```bash
npm install
```

### 2. Build Next.js App

```bash
npm run build
```

### 3. Export Static Files

```bash
npx next export
```

### 4. Initialize Capacitor (First Time Only)

```bash
npx cap init
npx cap add android
```

### 5. Sync Web Assets to Android

```bash
npx cap sync android
```

### 6. Open in Android Studio

```bash
npx cap open android
```

### 7. Build APK in Android Studio

1. In Android Studio, go to **Build → Build Bundle(s) / APK(s) → Build APK(s)**
2. Wait for Gradle build to complete
3. APK will be located at: `android/app/build/outputs/apk/debug/app-debug.apk`

### 8. Build Release APK (Production)

#### Generate Keystore (First Time Only)

```bash
keytool -genkey -v -keystore ai-agent-ide.keystore -alias ai-agent-ide -keyalg RSA -keysize 2048 -validity 10000
```

#### Configure Signing in Android Studio

1. Open `android/app/build.gradle`
2. Add signing configuration:

```gradle
android {
    signingConfigs {
        release {
            storeFile file('../../ai-agent-ide.keystore')
            storePassword 'your-password'
            keyAlias 'ai-agent-ide'
            keyPassword 'your-password'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

#### Build Release APK

```bash
cd android
./gradlew assembleRelease
```

Release APK will be at: `android/app/build/outputs/apk/release/app-release.apk`

## Quick Build Script

Create `build-apk.sh`:

```bash
#!/bin/bash

echo "🚀 Building AI Agent IDE APK..."

# Build Next.js
echo "📦 Building Next.js app..."
npm run build

# Export static files
echo "📤 Exporting static files..."
npx next export

# Sync to Android
echo "🔄 Syncing to Android..."
npx cap sync android

# Build APK
echo "🏗️ Building APK..."
cd android
./gradlew assembleDebug

echo "✅ APK built successfully!"
echo "📍 Location: android/app/build/outputs/apk/debug/app-debug.apk"
```

Make executable:
```bash
chmod +x build-apk.sh
./build-apk.sh
```

## Testing APK

### Install on Device/Emulator

```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Run on Connected Device

```bash
npx cap run android
```

## Troubleshooting

### Gradle Build Fails

```bash
cd android
./gradlew clean
./gradlew assembleDebug --info
```

### Port Already in Use

```bash
npx kill-port 3000
npm run dev
```

### Capacitor Sync Issues

```bash
npx cap sync android --force
```

---

**Created by:** Davie Kuminga  
**Version:** 3.0.0  
**Last Updated:** 2025
