import React, { useMemo } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';

//
import useStopwatchStore from '@/store/useStopWatchStore';


import RunningStats from './RunningStats';
import { Button } from '../index';

const { width } = Dimensions.get('window');

const Card = ({ timer, location }) => {
  const { start, stop, finish, isPaused, minute, second, isVisible, hours } = timer;
  const { totalDistance, pace, resetLocation } = location;

  // ✅ Profesyonel Zaman Formatı (Saat 0 ise gizle)
  const formattedTime = useMemo(() => {
    return [
      hours > 0 ? hours.toString().padStart(2, '0') : null,
      minute.toString().padStart(2, '0'),
      second.toString().padStart(2, '0')
    ]
      .filter(Boolean)
      .join(':');
  }, [hours, minute, second]);


  //useWatchTimerStore

  const totalSeconds = useStopwatchStore(state => state.totalSeconds);




  return (
    <BlurView intensity={60} tint="light" style={styles.container}>
      {/* ANA METRİK: Mesafe */}
      <View style={styles.primaryMetric}>
        <RunningStats 
          value={(totalDistance / 1000).toFixed(2)} 
          title="Distance (km)" 
          variant="primary" 
        />

        
      </View>

      {/* İKİNCİL METRİKLER */}
      <View style={styles.metricsGrid}>
        <RunningStats 
          value={formattedTime} 
          title="Duration" 
          // Rakamların titrememesi için stil prop'u ekledik (RunningStats içinde karşılanmalı)
          textStyle={styles.tabularNumbers} 
        />
        <RunningStats value={`344`} title="Steps" />
        <RunningStats value={pace} title="Pace" />
        <RunningStats value={`344`} title="Calories" />
      </View>

      {/* AKSİYON BUTONLARI */}
      <View style={styles.actionArea}>
        {!isVisible ? (
          <Animated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition} style={{ width: '100%' }}>
            <Button
              title="START WALKING"
              onPress={start}
              buttonStyle={styles.startBtn}
              textStyle={styles.buttonText}
              icon={<Ionicons name="walk" size={24} color="#fbfbfb" />}
            />
          </Animated.View>
        ) : (
          <Animated.View entering={FadeIn} layout={LinearTransition} style={styles.activeButtonContainer}>
            <Button
              onPress={stop}
              buttonStyle={styles.pauseBtn}
              icon={isPaused 
                ? <Ionicons name="play-circle-outline" size={32} color="#fbfbfb" /> 
                : <Ionicons name="pause-circle-outline" size={32} color="#fbfbfb" />
              }
            />
            <Button
              onPress={() => finish(() => resetLocation())}
              buttonStyle={styles.stopBtn}
              icon={<Ionicons name="stop-circle-outline" size={32} color="#fbfbfb" />}
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
    bottom: 90,
    padding: 24,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.1)', // Hafif bir arka plan
  },
  primaryMetric: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    paddingBottom: 10,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  tabularNumbers: {
    // 💡 KRİTİK: Saniyeler değiştikçe rakamların zıplamasını/titremesini engeller
    fontVariant: ['tabular-nums'], 
  },
  actionArea: { 
    height: 60, 
    justifyContent: 'center' 
  },
  activeButtonContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    gap: 15 
  },
  startBtn: { 
    backgroundColor: '#007AFF', 
    borderRadius: 100, 
    height: 55,
    shadowColor: '#007AFF',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    borderWidth:0
  },
  pauseBtn: { 
    flex: 1, 
    backgroundColor: '#FF9500', 
    borderRadius: 100, 
    height: 55,
    borderWidth: 0
  },
  stopBtn: { 
    flex: 1, 
    backgroundColor: '#FF3B30', 
    borderRadius: 100, 
    height: 55,
    borderWidth:0
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  }
});

export default Card;