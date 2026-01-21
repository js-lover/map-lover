import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../providers/ThemeProvider';

const StatItem = ({ icon, iconType = 'ionicons', label, value, delay = 0 }) => {
  const IconComponent = iconType === 'material' ? MaterialCommunityIcons : Ionicons;
  const { colors } = useTheme();

  return (
    <Animated.View entering={FadeInLeft.duration(400).delay(delay)} style={[styles.statItem, { backgroundColor: colors.surfaceSecondary }]}>
      <View style={[styles.statIconContainer, { backgroundColor: colors.primarySubtle }]}>
        <IconComponent name={icon} size={20} color={colors.primary} />
      </View>
      <View style={styles.statContent}>
        <Text style={[styles.statValue, { color: colors.text }]}>{value || '0'}</Text>
        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{label}</Text>
      </View>
    </Animated.View>
  );
};

const WeeklyStats = ({ title, steps, time, distance, workouts }) => {
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
          icon="footsteps-outline"
          label="Adım"
          value={steps || '0'}
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statItem: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: 14,
    gap: 12,
  },
  statIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
});
