import { Stack } from 'expo-router';

export default function HistoryLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: 'Workout History' }} />
      <Stack.Screen name="[routeId]" options={{ headerShown: true, title: '' , headerBackButtonDisplayMode: 'default', headerTransparent:true}} />
    </Stack>
  );
}
