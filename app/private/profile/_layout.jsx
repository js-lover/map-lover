import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function profileLayout() {
  
  if(Platform.OS==='ios'){

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'profile' }} />
    </Stack>
  );

  }
  if(Platform.OS==='android'){

    return (

      <Stack>
        <Stack.Screen name="index" options={{ headerShown:false }} />
      </Stack>
    );
  }
  
}
