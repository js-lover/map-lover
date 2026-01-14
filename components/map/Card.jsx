import React, { useMemo, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Alert, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

// Store Importları
import useStopwatchStore from '@/store/useStopWatchStore';
import useLocationStore from '@/store/useLocationStore';
import useWorkoutSummaryStore from '@/store/useWorkoutSummaryStore'; // Yeni store eklendi

import RunningStats from './RunningStats';
import { Button } from '../index';

const { width } = Dimensions.get('window');

const Card = () => {
  // --- WORKOUT SUMMARY STORE ---
  const { setSummary } = useWorkoutSummaryStore();

  // --- STOPWATCH STORE ---
  const {
    isRunning,
    isVisible,
    isPaused,
    totalSeconds,
    start,
    stop,
    finishWithPause,
    _calculateDisplayTime
  } = useStopwatchStore();

  // --- LOCATION STORE ---
  const {
    totalDistance,
    currentPace,
    calculatePace,
    resetLocation,
    segments // Koordinat geçmişini buradan alıyoruz
  } = useLocationStore();

  // ✅ Pace Hesabı
  useEffect(() => {
    if (isRunning && !isPaused) {
      calculatePace(totalSeconds);
    }
  }, [totalSeconds]);

  // ✅ 2. SORUN ÇÖZÜMÜ: Snapshot ve Alert Akış Yönetimi
  const handleFinish = () => {
    // 1. Önce zamanlayıcıyı duraklat (Kullanıcı 'Hayır' derse devam edebilir)
    const { confirm, cancel } = finishWithPause();

    const { hours, minute, second } = _calculateDisplayTime(totalSeconds);

    Alert.alert(
      'Antrenmanı bitirmek istiyor musunuz?',
      `${hours > 0 ? hours + ' saat ' : ''}${minute} dakika ${second} saniye yürüdünüz.`,
      [
        {
          text: 'Hayır',
          onPress: cancel,
          style: 'cancel',
        },
        {
          text: 'Evet',
          style: 'destructive',
          onPress: () => {
            // segments verisinin derin bir kopyasını alıyoruz
            const segmentsSnapshot = JSON.parse(JSON.stringify(segments || []));

            console.log("Kaydedilen Segment Sayısı:", segmentsSnapshot.length);

            setSummary({
              workoutName: `${new Date().toLocaleDateString('tr-TR', { hour: '2-digit', minute: '2-digit' })}`,
              distance: totalDistance,
              duration: totalSeconds,
              steps: 0,
              pace: currentPace,
              calories: 0,
              path: segmentsSnapshot, // Modalın beklediği segmentli yapı
            });

            resetLocation();
            confirm();
          },
        },
      ]
    );
  };

  const formattedTime = useMemo(() => {
    const { hours, minute, second } = _calculateDisplayTime(totalSeconds);
    return [
      hours > 0 ? hours.toString().padStart(2, '0') : null,
      minute.toString().padStart(2, '0'),
      second.toString().padStart(2, '0')
    ].filter(Boolean).join(':');
  }, [totalSeconds]);

  return (
    <View style={styles.cardWrapper}>
      <BlurView intensity={80} tint="dark" style={styles.container}>
        {/* Primary Metric - Distance */}
        <View style={styles.primaryMetric}>
          <Text style={styles.primaryLabel}>MESAFE</Text>
          <View style={styles.primaryValueRow}>
            <Text style={styles.primaryValue}>{(totalDistance / 1000).toFixed(2)}</Text>
            <Text style={styles.primaryUnit}>km</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Stats Grid */}
        <View style={styles.metricsGrid}>
          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Ionicons name="time-outline" size={18} color="#22c55e" />
            </View>
            <View>
              <Text style={[styles.statValue, styles.tabularNumbers]}>{formattedTime}</Text>
              <Text style={styles.statLabel}>Süre</Text>
            </View>
          </View>

          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Ionicons name="footsteps-outline" size={18} color="#22c55e" />
            </View>
            <View>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Adım</Text>
            </View>
          </View>

          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Ionicons name="speedometer-outline" size={18} color="#22c55e" />
            </View>
            <View>
              <Text style={styles.statValue}>{currentPace}</Text>
              <Text style={styles.statLabel}>Tempo</Text>
            </View>
          </View>

          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Ionicons name="flame-outline" size={18} color="#22c55e" />
            </View>
            <View>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Kalori</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionArea}>
          {!isVisible ? (
            <Animated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition} style={{ width: '100%' }}>
              <Button
                title="YÜRÜYÜŞE BAŞLA"
                onPress={start}
                buttonStyle={styles.startBtn}
                textStyle={styles.buttonText}
                icon={<Ionicons name="walk" size={22} color="#fff" />}
              />
            </Animated.View>
          ) : (
            <Animated.View entering={FadeIn} layout={LinearTransition} style={styles.activeButtonContainer}>
              <Button
                onPress={stop}
                buttonStyle={styles.pauseBtn}
                icon={isPaused
                  ? <Ionicons name="play" size={28} color="#fff" />
                  : <Ionicons name="pause" size={28} color="#fff" />
                }
              />
              <Button
                onPress={handleFinish}
                buttonStyle={styles.stopBtn}
                icon={<Ionicons name="stop" size={28} color="#fff" />}
              />
            </Animated.View>
          )}
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    position: 'absolute',
    bottom: 90,
    alignSelf: 'center',
  },
  container: {
    width: width * 0.92,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
  },
  primaryMetric: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  primaryLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  primaryValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  primaryValue: {
    fontSize: 40,
    fontWeight: '700',
    color: '#22c55e',
    letterSpacing: -2,
    fontVariant: ['tabular-nums'],
  },
  primaryUnit: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 10,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748b',
    textAlign: 'center',
    marginTop: 2,
  },
  tabularNumbers: {
    fontVariant: ['tabular-nums'],
  },
  actionArea: {
    minHeight: 56,
    justifyContent: 'center'
  },
  activeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16
  },
  startBtn: {
    backgroundColor: '#22c55e',
    borderRadius: 8,
    height: 56,
    borderWidth: 0,
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  pauseBtn: {
    width: "155",
    height: 56,
    backgroundColor: '#f59e0b',
    borderRadius: 8,
    borderWidth: 0,
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  stopBtn: {
    width: "155",
    height: 56,
    backgroundColor: '#ef4444',
    borderRadius: 8,
    borderWidth: 0,
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.5,
  }
});

export default Card;