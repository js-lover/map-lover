import 'dotenv/config';

export default {
  expo: {
    name: 'menza',
    slug: 'menza',
    version: '1.0.0',
    scheme: 'menza',
    platforms: ['ios', 'android'],

    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/favicon.png',
    },

    plugins: [
      'expo-router',

      [
        'expo-maps',
        {
          requestLocationPermission: true,
          locationPermission: 'Allow $(PRODUCT_NAME) to use your location',
        },
      ],

      [
        'expo-location',
        {
          locationAlwaysAndWhenInUsePermission:
            'Allow $(PRODUCT_NAME) to use your location.',
        },
      ],

      'expo-sqlite',
      'expo-secure-store',

      // ❌ KALDIRILDI → signing zorunluluğu yapıyordu
      // 'expo-apple-authentication',

      [
        'expo-image-picker',
        {
          photosPermission:
            'Menza wants to access your photos to let you change profile photo.',
        },
      ],
    ],

    experiments: {
      typedRoutes: true,
      tsconfigPaths: true,
    },

    orientation: 'portrait',
    icon: './assets/splash.png',
    userInterfaceStyle: 'light',

    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },

    assetBundlePatterns: ['**/*'],

    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.serhatbarisaydin.menza',

      // ❌ KAPATILDI → signing istemesin diye
      usesAppleSignIn: false,
      deploymentTarget: '13.0',
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },

    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },

      config: {
        googleMaps: {
          apiKey: 'AIzaSyDiJ-rfHCQav-sKweCo9Fz_M-YE9Olgnd8',
        },
      },

      permissions: [
        'android.permission.ACCESS_COARSE_LOCATION',
        'android.permission.ACCESS_FINE_LOCATION',
      ],

      package: 'com.serhatbarisaydin.menza',
    },

    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      router: {},
      eas: {
        projectId: 'b8ae0f48-c826-4949-9530-b9f1c61446f8',
      },
    },
  },
};
