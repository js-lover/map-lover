import React from 'react';
import { Redirect } from 'expo-router';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function PrivateLayout() {
  const { isLoading, isLoggedIn } = useAuthContext();

  if (isLoading) return null; // veya Loading bileşeni render et
  if (!isLoggedIn) return <Redirect href="/public" />;

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="map">
        <Label>Map</Label>
        <Icon sf="map.fill" selectedColor="#22c55e" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="history">
        <Icon sf="clock.arrow.circlepath" selectedColor="#22c55e" />
        <Label>History</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <Icon sf="person.fill" selectedColor="#22c55e" />
        <Label>Profile</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
