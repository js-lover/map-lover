import { useAuthContext } from '../hooks/useAuthContext';
import { SplashScreen } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function SplashScreenController() {
  const { isLoading } = useAuthContext();

  if (!isLoading) {
    SplashScreen.hideAsync();
  }

  return null;
}
