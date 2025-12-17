import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import StatsComponent from './StatsComponent';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import DividerComponent from './DividerComponent';
import Button from './profile/Button';
import AverageStats from './profile/AverageStats';

// last - weekly - monthly
//Distance - time - workout - calories
const UserAverageStats = () => {
  const [last, setLast] = useState(true);
  const [weekly, setWeekly] = useState(false);
  const [monthly, setMonthly] = useState(false);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
          height: 35,
          marginTop:25,
          gap: 10,
          marginBottom: 10,
        }}>
        <Button
          title="Last"
          onPress={() => {
            setLast(true);
            setWeekly(false);
            setMonthly(false);
          }}
          buttonStyle={{ ...(last && { borderColor: '#0E7AFE' }), width: 105 }}
          textStyle={{ ...(last && { color: '#0E7AFE' }) }}
        />
        <Button
          title="Weekly"
          onPress={() => {
            setLast(false);
            setWeekly(true);
            setMonthly(false);
          }}
          buttonStyle={{ ...(weekly && { borderColor: '#0E7AFE' }), width: 105 }}
          textStyle={{ ...(weekly && { color: '#0E7AFE' }) }}
        />
        <Button
          title="Monthly"
          onPress={() => {
            setLast(false);
            setWeekly(false);
            setMonthly(true);
          }}
          buttonStyle={{ ...(monthly && { borderColor: '#0E7AFE' }), width: 105 }}
          textStyle={{ ...(monthly && { color: '#0E7AFE' }) }}
        />
      </View>

      {last && (
        <AverageStats
          title="Last Stats"
          calories={690}
          workouts={4}
          distance={29 + ' km'}
          time={7 + ' hours'}
        />
      )}

      {weekly && (
        <AverageStats
          title="Weekly Average Stats"
          calories={690}
          workouts={4}
          distance={29 + ' km'}
          time={7 + ' hours'}
        />
      )}

      {monthly && (
        <AverageStats
          title="Monthly Average Stats"
          calories={690}
          workouts={4}
          distance={29 + ' km'}
          time={7 + ' hours'}
        />
      )}
    </>
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
    borderRadius: 20,
    borderWidth: 0.4,
    borderColor: '#0E7AFE',
    padding: 20,
    backgroundColor: '#fbfbfb',
  },
});
