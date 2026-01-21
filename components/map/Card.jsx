import React, { useMemo, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Alert, Text, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/providers/ThemeProvider';

// Store Importları
import useStopwatchStore from '@/store/useStopWatchStore';
import useLocationStore from '@/store/useLocationStore';
import useWorkoutSummaryStore from '@/store/useWorkoutSummaryStore'; // Yeni store eklendi

import RunningStats from './RunningStats';
import { Button } from '../index';

const { width } = Dimensions.get('window');

const Card = () => {
  const { theme, colors, isDark } = useTheme();
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
      <BlurView
        intensity={80}
        tint={isDark ? "dark" : "light"}
        style={[styles.container, { backgroundColor: isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.75)', borderColor: colors.border }]}
      >
        {/* Primary Metric - Distance */}
        <View style={styles.primaryMetric}>
          <Text style={[styles.primaryLabel, { color: colors.textSecondary }]}>MESAFE</Text>
          <View style={styles.primaryValueRow}>
            <Text style={[styles.primaryValue, { color: colors.primary }]}>{(totalDistance / 1000).toFixed(2)}</Text>
            <Text style={[styles.primaryUnit, { color: colors.textSecondary }]}>km</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Stats Grid */}
        <View style={styles.metricsGrid}>
          <View style={styles.statItem}>
            <View style={[styles.statIconContainer, { backgroundColor: colors.primarySubtle }]}>
              <Ionicons name="time-outline" size={18} color={colors.primary} />
            </View>
            <View>
              <Text style={[styles.statValue, styles.tabularNumbers, { color: colors.text }]}>{formattedTime}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Süre</Text>
            </View>
          </View>

          <View style={styles.statItem}>
            <View style={[styles.statIconContainer, { backgroundColor: colors.primarySubtle }]}>
              <Ionicons name="footsteps-outline" size={18} color={colors.primary} />
            </View>
            <View>
              <Text style={[styles.statValue, { color: colors.text }]}>0</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Adım</Text>
            </View>
          </View>

          <View style={styles.statItem}>
            <View style={[styles.statIconContainer, { backgroundColor: colors.primarySubtle }]}>
              <Ionicons name="speedometer-outline" size={18} color={colors.primary} />
            </View>
            <View>
              <Text style={[styles.statValue, { color: colors.text }]}>{currentPace}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Tempo</Text>
            </View>
          </View>

          <View style={styles.statItem}>
            <View style={[styles.statIconContainer, { backgroundColor: colors.primarySubtle }]}>
              <Ionicons name="flame-outline" size={18} color={colors.primary} />
            </View>
            <View>
              <Text style={[styles.statValue, { color: colors.text }]}>0</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Kalori</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionArea}>
          {!isVisible ? (
            <Animated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition} style={{ width: '100%' }}>
              <TouchableOpacity onPress={start} activeOpacity={0.8}>
                <LinearGradient
                  colors={[colors.primary, '#16a34a']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.startBtnGradient}
                >
                  <Ionicons name="walk" size={22} color="#fff" />
                  <Text style={styles.buttonText}>YÜRÜYÜŞE BAŞLA</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          ) : (
            <Animated.View entering={FadeIn} layout={LinearTransition} style={styles.activeButtonContainer}>
              <TouchableOpacity onPress={stop} activeOpacity={0.8} style={styles.flex1}>
                <LinearGradient
                  colors={isPaused ? [colors.primary, '#16a34a'] : [colors.warning, '#d97706']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.actionBtnGradient}
                >
                  <Ionicons
                    name={isPaused ? "play" : "pause"}
                    size={28}
                    color="#fff"
                  />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleFinish} activeOpacity={0.8} style={styles.flex1}>
                <LinearGradient
                  colors={[colors.danger, '#dc2626']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.actionBtnGradient}
                >
                  <Ionicons name="stop" size={28} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
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
  },
  primaryMetric: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  primaryLabel: {
    fontSize: 11,
    fontWeight: '600',
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
    letterSpacing: -2,
    fontVariant: ['tabular-nums'],
  },
  primaryUnit: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  divider: {
    height: 1,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '500',
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
    gap: 12,
    width: '100%',
  },
  flex1: {
    flex: 1,
  },
  startBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 56,
    borderRadius: 28,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  actionBtnGradient: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 1,
  }
});

export default Card;