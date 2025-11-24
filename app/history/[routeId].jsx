import { useLocalSearchParams } from 'expo-router';
import { AppleMaps, GoogleMaps } from 'expo-maps';
import {
  AppleMapsMapStyleElevation,
  AppleMapsMapType,
} from 'expo-maps/build/apple/AppleMaps.types';
import { Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Divider, Text } from '@ui-kitten/components';
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
<View style={{ 
            borderWidth:0.5,
            position: 'absolute',
            flex: 1,
            width: '90%',
            height: 220,
            bottom: 110,
            left: 20,
            right: 20,
            borderRadius: 20,
            overflow:"hidden",
            borderColor:"#0E7AFE"
            }}>
        <BlurView
        tint='light'
        intensity={25}

          style={{
            
            flex: 1,
            width: '100%%',
            height: 220,
            padding:20
          }}>
          
            <View>
              <Text
                id="routeName"
                onPress={() => {
                  console.log(name);
                }}
                numberOfLines={2}
                ellipsizeMode="tail"
                category="h4"
                style={{ fontSize: 20, paddingBottom: 10 }}>
                {name}
              </Text>
            </View>

            <Divider style={{}} />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width:"100%",
                height:"100%",
                flexWrap: 'wrap',
                gap: 20,
                paddingTop: 20,

              }}>
              <View style={{ justifyContent: 'flex-start' }}>
                <Text category="h6">{distance}</Text>
                <Text category="c1" style={{ color: '#0E7AFE' }}>
                  Distance
                </Text>
              </View>
              <View style={{ justifyContent: 'flex-start' }}>
                <Text category="h6">{steps}</Text>
                <Text category="c1" style={{ color: '#0E7AFE' }}>
                  Steps
                </Text>
              </View>
              <View style={{ justifyContent: 'flex-start' }}>
                <Text category="h6">{calories}</Text>
                <Text category="c1" style={{ color: '#0E7AFE' }}>
                  Calories
                </Text>
              </View>
              <View style={{ justifyContent: 'flex-start' }}>
                <Text style={{}} category="h6">
                  {location}
                </Text>
                <Text category="c1" style={{ color: '#0E7AFE' }}>
                  Location
                </Text>
              </View>
              <View style={{ justifyContent: 'flex-start' }}>
                <Text category="h6">{date}</Text>
                <Text category="c1" style={{ color: '#0E7AFE' }}>
                  Date
                </Text>
              </View>

              {/* <Text category="h4"> distance : {distance}</Text>
          <Text category="h4"> date : {date}</Text>
          <Text category="h4"> steps : {steps}</Text>
          <Text category="h4"> calories : {calories}</Text> */}
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
