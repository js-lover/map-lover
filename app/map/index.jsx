import { AppleMaps, GoogleMaps } from 'expo-maps';
import {
  AppleMapsMapStyleElevation,
  AppleMapsMapType,
} from 'expo-maps/build/apple/AppleMaps.types';
import { Alert, Platform, Text } from 'react-native';
import useLocation from '../hooks/useLocation';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const { longitude, latitude, errorMsg } = useLocation();

  //dummy route data
  const route = [
    { latitude: 37.785834, longitude: -122.406417 }, // Start
    { latitude: 37.7862, longitude: -122.4059 },
    { latitude: 37.7862, longitude: -122.4058 },
    { latitude: 37.7862, longitude: -122.4057 },
    { latitude: 37.7862, longitude: -122.4056 },
    { latitude: 37.7862, longitude: -122.4055 },
    { latitude: 37.7862, longitude: -122.4054 },
    { latitude: 37.7862, longitude: -122.4053 },
    { latitude: 37.7862, longitude: -122.4052 },
    { latitude: 37.7862, longitude: -122.4051 },
    { latitude: 37.7862, longitude: -122.405 },

    { latitude: 37.7866, longitude: -122.4053 },
    { latitude: 37.7869, longitude: -122.4063 },
    { latitude: 37.7864, longitude: -122.407 },
    { latitude: 37.7859, longitude: -122.4078 },
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
            isMyLocationEnabled: true,
            elevation: AppleMapsMapStyleElevation.AUTOMATIC,
          }}
          circles={[
            {
              center: { latitude, longitude },
              radius: 50, // metre cinsinden yarıçap
              color: 'rgba(14,122,254,0.3)', // dolgu rengi
              strokeColor: 'blue',
            },
          ]}
          cameraPosition={
            longitude && latitude
              ? {
                  coordinates: {
                    latitude: latitude,
                    longitude: longitude,
                  },
                  zoom: 17,
                }
              : undefined
          }
          polylines={[
            {
              coordinates: route,
              color: '#0E7AFE',
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
