import { AppleMaps, GoogleMaps } from 'expo-maps';
import { AppleMapsMapType } from 'expo-maps/build/apple/AppleMaps.types';
import { Alert, Platform, Text } from 'react-native';
import useLocation from './hooks/useLocation';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const { longitude, latitude, errorMsg } = useLocation();

  //dummy route data
  const route = [
    { latitude: 37.785834, longitude: -122.406417 }, // Start
    { latitude: 37.7862, longitude: -122.4059 },
    { latitude: 37.7866, longitude: -122.4053 },
    { latitude: 37.7869, longitude: -122.406 },
    { latitude: 37.7864, longitude: -122.4068 },
    { latitude: 37.7859, longitude: -122.4072 },
  ];

  if (Platform.OS === 'ios') {
    return (

      <SafeAreaView edges={[]} style={{ flex: 1 }}>

      <AppleMaps.View
        style={{ flex: 1 }}
        properties={{
          isTrafficEnabled: false,
          mapType: AppleMapsMapType.STANDARD,
          selectionEnabled: false,
        }}
      
        cameraPosition={
          longitude && latitude
            ? {
                coordinates: {
                  latitude: latitude,
                  longitude: longitude,
                },
                zoom: 16,
              }
            : undefined
        }
        polylines={[
          {
            coordinates: route,

            color: 'blue',
            width: 4,
          },
        ]}
      />

      </SafeAreaView>
    );
  } else if (Platform.OS === 'android') {
    return (
    <SafeAreaView edges={[]} style={{ flex: 1 }}>
    <GoogleMaps.View 
    style={{ flex: 1 }} 
    cameraPosition={
      longitude && latitude
            ? {
                coordinates: {
                  latitude: latitude,
                  longitude: longitude,
                },
                zoom: 16,
              }
            : undefined
    }
    />
    </SafeAreaView>
    );
  } else {
    return <Text>Maps are only available on Android and iOS</Text>;
  }
}

const styles = {};
