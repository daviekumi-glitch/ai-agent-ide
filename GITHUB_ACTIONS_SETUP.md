# GitHub Actions APK Build Setup Guide

## 🚀 Automated Android APK Build

This project uses GitHub Actions to automatically build Android APK files on every push to main.

## 📋 Prerequisites

### For Unsigned Debug APK (Easy Setup)
- ✅ No additional setup required
- The `build-debug.yml` workflow will run automatically
- Downloads debug APK from GitHub Actions artifacts

### For Signed Release APK (Production)
You need to set up GitHub Secrets:

1. **Generate a keystore** (if you don't have one):
   ```bash
   keytool -genkey -v -keystore my-release-key.keystore \
     -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Convert keystore to Base64**:
   ```bash
   base64 my-release-key.keystore > keystore.b64
   ```

3. **Add GitHub Secrets**:
   Go to: `Settings → Secrets and variables → Actions → New repository secret`
   
   Add these secrets:
   - `SIGNING_KEY`: Content of keystore.b64 file
   - `ALIAS`: Your key alias (e.g., `my-key-alias`)
   - `KEY_STORE_PASSWORD`: Keystore password
   - `KEY_PASSWORD`: Key password

## 🔨 Build Workflows

### 1. Debug Build (Automatic)
- **Workflow**: `.github/workflows/build-debug.yml`
- **Triggers**: Every push to main branch
- **Output**: Unsigned debug APK
- **Use case**: Testing and development

### 2. Release Build (Requires Secrets)
- **Workflow**: `.github/workflows/build-android.yml`
- **Triggers**: Push to main, tags, manual dispatch
- **Output**: Signed release APK
- **Use case**: Production releases

## 📥 Download APK

### From GitHub Actions:
1. Go to: `Actions` tab in your repository
2. Click on the latest workflow run
3. Scroll down to `Artifacts` section
4. Download the APK file

### From Releases (Tagged builds only):
1. Go to: `Releases` tab
2. Download the APK from the latest release

## 🏃 Manual Trigger

You can manually trigger a build:
1. Go to `Actions` tab
2. Select the workflow
3. Click `Run workflow`
4. Choose branch and click `Run workflow`

## 📱 Install APK on Android

1. Download the APK to your Android device
2. Enable "Install from Unknown Sources" in Settings
3. Open the APK file to install
4. Allow installation when prompted

## 🔍 Monitoring Build Status

- **Badge**: Add this to your README:
  ```markdown
  ![Build Status](https://github.com/daviekumi-glitch/ai-agent-ide/workflows/Build%20Android%20APK/badge.svg)
  ```

- **Build logs**: Check the Actions tab for detailed logs

## 🐛 Troubleshooting

### Build fails with "Command not found: cap"
- Solution: The workflow installs Capacitor globally, this should not happen

### APK not found after build
- Check the workflow logs for errors
- Ensure `npm run build` succeeds
- Verify Capacitor sync completed

### Gradle build fails
- Check Java version (should be 17)
- Verify Android SDK installation in workflow
- Check gradle permissions

## 📊 Build Metrics

- **Average build time**: ~10-15 minutes
- **APK size**: ~20-50 MB (varies with dependencies)
- **Retention**: Artifacts kept for 30 days

## 🎯 Next Steps

1. ✅ Commit workflow files to repository
2. ✅ Push to GitHub
3. ✅ Wait for automated build
4. ✅ Download APK from Actions artifacts
5. ✅ Test on Android device

---

**Created by**: Davie Kuminga  
**Repository**: https://github.com/daviekumi-glitch/ai-agent-ide  
**Version**: v4.0.0
