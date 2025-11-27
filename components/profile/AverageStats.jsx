import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { DividerComponent, StatsComponent } from '..';

const WeeklyStats = ({title, calories, time, distance, workouts}) => {
  return (
    <Animated.View style={styles.statsContainer}>
      <Text style={{ textAlign: 'left', fontWeight: 800, fontSize: 20 }}>{title}</Text>
      <DividerComponent color="gray" height={0.4} marginVertical={12} />

      <Animated.View entering={FadeInLeft.duration(300)}>
        <StatsComponent title={'Distance'} value={distance} />
      </Animated.View>

      <Animated.View entering={FadeInLeft.duration(600)}>
        <StatsComponent title={'Time'} value={time} />
      </Animated.View>

      <Animated.View entering={FadeInLeft.duration(900)}>
        <StatsComponent title={'Workouts'} value={workouts} />
      </Animated.View>

      <Animated.View entering={FadeInLeft.duration(1200)}>
        <StatsComponent title={'Calories Burned'} value={calories} />
      </Animated.View>
    </Animated.View>
  );
};
export default WeeklyStats;

const styles = StyleSheet.create({
  statsContainer: {
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#fbfbfb',
  },
});
