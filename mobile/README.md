# SpendWise Mobile App

A React Native mobile application built with Expo for personal finance management.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app on your mobile device

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Setup:**
   Create a `.env` file in the root directory with:
   ```env
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
   EXPO_PUBLIC_API_URL=https://spendwise-w55r.onrender.com/api
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Run on device:**
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Or press `a` for Android or `i` for iOS simulator

## 📱 Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
mobile/
├── app/                    # Expo Router pages
│   ├── (auth)/            # Authentication routes
│   ├── (root)/            # Main app routes
│   └── _layout.jsx        # Root layout
├── components/             # Reusable components
├── constants/              # App constants
├── hooks/                  # Custom React hooks
├── assets/                 # Images, fonts, styles
└── lib/                    # Utility functions
```

## 🔧 Configuration

### API Configuration
The app automatically detects the environment and uses the appropriate API URL:
- **Production**: `https://spendwise-w55r.onrender.com/api`
- **Development**: Uses `EXPO_PUBLIC_API_URL` if set, otherwise production URL

### Authentication
Uses Clerk for authentication. Make sure to set `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` in your environment variables.

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues:**
   ```bash
   npm start --reset-cache
   ```

2. **Dependencies issues:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Expo CLI issues:**
   ```bash
   npm install -g @expo/cli@latest
   ```

### Development Tips

- Use Expo DevTools for debugging
- Enable Fast Refresh for better development experience
- Use `console.log` for debugging (visible in Metro bundler console)

## 📦 Building for Production

1. **Build for Android:**
   ```bash
   eas build --platform android
   ```

2. **Build for iOS:**
   ```bash
   eas build --platform ios
   ```

3. **Submit to stores:**
   ```bash
   eas submit --platform android
   eas submit --platform ios
   ```

## 🔗 Links

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router Documentation](https://expo.github.io/router/)
