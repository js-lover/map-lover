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
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: 35,
          marginTop:12,
          gap: 10,
          marginVertical:12,
          
        }}>
        <Button
          title="Last"
          onPress={() => {
            setLast(true);
            setWeekly(false);
            setMonthly(false);
          }}
          buttonStyle={{ ...(last && { borderColor: '#22c55e' }), height: 30,width: 105, borderRadius: 8 }}
          textStyle={{ ...(last && { color: '#22c55e' }) }}
        />
        <Button
          title="Weekly"
          onPress={() => {
            setLast(false);
            setWeekly(true);
            setMonthly(false);
          }}
          buttonStyle={{ ...(weekly && { borderColor: '#22c55e' }), height: 30,width: 105, borderRadius:8 }}
          textStyle={{ ...(weekly && { color: '#22c55e' }) }}
        />
        <Button
          title="Monthly"
          onPress={() => {
            setLast(false);
            setWeekly(false);
            setMonthly(true);
          }}
          buttonStyle={{ ...(monthly && { borderColor: '#22c55e' }), height: 30,width: 105, borderRadius:8 }}
          textStyle={{ ...(monthly && { color: '#22c55e' }) }}
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
