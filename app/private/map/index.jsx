import React, { useState, useEffect, useMemo } from 'react';
import { AppleMaps, GoogleMaps } from 'expo-maps';
import { AppleMapsMapType } from 'expo-maps/build/apple/AppleMaps.types';
import { Platform, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import useStopwatchStore from '@/store/useStopWatchStore';
import useLocationStore from '@/store/useLocationStore';

import Card from '@/components/map/Card';
import ModalComponent from '@/components/ModalComponent';
import { Button } from '@/components';

export default function Home() {
  const isRunning = useStopwatchStore(state => state.isRunning);
  const isVisible = useStopwatchStore(state => state.isVisible);
  const totalSeconds = useStopwatchStore(state => state.totalSeconds);
  const _calculateDisplayTime = useStopwatchStore(state => state._calculateDisplayTime);

  const { location, segments, totalDistance, currentPace, startWatching, stopWatching } = useLocationStore();

  const [isFollowing, setIsFollowing] = useState(true);

  useEffect(() => {
    if (isVisible) {
      startWatching(isRunning, isVisible);
    } else {
      stopWatching();
    }
    return () => stopWatching();
  }, [isVisible, isRunning]);

  const formattedDuration = useMemo(() => {
    if (typeof _calculateDisplayTime !== 'function') return "00:00:00";
    const { hours, minute, second } = _calculateDisplayTime(totalSeconds);
    return `${hours.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
  }, [totalSeconds, _calculateDisplayTime]);

  const distanceStr = (totalDistance / 1000).toFixed(3) + ' km';

  return (
    <SafeAreaView edges={[]} style={{ flex: 1 }}>
      {Platform.OS === 'ios' ? (
        <AppleMaps.View
          style={{ flex: 1 }}
          
          properties={{ mapType: AppleMapsMapType.STANDARD, isMyLocationEnabled: true  }}
          onCameraMoveStarted={(event) => { if (event.reason === 'userInteraction') setIsFollowing(false); }}
          cameraPosition={ (location && isFollowing) ? { coordinates: { latitude: location.latitude, longitude: location.longitude }, zoom: 16 } : {} } 
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
        <Card />
         <ModalComponent
         onSaveToSupabase={() => {console.log('Saved to Supabase');}}
         /> 
          
        
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardOverlay: { width: '100%', position: 'absolute', bottom: 0, alignItems: 'center' },
  modalBtn: { marginBottom: 10, position: 'absolute', bottom: 500 }
});