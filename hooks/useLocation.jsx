import { useEffect, useMemo, useRef, useState } from 'react';
import * as Location from 'expo-location';

const EARTH_RADIUS = 6371000;

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (v) => (v * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return EARTH_RADIUS * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const formatPace = (s) => {
  if (!s || !isFinite(s) || s <= 0) return '00:00';
  const m = Math.floor(s / 60);
  return `${m}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
};

const useLocation = (isActive, totalSeconds, isStarted) => {
  const [location, setLocation] = useState(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [segments, setSegments] = useState([]);

  const lastCoords = useRef(null);
  const subscriptionRef = useRef(null);

  useEffect(() => {
    // BUG FIX: Antrenman başlamadıysa dinleyiciyi başlatma ve stateleri temizle
    if (!isStarted) {
      setSegments([]);
      setTotalDistance(0);
      lastCoords.current = null;
      return;
    }

    let isMounted = true;

    const startWatching = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') return;

      subscriptionRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High, // Battery Optimization: Switch to High
          distanceInterval: 5,
          timeInterval: 4000, // Battery Optimization: 4s interval
        },
        (loc) => {
          if (!isMounted) return;
          const { latitude, longitude, accuracy, speed } = loc.coords;
          const newPoint = { latitude, longitude };

          // Her zaman güncel konumu set et (Harita takibi için)
          setLocation(newPoint);


          // Prod: accuracy > 25 ise güvenme
          if (accuracy > 25) return;

          // Hız kontrolü (GPS sapmalarını önlemek için)
          // 25 km/h (yaklaşık 7 m/s) üzerindeki hızlar yürüyüş için anormal kabul edilir
          if (speed && speed > 7) return;

          setSegments(prevSegments => {
            const currentColor = isActive ? '#0E7AFE' : '#FF3B30';

            if (prevSegments.length === 0) {
              return [{ coords: [newPoint], color: currentColor }];

            }

            const lastSegment = prevSegments[prevSegments.length - 1];

            // Durum (Pause/Resume) değiştiyse yeni segment başlat
            if (lastSegment.color !== currentColor) {
              const connPoint = lastSegment.coords[lastSegment.coords.length - 1];
              return [...prevSegments, { coords: [connPoint, newPoint], color: currentColor }];
            }

            // Aynı moddaysak noktayı ekle
            const updatedLastSegment = {
              ...lastSegment,
              coords: [...lastSegment.coords, newPoint]
            };
            return [...prevSegments.slice(0, -1), updatedLastSegment];
          });

          // Sadece aktifken ve önceki koordinat varken mesafe hesapla
          if (isActive && lastCoords.current) {
            const dist = haversineDistance(lastCoords.current.latitude, lastCoords.current.longitude, latitude, longitude);
            // Noise Filter: 3m (önceki 1.5m) altındaki değişimleri yoksay
            if (dist > 3) setTotalDistance(prev => prev + dist);
          }

          lastCoords.current = newPoint;
        }
      );
    };

    startWatching();

    return () => {
      isMounted = false;
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }
    };
  }, [isActive, isStarted]); // isStarted eklendi!

  const pace = useMemo(() => {
    if (totalDistance < 10 || totalSeconds < 60) return '00:00';
    return formatPace(totalSeconds / (totalDistance / 1000));
  }, [totalDistance, Math.floor(totalSeconds / 60)]);

  const resetLocation = () => {
    setTotalDistance(0);
    setSegments([]);
    lastCoords.current = null;
  };

  return {
    latitude: location?.latitude,
    longitude: location?.longitude,
    totalDistance,
    segments,
    pace,
    resetLocation
  };
};

export default useLocation;