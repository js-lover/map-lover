/* import { NativeTabs, Icon, Label, Badge } from 'expo-router/unstable-native-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import "../global.css";

export default function TabLayout() {
  const [toggle, setToggle] = useState(false);
  console.log('TOGGLE:', toggle);

  return ( */
/*     <SafeAreaView edges={['left', 'right']} style={{ flex: 1 }}>
 */
{
  /* Tüm ekranı kapsayan Layout */
}

{
  /* TABS */
}

/*  <NativeTabs backgroundColor="black">


            <NativeTabs.Trigger name="private/map">
              <Label>Map</Label>
              <Icon sf="map" />
            </NativeTabs.Trigger> */

{
  /* <NativeTabs.Trigger name="private/history">
              <Icon sf="clock.arrow.circlepath" />
              <Label>History</Label>
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="private/profile">
              <Icon sf="person" />
              <Label>Profile</Label>
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="public">
              <Icon sf="person" />
              <Label>login/register</Label>
            </NativeTabs.Trigger> */
}

/*   </NativeTabs> */

/*   </SafeAreaView> */
/*   );
}
 */
/* const styles = StyleSheet.create({
  floatingButtonContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 999,
  },
});
 */

import { Stack } from 'expo-router';

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
