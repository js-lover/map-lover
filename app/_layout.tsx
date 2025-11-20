import { NativeTabs, Icon, Label, Badge } from 'expo-router/unstable-native-tabs';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, Text, Layout, IconRegistry } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { EvaIconsPack } from '@ui-kitten/eva-icons';


export default function TabLayout() {

  const [toggle, setToggle] = useState(false);
console.log("TOGGLE:", toggle);


  return (
    <SafeAreaView edges={['left', 'right', 'top']} style={{ flex: 1 }}>
      
          <IconRegistry icons={EvaIconsPack} />

      
      <ApplicationProvider {...eva} theme={toggle ? eva.dark : eva.light}>
        
        {/* Tüm ekranı kapsayan Layout */}
        <Layout style={{ flex: 1 }}>
          
          {/* ABSOLUTE BUTTON CONTAINER */}
          <Layout style={styles.floatingButtonContainer} level="1">
            <Button appearance="filled" status="info" onPress={() => setToggle(!toggle)} >
              <Text>{toggle ? "light" : "dark"}</Text>
            </Button>
          </Layout>
          
          {/* TABS */}
          <NativeTabs>
            <NativeTabs.Trigger name="index" >
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
          
        </Layout>
      </ApplicationProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  floatingButtonContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 999,
  }
});
