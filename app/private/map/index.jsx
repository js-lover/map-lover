import { AppleMaps, GoogleMaps } from 'expo-maps';
import { AppleMapsMapType } from 'expo-maps/build/apple/AppleMaps.types';
import { Platform, View, StyleSheet, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import useLocation from '../../../hooks/useLocation';
import useStopWatchTimer from '@/hooks/useStopWatchTimer';
import Card from '@/components/map/Card';
import { useState } from 'react';
import ModalComponent from '@/components/ModalComponent';
import { Button } from '@/components';

export default function Home() {
  const timer = useStopWatchTimer();
  
  // timer.isVisible: Antrenman başladı mı kontrolü
  const locationData = useLocation(timer.isActive, timer.totalSeconds, timer.isVisible);

  const { longitude, latitude, segments } = locationData;

  const [isFollowing, setIsFollowing] = useState(true);
  const [isVisible, setIsVisible] = useState(false)


  return (
    <SafeAreaView edges={[]} style={{ flex: 1 }}>
      {Platform.OS === 'ios' ? (
        <AppleMaps.View
          style={{ flex: 1 }}
          properties={{
            mapType: AppleMapsMapType.STANDARD,
            isMyLocationEnabled: true,
            
          }}
          onCameraMoveStarted={(event) => {
            if (event.reason === 'userInteraction') {
              setIsFollowing(false);
              console.log('isFollowing? : ', isFollowing);
            }
          }}
          cameraPosition={
            (latitude && isFollowing) ? {
              coordinates: { latitude , longitude },
              zoom: 16,
            } : { }
          } 
          polylines={segments.map((s, i) => ({
            key: `segment-${i}`,
            coordinates: s.coords,
            color: s.color,
            width: 5,
            jointType: 'round',
            capType: 'round',
          }))}
          

        />
      ) : (
        <GoogleMaps.View style={{ flex: 1 }} />
      )}

      <View style={styles.cardOverlay}>
        <Card timer={timer} location={locationData} />

        <Button title="Show Modal" onPress={() => setIsVisible(true)} buttonStyle={{ marginBottom: 10 , position: 'absolute', bottom: 500 }} />

        <ModalComponent visible={isVisible} onPress={() => setIsVisible(false)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardOverlay: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  }
});