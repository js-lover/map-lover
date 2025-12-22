import { useState, useEffect, useRef } from 'react';
import { Pedometer } from 'expo-sensors';

const usePedometer = (isActive) => {
  const [stepCount, setStepCount] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [errorMsg, setErrorMsg] = useState(null);

  const subscriptionRef = useRef(null);

  useEffect(() => {
    const preparePedometer = async () => {
      try {
        const result = await Pedometer.isAvailableAsync();
        setIsPedometerAvailable(result ? 'available' : 'unavailable');

        if (result) {
          const { status } = await Pedometer.requestPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Adım sayar izni reddedildi.');
          }
        }
      } catch (e) {
        setIsPedometerAvailable('unavailable');
        setErrorMsg('Sensör kontrolünde hata oluştu.');
      }
    };

    preparePedometer();
  }, []);

  useEffect(() => {
    let isMounted = true;

    // --- KRİTİK KONTROL BLOĞU ---
    if (isPedometerAvailable === 'available' && isActive) {
      // Sadece donanım varsa ve antrenman başlatıldıysa çalışır
      subscriptionRef.current = Pedometer.watchStepCount((result) => {
        if (isMounted) {
          setStepCount((prevTotal) => prevTotal + 1);
        }
      });
      console.log('👟 Adım sayar başarıyla dinleniyor...');
    } else {
      // Simülatördeysek veya Pause (isActive: false) durumundaysak burası çalışır
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }
      
      const reason = !isActive ? "Antrenman duraklatıldı" : "Donanım desteklenmiyor";
      console.log(`🛑 Adım sayar aktif değil. Sebep: ${reason}`);
    }
    // ----------------------------

    return () => {
      isMounted = false;
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
      }
    };
  }, [isActive, isPedometerAvailable]);

  const caloriesBurned = parseFloat((stepCount * 0.04).toFixed(2));

  return {
    stepCount,
    caloriesBurned,
    isPedometerAvailable,
    errorMsg
  };
};

export default usePedometer;