import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import StatsComponent from './StatsComponent';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import DividerComponent from './DividerComponent';
import Button from './profile/Button';
import AverageStats from './profile/AverageStats';
import { useTheme } from '../providers/ThemeProvider';

const UserAverageStats = ({ stats }) => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('daily'); // daily, weekly, monthly

  // Varsayılan stats yapısı (eğer props gelmezse patlamasın)
  const defaultStats = {
    daily: { totalDistance: 0, totalDuration: 0, totalCalories: 0, totalSteps: 0, totalWorkouts: 0 },
    weekly: { totalDistance: 0, totalDuration: 0, totalCalories: 0, totalSteps: 0, totalWorkouts: 0 },
    monthly: { totalDistance: 0, totalDuration: 0, totalCalories: 0, totalSteps: 0, totalWorkouts: 0 },
  };

  const safeStats = stats || defaultStats;

  // Yardımcı format fonksiyonları
  const formatDistance = (meters) => {
    return (meters / 1000).toFixed(1) + ' km';
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours} s ${minutes} dk`;
    return `${minutes} dk`;
  };

  const currentStats = safeStats[activeTab];

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: 35,
          marginTop: 12,
          gap: 10,
          marginVertical: 12,
        }}>
        <Button
          title="Günlük"
          onPress={() => setActiveTab('daily')}
          buttonStyle={{
            borderColor: activeTab === 'daily' ? colors.primary : colors.border,
            height: 30,
            width: 105,
            borderRadius: 8,
            backgroundColor: activeTab === 'daily' ? colors.primarySubtle : 'transparent'
          }}
          textStyle={{ color: activeTab === 'daily' ? colors.primary : colors.textSecondary }}
        />
        <Button
          title="Haftalık"
          onPress={() => setActiveTab('weekly')}
          buttonStyle={{
            borderColor: activeTab === 'weekly' ? colors.primary : colors.border,
            height: 30,
            width: 105,
            borderRadius: 8,
            backgroundColor: activeTab === 'weekly' ? colors.primarySubtle : 'transparent'
          }}
          textStyle={{ color: activeTab === 'weekly' ? colors.primary : colors.textSecondary }}
        />
        <Button
          title="Aylık"
          onPress={() => setActiveTab('monthly')}
          buttonStyle={{
            borderColor: activeTab === 'monthly' ? colors.primary : colors.border,
            height: 30,
            width: 105,
            borderRadius: 8,
            backgroundColor: activeTab === 'monthly' ? colors.primarySubtle : 'transparent'
          }}
          textStyle={{ color: activeTab === 'monthly' ? colors.primary : colors.textSecondary }}
        />
      </View>

      <AverageStats
        key={activeTab} // Animasyonun tetiklenmesi için key ekledik
        steps={currentStats.totalSteps}
        workouts={currentStats.totalWorkouts}
        distance={formatDistance(currentStats.totalDistance)}
        time={formatDuration(currentStats.totalDuration)}
      />
    </View>
  );
};
export default UserAverageStats;

const styles = StyleSheet.create({
  divider: {
    marginVertical: 8,
  },

  statsContainer: {
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#666',
    padding: 20,
    backgroundColor: '#fbfbfb',
  },
});
