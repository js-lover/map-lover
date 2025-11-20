import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { Button, Card, Divider, Text } from '@ui-kitten/components';
import StatsComponent from './StatsComponent';
import Animated, { FadeInLeft, FadeOut, FadeOutRight } from 'react-native-reanimated';

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
          justifyContent: 'flex-start',
          width: '90%',
          paddingTop: 25,
        }}>
        <Button
          appearance="ghost"
          onPress={() => {
            setLast(true);
            setWeekly(false);
            setMonthly(false);
          }}
          status={last ? 'primary' : 'basic'}
          style={{ alignSelf: 'flex-start', fontWeight: 'light' }}>
          Last
        </Button>
        <Button
          appearance="ghost"
          onPress={() => {
            setLast(false);
            setWeekly(true);
            setMonthly(false);
          }}
          status={weekly ? 'primary' : 'basic'}
          style={{ alignSelf: 'flex-start', fontWeight: 'light' }}>
          Weekly
        </Button>
        <Button
          appearance="ghost"
          onPress={() => {
            setLast(false);
            setWeekly(false);
            setMonthly(true);
          }}
          status={monthly ? 'primary' : 'basic'}
          style={{ alignSelf: 'flex-start', fontWeight: 'light' }}>
          Monthly
        </Button>
      </View>

      {last && (
        <Animated.View
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Card style={[styles.last]}>
            <Text category="h6" style={{ textAlign: 'left', marginBottom: 10, fontWeight: 'bold' }}>
              Last Stats
            </Text>
            <Animated.View entering={FadeInLeft.duration(300)}>
              <StatsComponent title={'Distance'} value={'129 km'} />
            </Animated.View>

            <Divider style={styles.divider} />

            <Animated.View entering={FadeInLeft.duration(600)}>
              <StatsComponent title={'Time'} value={'40 hours'} />
            </Animated.View>

            <Divider style={styles.divider} />

            <Animated.View entering={FadeInLeft.duration(900)}>
              <StatsComponent title={'Workouts'} value={'21'} />
            </Animated.View>

            <Divider style={styles.divider} />

            <Animated.View entering={FadeInLeft.duration(1200)}>
              <StatsComponent title={'Calories Burned'} value={'14.000'} />
            </Animated.View>
          </Card>
        </Animated.View>
      )}

      {weekly && (
        <Animated.View
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Card style={[styles.weekly, { display: weekly ? 'flex' : 'none' }]}>
            <Text category="h6" style={{ textAlign: 'left', marginBottom: 10, fontWeight: 'bold' }}>
              Average Weekly Stats
            </Text>

            <Animated.View entering={FadeInLeft.duration(300)}>
              <StatsComponent title={'Distance'} value={'129 km'} />
            </Animated.View>

            <Divider style={styles.divider} />

            <Animated.View entering={FadeInLeft.duration(600)}>
              <StatsComponent title={'Time'} value={'40 hours'} />
            </Animated.View>

            <Divider style={styles.divider} />

            <Animated.View entering={FadeInLeft.duration(900)}>
              <StatsComponent title={'Workouts'} value={'21'} />
            </Animated.View>

            <Divider style={styles.divider} />

            <Animated.View entering={FadeInLeft.duration(1200)}>
              <StatsComponent title={'Calories Burned'} value={'14.000'} />
            </Animated.View>
          </Card>
        </Animated.View>
      )}

      {monthly && (
        <Animated.View
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Card style={[styles.monthly, { display: monthly ? 'flex' : 'none' }]}>
            <Text category="h6" style={{ textAlign: 'left', marginBottom: 10, fontWeight: 'bold' }}>
              Average Monthly Stats
            </Text>

            <Animated.View entering={FadeInLeft.duration(300)}>
              <StatsComponent title={'Distance'} value={'129 km'} />
            </Animated.View>

            <Divider style={styles.divider} />

            <Animated.View entering={FadeInLeft.duration(600)}>
              <StatsComponent title={'Time'} value={'40 hours'} />
            </Animated.View>

            <Divider style={styles.divider} />

            <Animated.View entering={FadeInLeft.duration(900)}>
              <StatsComponent title={'Workouts'} value={'21'} />
            </Animated.View>

            <Divider style={styles.divider} />

            <Animated.View entering={FadeInLeft.duration(1200)}>
              <StatsComponent title={'Calories Burned'} value={'14.000'} />
            </Animated.View>
          </Card>
        </Animated.View>
      )}
    </>
  );
};

export default UserAverageStats;

const styles = StyleSheet.create({
  last: {
    width: '90%',
    borderRadius: 20,
  },
  weekly: {
    width: '90%',
    borderRadius: 20,
  },
  monthly: {
    width: '90%',
    borderRadius: 20,
  },

  divider: {
    marginVertical: 8,
  },
});
