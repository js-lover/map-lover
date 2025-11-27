import { useLocalSearchParams } from 'expo-router';
import { AppleMaps, GoogleMaps } from 'expo-maps';
import {
  AppleMapsMapStyleElevation,
  AppleMapsMapType,
} from 'expo-maps/build/apple/AppleMaps.types';
import { Platform, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';

export default function Detail() {
  const { routeId, name, location, date, distance, steps, calories } = useLocalSearchParams();

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

  {
    /* <Text category="h4"> user id : {routeId}</Text>
      <Text category="h4"> name : {name}</Text>
      <Text category="h4"> location : {location}</Text>
      <Text category="h4"> distance : {distance}</Text>
      <Text category="h4"> date : {date}</Text> */
  }

  if (Platform.OS === 'ios') {
    return (
      <SafeAreaView style={{ flex: 1 }} edges={[]}>
        <AppleMaps.View
          style={{ flex: 1 }}
          properties={{
            isTrafficEnabled: false,
            mapType: AppleMapsMapType.STANDARD,
            selectionEnabled: false,
            isMyLocationEnabled: false,
            elevation: AppleMapsMapStyleElevation.AUTOMATIC,
          }}
          markers={[
            {
              coordinates: { latitude: 37.7859, longitude: -122.4078 },
              tintColor: 'red',
              title: 'finish',
            },
            {
              coordinates: { latitude: 37.785834, longitude: -122.406417 },
              tintColor: 'green',
              title: 'start',
            },
          ]}
          cameraPosition={{
            coordinates: {
              latitude: 37.7845,
              longitude: -122.406417,
            },
            zoom: 16,
          }}
          polylines={[
            {
              coordinates: route,
              color: '#0E7AFE',
              width: 4,
            },
          ]}
        />
        <View
          style={{
            borderWidth: 0.5,
            position: 'absolute',
            flex: 1,
            width: '90%',
            height: 220,
            bottom: 110,
            left: 20,
            right: 20,
            borderRadius: 20,
            overflow: 'hidden',
            borderColor: '#0E7AFE',
          }}>
          <BlurView
            tint="light"
            intensity={25}
            style={{
              flex: 1,
              width: '100%%',
              height: 220,
              padding: 20,
            }}>
            <View>
              <Text
                id="routeName"
                onPress={() => {
                  console.log(name);
                }}
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{ fontSize: 20, paddingBottom: 10, fontWeight: 900 , color:"#3C3C44"}}>
                {name}
              </Text>
            </View>

            <View style={{ borderBottomWidth: 1, borderColor: '#0E7AFE' }} />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%',
                flexWrap: 'wrap',
                gap: 20,
                paddingTop: 20,
              }}>
              <View style={{ justifyContent: 'flex-start' }}>
                <Text style={{ fontWeight: 900, fontSize: 24 , color:"#3C3C44"}}>{distance}</Text>
                <Text style={{ color: '#0E7AFE', fontWeight: 400 }}>Distance</Text>
              </View>
              <View style={{ justifyContent: 'flex-start' }}>
                <Text style={{ fontWeight: 900, fontSize: 24 , color:"#3C3C44"}}>{steps}</Text>
                <Text style={{ color: '#0E7AFE', fontWeight: 400 }}>Steps</Text>
              </View>
              <View style={{ justifyContent: 'flex-start' }}>
                <Text style={{ fontWeight: 900, fontSize: 24, color:"#3C3C44" }}>{calories}</Text>
                <Text style={{ color: '#0E7AFE', fontWeight: 400 }}>Calories</Text>
              </View>
              <View style={{ justifyContent: 'flex-start' }}>
                <Text style={{ fontWeight: 900, fontSize: 16, color:"#3C3C44" }}>{location}</Text>
                <Text style={{ color: '#0E7AFE', fontWeight: 400 }}>Location</Text>
              </View>
              <View style={{ justifyContent: 'flex-start' }}>
                <Text style={{ fontWeight: 900, fontSize: 16 , color:"#3C3C44"}}>{date}</Text>
                <Text style={{ color: '#0E7AFE', fontWeight: 400 }}>Date</Text>
              </View>
            </View>
          </BlurView>
        </View>
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
