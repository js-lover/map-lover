import { StyleSheet, Text, View, Modal, Platform, TextInput } from 'react-native';
import React from 'react';
import Button from './profile/Button';
import { AppleMaps, GoogleMaps } from 'expo-maps';
import {
  AppleMapsMapStyleElevation,
  AppleMapsMapType,
} from 'expo-maps/build/apple/AppleMaps.types';
import { Ionicons } from '@expo/vector-icons';
import { DividerComponent } from '.';
import RunningStats from './map/RunningStats';
import { SafeAreaView } from 'react-native-safe-area-context';

const ModalComponent = ({ visible, onPress }) => {
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

  return (
    <Modal transparent={false} animationType="slide" visible={visible}>
      <SafeAreaView
        edges={['top', 'bottom']}
        style={{ justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
        <View style={{ width: '95%', height: 250, borderRadius: 36, overflow: 'hidden' }}>
          {Platform.OS === 'ios' ? (
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
                  latitude: 37.786,
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
          ) : (
            <GoogleMaps.View style={{ flex: 1 }} />
          )}
        </View>

        <View
          style={{
            margin: 30,
            width: '95%',
            borderWidth: 0.2,
            borderColor: '#666',
            borderRadius: 36,
            padding: 20,
            backgroundColor:"#fbfbfb"
          }}>
          <View style={{ width: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
            <Text style={{ fontSize: 10, fontWeight: 500, marginLeft:5 }}>Workout Name</Text>
        <TextInput style={styles.txtInput} value={"25-12-2025 13:20".toUpperCase()} inputMode="text" />
            <Text style={{ fontWeight: 200, fontSize: 8 }}>* You can edit your workout name</Text>
          </View>

          <DividerComponent marginVertical={12} />

            

            <View style={{ width:"100%",flexDirection: 'row', justifyContent: 'center', marginTop: 10 , flexWrap:"wrap", gap:18 }}>
                <RunningStats title={'Distance'} value={'5.0 km'} valueStyle={{ fontSize:32, fontWeight:900 }} containerStyle={{padding:18}} />
              <RunningStats title={'Duration'} value={'00:00'} valueStyle={{ fontSize:32, fontWeight:900 }} containerStyle={{padding:18}} />
              <RunningStats title={'Steps'} value={'632'} valueStyle={{ fontSize:32, fontWeight:900 }} containerStyle={{padding:18}} />
              <RunningStats title={'Pace'} value={'3:02'} valueStyle={{ fontSize:32, fontWeight:900 }} containerStyle={{padding:18}} />
              <RunningStats title={'Calories'} value={'121'} valueStyle={{ fontSize:32, fontWeight:900 }} containerStyle={{padding:18}} />
            </View>
          </View>

        <View style={{ width: '95%', height: 50 }}>
          <Button
            title={'Add to History'}
            onPress={onPress}
            buttonStyle={styles.btn}
            textStyle={styles.txt}
            icon={<Ionicons name="add-circle" size={24} color={'#fbfbfb'} />}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    backgroundColor: '#FF3B30',
    borderWidth: 0,
  },
  txt: {
    color: '#fbfbfb',
    fontSize: 18,
    fontWeight: '800',
  },
  txtInput: {
    width: '100%',
    height: 40,
    borderWidth: 0.4,
    borderRadius: 8,
    borderColor: "#666",
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: 'black',
    fontWeight:"700"
  },
});
