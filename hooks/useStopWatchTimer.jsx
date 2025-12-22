import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';

export default function useStopWatchTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [startTime, setStartTime] = useState(null);
  const [tick, setTick] = useState(0);

  const elapsedTime = useRef(0);

  //durdurduğunda icon değişmesi için state
  const [isPaused, setIsPaused] = useState(true);

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTick(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  /* ---------------- START (RESET + START) ---------------- */
  const start = () => {
    elapsedTime.current = 0;
    setStartTime(Date.now());
    setIsRunning(true);
    setIsVisible(true);
  };

  /* ---------------- STOP (PAUSE / RESUME TOGGLE) ---------------- */
  const stop = () => {
    if (isRunning && startTime) {
      elapsedTime.current += Date.now() - startTime;
      setStartTime(null);
      setIsRunning(false);
      setIsPaused(!isPaused);
      return;
    }

    if (!isRunning) {
      setStartTime(Date.now());
      setIsRunning(true);
      setIsPaused(!isPaused);
    }
  };

  /* ---------------- TIME CALCULATION ---------------- */
  const activeMs = isRunning && startTime ? Date.now() - startTime : 0;

  const totalMs = elapsedTime.current + activeMs;
  const totalSeconds = Math.floor(totalMs / 1000);

  const minute = Math.floor(totalSeconds / 60);
  const second = totalSeconds % 60;

  /* ---------------- FINISH ---------------- */
  const finish = () => {
    if (isRunning) stop();

    Alert.alert(
      'Do you want to finish workout?',
      `You walked for ${minute} minutes and ${second} seconds.`,
      [
        {
          text: 'No',
          onPress: () => {
            setStartTime(Date.now());
            setIsRunning(true);
            setIsPaused(!isPaused);
          },
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            elapsedTime.current = 0;
            setStartTime(null);
            setIsVisible(false);
            setIsPaused(!isPaused);
          },
        },
      ]
    );
  };

  return {
    isRunning,
    isActive: isRunning,
    minute,
    second,
    start,
    stop,
    finish,
    isPaused,
    isVisible,
  };
}
