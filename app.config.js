import 'dotenv/config';

export default {
  expo: {
    name: 'connexx-ai',
    slug: 'connexx-ai',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.sunnydhama.connexxai',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.sunnydhama.connexxai',
    },
    web: {
      build: {
        babel: {
          include: ['@ui-kitten/components'],
        },
      },
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: ['expo-router', 'expo-localization', 'expo-secure-store'],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: '5a004c32-b891-4217-af32-f3ff8f7f587a',
      },
      // eslint-disable-next-line no-undef
      OPEN_API_KEY: process.env.OPEN_API_KEY,
    },
    runtimeVersion: {
      policy: 'appVersion',
    },
    updates: {
      url: 'https://u.expo.dev/5a004c32-b891-4217-af32-f3ff8f7f587a',
    },
  },
};
