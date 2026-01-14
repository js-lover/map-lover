import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Animated, { FadeInLeft, FadeInUp } from 'react-native-reanimated';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const StatItem = ({ icon, iconType = 'ionicons', label, value, delay = 0 }) => {
  const IconComponent = iconType === 'material' ? MaterialCommunityIcons : Ionicons;

  return (
    <Animated.View entering={FadeInLeft.duration(400).delay(delay)} style={styles.statItem}>
      <View style={styles.statIconContainer}>
        <IconComponent name={icon} size={20} color="#22c55e" />
      </View>
      <View style={styles.statContent}>
        <Text style={styles.statValue}>{value || '0'}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    </Animated.View>
  );
};

const WeeklyStats = ({ title, calories, time, distance, workouts }) => {
  return (
    <View style={styles.container}>
      


      <View style={styles.statsGrid}>
        <StatItem
          icon="map-outline"
          label="Mesafe"
          value={distance || '0 km'}
          delay={100}
        />
        <StatItem
          icon="time-outline"
          label="Süre"
          value={time || '0 dk'}
          delay={200}
        />
        <StatItem
          icon="walk"
          iconType="material"
          label="Antrenman"
          value={workouts || '0'}
          delay={300}
        />
        <StatItem
          icon="flame-outline"
          label="Kalori"
          value={calories || '0 kcal'}
          delay={400}
        />
      </View>
    </View>
  );
};

export default WeeklyStats;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.3,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statItem: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.08)',
    borderRadius: 14,
    padding: 14,
    gap: 12,
  },
  statIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
    marginTop: 2,
  },
});

