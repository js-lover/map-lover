import { useEffect, useRef, useState } from 'react';
import * as Location from 'expo-location';

/* 🌍 Haversine helper */
const EARTH_RADIUS = 6371000;

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS * c; // metre
};

// calculates pace in min/km format
const formatPace = (secondsPerKm) => {
  if (!secondsPerKm || !isFinite(secondsPerKm)) return '00:00';

  const minutes = Math.floor(secondsPerKm / 60);
  const seconds = Math.floor(secondsPerKm % 60);

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const useLocation = (isActive, totalSeconds) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState(null);

  const [totalDistance, setTotalDistance] = useState(40);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  const lastCoords = useRef(null);
  const subscriptionRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const startWatching = async () => {
      try {
        const { status } =
          await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          setErrorMsg('Location permission denied');
          return;
        }

        subscriptionRef.current =
          await Location.watchPositionAsync(
            {
              accuracy: Location.Accuracy.High,
              distanceInterval: 5,
            },
            (loc) => {
              if (!isMounted) return;

              const { latitude, longitude, accuracy } = loc.coords;

              setLocation({ latitude, longitude });

              if (!isActive) return;
              if (accuracy > 20) return;

              if (!lastCoords.current) {
                lastCoords.current = { latitude, longitude };
                setRouteCoordinates([{ latitude, longitude }]);
                return;
              }

              const distance = haversineDistance(
                lastCoords.current.latitude,
                lastCoords.current.longitude,
                latitude,
                longitude
              );

              if (distance < 3) return;

              setTotalDistance((prev) => prev + distance);
              setRouteCoordinates((prev) => [
                ...prev,
                { latitude, longitude },
              ]);

              lastCoords.current = { latitude, longitude };
            }
          );
      } catch (e) {
        setErrorMsg(e?.message || 'Failed to watch location');
      }
    };

    startWatching();

    return () => {
      isMounted = false;
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }
    };
  }, [isActive]);

  // ✅ PACE BURADA HESAPLANIR (SORUN ÇÖZÜLDÜ)
  const pace =
    totalDistance > 10
      ? formatPace(totalSeconds / (totalDistance / 1000))
      : '00:30';

  return {
    latitude: location?.latitude ?? null,
    longitude: location?.longitude ?? null,
    totalDistance,
    routeCoordinates,
    errorMsg,
    pace,
  };
};

export default useLocation;
