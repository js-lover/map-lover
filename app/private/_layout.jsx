import { Stack, Redirect } from 'expo-router';
import { getAuth } from '../auth';

import { NativeTabs, Icon, Label, Badge } from 'expo-router/unstable-native-tabs';

export default function PrivateLayout() {
  const logged = getAuth();

  if (!logged) {
    return <Redirect href="/public/login" />;
  }

  return (
    <NativeTabs backgroundColor="black">
      <NativeTabs.Trigger name="map">
        <Label>Map</Label>
        <Icon sf="map" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="history">
        <Icon sf="clock.arrow.circlepath" />
        <Label>History</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <Icon sf="person" />
        <Label>Profile</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
