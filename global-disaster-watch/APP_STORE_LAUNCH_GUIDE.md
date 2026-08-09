# Apple App Store Launch Guide for Global Disaster Watch

This guide provides step-by-step instructions to convert, build, and submit **Global Disaster Watch** (`com.globaldisasterwatch.app`) to the Apple App Store Connect.

---

## 🛠️ Step 1: Initialize Native iOS Platform with Capacitor

Open a terminal on your Mac and run the following commands:

```bash
cd "/Users/ranodipdutta/Documents/GitHub/Multi-Agent-Setup/global-disaster-watch"

# Install Capacitor iOS tooling
npm install @capacitor/core @capacitor/cli @capacitor/ios

# Add native iOS platform & sync web assets
npx cap add ios
npx cap sync
```

---

## 📱 Step 2: Open in Xcode

Run the following command to open the native iOS project directly in Xcode:

```bash
npx cap open ios
```

*(This opens `ios/App/App.xcodeproj` in Xcode on your Mac).*

---

## 🔐 Step 3: Configure Signing & Capabilities in Xcode

1. In Xcode, click on **`App`** at the top of the left Project Navigator.
2. Select the **`App`** target.
3. Go to the **`Signing & Capabilities`** tab.
4. Check **`Automatically manage signing`**.
5. Select your **Apple Developer Team** from the Team dropdown.
6. Verify Bundle Identifier is set to: `com.globaldisasterwatch.app`.

---

## 🎨 Step 4: Add App Store Icons & Splash Screens

1. In Xcode, navigate to `App/App/Assets.xcassets`.
2. Replace **`AppIcon`** with your 1024x1024 App Store icon asset.
3. Verify launch storyboards in `LaunchScreen.storyboard`.

---

## 🚀 Step 5: Archive & Submit to App Store Connect

1. In Xcode, select **`Any iOS Device (arm64)`** from the top build destination target dropdown (or a connected physical iPhone).
2. Go to top menu bar: **`Product` ➔ `Archive`**.
3. Once archiving completes, the **Organizer** window will automatically open.
4. Click **`Distribute App`**.
5. Select **`App Store Connect`** ➔ **`Upload`**.
6. Follow the prompt to sign and submit your binary build to App Store Connect!

---

## 📋 App Store Connect Submission Checklist

- [x] Bundle ID registered: `com.globaldisasterwatch.app`
- [x] Privacy descriptions set in `Info.plist` (`NSLocationWhenInUseUsageDescription`)
- [x] Non-exempt encryption declaration set (`ITSAppUsesNonExemptEncryption` = `false`)
- [ ] Create App listing in [App Store Connect](https://appstoreconnect.apple.com) under **My Apps**
- [ ] Provide 6.5" iPhone & 12.9" iPad screenshots
- [ ] Submit for Apple Review!
