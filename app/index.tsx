import { AppleMaps, GoogleMaps } from 'expo-maps';
import { AppleMapsMapType } from 'expo-maps/build/apple/AppleMaps.types';
import { Platform, Text } from 'react-native';
import useLocation from './hooks/useLocation';

export default function Home() {

  const {longitude, latitude ,errorMsg} = useLocation()

  if (Platform.OS === 'ios') {
    return <AppleMaps.View 
          style={{ flex: 1 }} 
          properties={{
            isTrafficEnabled: false,
            mapType: AppleMapsMapType.STANDARD,
            selectionEnabled: false
          }}
          cameraPosition={longitude && latitude ? {
            coordinates: {
              latitude: latitude, 
              longitude: longitude,
            },
            zoom: 14,
          } : undefined}
    />;
  } else if (Platform.OS === 'android') {
    return <GoogleMaps.View style={{ flex: 1, }} />;
  } else {
    return <Text>Maps are only available on Android and iOS</Text>;
  }
}

const styles = {};
