import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';

export default function useStopWatchTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [tick, setTick] = useState(0); 
  const elapsedTime = useRef(0);
  const [isPaused, setIsPaused] = useState(true);

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (!isRunning) return;

    // Saniyede bir kez render tetikleyerek sürenin güncellenmesini sağlar
    const interval = setInterval(() => {
      setTick(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  /* ---------------- START ---------------- */
  const start = () => {
    elapsedTime.current = 0;
    setStartTime(Date.now());
    setIsRunning(true);
    setIsVisible(true);
    setIsPaused(false);
  };

  /* ---------------- STOP (PAUSE / RESUME) ---------------- */
  const stop = () => {
    if (isRunning && startTime) {
      // Geçen süreyi dondur ve kaydet
      elapsedTime.current += Date.now() - startTime;
      setStartTime(null);
      setIsRunning(false);
      setIsPaused(true);
    } else {
      // Kaldığı yerden devam et
      setStartTime(Date.now());
      setIsRunning(true);
      setIsPaused(false);
    }
  };

  /* ---------------- TIME CALCULATION (CRITICAL FIX) ---------------- */
  // Süre hesabını re-render'lardan bağımsız, tek bir tam sayıya (totalSeconds) indirgedik
  const activeMs = isRunning && startTime ? Date.now() - startTime : 0;
  const totalMs = elapsedTime.current + activeMs;
  const totalSeconds = Math.floor(totalMs / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minute = Math.floor(totalSeconds / 60);
  const second = totalSeconds % 60;

  /* ---------------- FINISH ---------------- */
  const finish = (onSuccessCallback) => {
    // Önce zamanı durdur
    const currentRunningState = isRunning;
    if (isRunning) {
        elapsedTime.current += Date.now() - startTime;
        setStartTime(null);
        setIsRunning(false);
    }

    Alert.alert(
      'Antrenmanı bitirmek istiyor musunuz?',
      `${minute} dakika ${second} saniye yürüdünüz.`,
      [
        {
          text: 'Hayır',
          onPress: () => {
            // Eğer daha önce çalışıyorsa devam ettir
            if (currentRunningState) {
                setStartTime(Date.now());
                setIsRunning(true);
            }
          },
        },
        {
          text: 'Evet',
          style: 'destructive',
          onPress: () => {
            // Callback varsa çalıştır (Supabase kaydı için)
            if (onSuccessCallback && typeof onSuccessCallback === 'function') {
                onSuccessCallback();
            }
            // Resetleme işlemleri
            elapsedTime.current = 0;
            setStartTime(null);
            setIsVisible(false);
            setIsRunning(false);
            setIsPaused(true);
          },
        },
      ]
    );
  };

  return {
    isRunning,
    isActive: isRunning, // useLocation ile uyum için
    totalSeconds,
    minute,
    second,
    start,
    stop,
    finish,
    isPaused,
    isVisible,
    hours,
  };
}