import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { BlurView } from 'expo-blur';
import RunningStats from './RunningStats';
import { Button } from '../index';
import Animated, { LinearTransition } from 'react-native-reanimated';

const Card = () => {
  const [isStart, setIsStart] = useState(false);

  return (
    <BlurView intensity={40} tint="light" style={styles.container}>
      {/* ------- METRICS ------- */}
      <View style={styles.metricsContainer}>
        <RunningStats
          value="4.3"
          title="Distance (km)"
          titleFontSize={12}
          valueFontSize={32}
          titleFontWeight={200}
          valueFontWeight={500}
        />
        <RunningStats
          value="43:43"
          title="Duration"
          titleFontSize={12}
          valueFontSize={42}
          titleFontWeight={400}
          valueFontWeight={700}
        />
        <RunningStats
          value="2506"
          title="Steps"
          titleFontSize={12}
          valueFontSize={32}
          titleFontWeight={200}
          valueFontWeight={500}
        />
      </View>

      {/* ------- BUTTONS AREA ------- */}
      <Animated.View style={styles.buttonsWrapper}>
        {isStart ? (
          <>
            <Animated.View layout={LinearTransition}>
              <Button
                title="Pause"
                onPress={() => setIsStart(false)}
                buttonStyle={styles.pauseBtn}
                textStyle={styles.buttonText}
              />
            </Animated.View>

            <Animated.View layout={LinearTransition}>
              <Button
                title="Stop"
                onPress={() => setIsStart(false)}
                buttonStyle={styles.stopBtn}
                textStyle={styles.buttonText}
              />
            </Animated.View>
          </>
        ) : (
          <Animated.View layout={LinearTransition}>
            <Button
              title="Start"
              onPress={() => setIsStart(true)}
              buttonStyle={styles.startBtn}
              textStyle={styles.buttonText}
            />
          </Animated.View>
        )}
      </Animated.View>
    </BlurView>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 200,
    position: 'absolute',
    bottom: 100,
    padding: 20,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  metricsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  buttonsWrapper: {
    width: '100%',
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  startBtn: {
    width: 300,
    height: 50,
    backgroundColor: 'green',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  pauseBtn: {
    width: 150,
    height: 50,
    backgroundColor: '#2d3748',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#2d3748',
  },

  stopBtn: {
    width: 150,
    height: 50,
    backgroundColor: '#ff3b30',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ff3b30',
  },

  buttonText: {
    color: '#fbfbfb',
    fontSize: 18,
    fontWeight: '900',
  },
});
