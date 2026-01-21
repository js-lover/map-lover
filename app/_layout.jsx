import React from 'react';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { SplashScreenController } from '../components';
import AuthProvider from '../providers/AuthProvider';
import { ThemeProvider } from '../providers/ThemeProvider';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SplashScreenController />
        <Slot />
        <StatusBar style="auto" />
      </AuthProvider>
    </ThemeProvider>
  );
}
