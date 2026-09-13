#!/bin/bash

# AI Agent IDE - Android APK Build Script
# Complete automated build process

set -e

echo "═══════════════════════════════════════════════════════════"
echo "   AI AGENT IDE - Android APK Build Process"
echo "═══════════════════════════════════════════════════════════"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Step 1: Install dependencies
echo -e "${BLUE}[1/6]${NC} Installing Node.js dependencies..."
npm install

# Step 2: Build Next.js app
echo -e "${BLUE}[2/6]${NC} Building Next.js application..."
npm run build

# Step 3: Export static site
echo -e "${BLUE}[3/6]${NC} Exporting static files..."
npm run export || npm run build

# Step 4: Install Capacitor
echo -e "${BLUE}[4/6]${NC} Installing Capacitor..."
npm install @capacitor/core @capacitor/cli @capacitor/android

# Step 5: Initialize Capacitor
echo -e "${BLUE}[5/6]${NC} Configuring Capacitor..."
npx cap init "AI Agent IDE" "com.daviekuminga.agentide" --web-dir=out

# Step 6: Add Android platform
echo -e "${BLUE}[6/6]${NC} Adding Android platform..."
npx cap add android

# Copy web assets
npx cap copy android

# Sync project
npx cap sync android

echo -e "${GREEN}✓${NC} Build preparation complete!"
echo ""
echo "═══════════════════════════════════════════════════════════"
echo "   Next Steps:"
echo "═══════════════════════════════════════════════════════════"
echo "1. Open Android project:"
echo "   ${BLUE}npx cap open android${NC}"
echo ""
echo "2. In Android Studio:"
echo "   - Build → Generate Signed Bundle / APK"
echo "   - Select APK"
echo "   - Choose release"
echo "   - Sign with your keystore"
echo ""
echo "3. Or build from command line:"
echo "   ${BLUE}cd android && ./gradlew assembleRelease${NC}"
echo ""
echo "APK will be at:"
echo "android/app/build/outputs/apk/release/app-release.apk"
echo "═══════════════════════════════════════════════════════════"
