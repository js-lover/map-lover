import { StyleSheet, View, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { BlurView } from 'expo-blur';
import RunningStats from './RunningStats';
import { Button } from '../index'; // Custom buton bileşeniniz
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';
import useStopWatchTimer from '@/hooks/useStopWatchTimer';
import useLocation from '@/hooks/useLocation';
import usePedometer from '@/hooks/usePedometer';
import { EvilIcons, Ionicons } from '@expo/vector-icons';



const { width } = Dimensions.get('window');



const Card = () => {




  const {start,stop,finish ,isActive,isPaused,isStart, isStopped, minute, second, isVisible} = useStopWatchTimer();
const {
  latitude,
  longitude,
  totalDistance,
  routeCoordinates,
  pace
} = useLocation(isActive);

const { stepCount, isPedometerAvailable, errorMsg } = usePedometer(isActive);


  return (
    <BlurView intensity={50} tint="light" style={styles.container}>
      {/* ANA METRİK: Mesafe */}
      <View style={styles.primaryMetric}>
        <RunningStats value={`${totalDistance / 1000}`} title="Distance (km)" variant="primary" />
      </View>

      {/* İKİNCİL METRİKLER: Grid Düzeni */}
      <View style={styles.metricsGrid}>
        <RunningStats value={`${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`} title="Duration" />
        <RunningStats value={`${stepCount}`} title="Steps" />
        <RunningStats value={pace} title="Pace (min/km)" />
        <RunningStats value={`${caloriesBurned}`} title="Calories" />
      </View>

      {/* BUTONLAR: Dinamik Genişlik */}
      <View style={styles.actionArea}>
        {!isVisible ? (
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            layout={LinearTransition}
            style={{ width: '100%' }}>
            <Button
              title="START WALKING"
              onPress={() => {
                start();
              }}
              buttonStyle={styles.startBtn}
              textStyle={styles.buttonText}
              icon={<Ionicons name="walk" size={24} color="#fbfbfb" />}
            />
          </Animated.View>
        ) : (
          <Animated.View
            entering={FadeIn}
            layout={LinearTransition}
            style={styles.activeButtonContainer}>
            <Button
              onPress={() => {
                stop();
              }}
              buttonStyle={styles.pauseBtn}
              textStyle={styles.buttonText}
              icon={isPaused ?   <Ionicons name="pause-circle-outline" size={36} color="#fbfbfb"  /> : <Ionicons name="play-circle-outline" size={36} color="#fbfbfb"  />}
            />
            <Button
              onPress={() => {
                finish();
              }}
              buttonStyle={styles.stopBtn}
              textStyle={styles.buttonText}
              icon={<Ionicons name="stop-circle-outline" size={36} color="#fbfbfb"  />}

            />
          </Animated.View>
        )}
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 90,
    padding: 24,
    borderRadius: 60,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  primaryMetric: {
    marginBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.3)',
    paddingBottom: 15,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionArea: {
    flexDirection: 'row',
    height: 55,
    alignItems: 'center',
  },
  activeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  startBtn: {
    backgroundColor: '#007AFF', // Daha profesyonel bir mavi veya canlı yeşil
    height: 55,
    borderRadius: 100,
        borderWidth: 0,

  },
  pauseBtn: {
    
    width: "48%",
    backgroundColor: '#FF9500',
    height: 55,
    borderRadius: 100,
        borderWidth: 0,

  },
  stopBtn: {
    width: "48%",
    backgroundColor: '#FF3B30',
    height: 55,
    borderRadius: 100,
    borderWidth: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fbfbfb',
    letterSpacing: 0.5,
  },
});

export default Card;