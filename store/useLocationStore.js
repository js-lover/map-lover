import { create } from 'zustand';
import * as Location from 'expo-location';

const EARTH_RADIUS = 6371000;

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (v) => (v * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return EARTH_RADIUS * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const useLocationStore = create((set, get) => ({
  location: null,
  totalDistance: 0,
  segments: [],
  lastCoords: null,
  subscription: null,
  currentPace: '00:00',

  startWatching: async (isRunning, isVisible) => {
    // Varsa eski aboneliği temizle
    if (get().subscription) {
      get().subscription.remove();
      set({ subscription: null });
    }

    if (!isVisible) return;

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return;

    const sub = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 1,
        timeInterval: 1000,
      },
      (loc) => {
        const { latitude, longitude, accuracy } = loc.coords;
        const newPoint = { latitude, longitude };

        if (accuracy > 30) return;

        set((state) => {
          let updatedDistance = state.totalDistance;
          let updatedSegments = [...state.segments];
          const currentColor = isRunning ? '#0E7AFE' : '#FF3B30';

          // Mesafe Hesaplama (Sadece aktifken)
          if (isRunning && state.lastCoords) {
            const dist = haversineDistance(
              state.lastCoords.latitude,
              state.lastCoords.longitude,
              latitude,
              longitude
            );

            // GPS gürültüsünü filtrele
            if (dist > 0.5 && dist < 50) {
              updatedDistance += dist;
            }
          }

          // Segment/Çizgi Mantığı
          if (updatedSegments.length === 0) {
            updatedSegments = [{ coords: [newPoint], color: currentColor }];
          } else {
            const lastSegment = updatedSegments[updatedSegments.length - 1];
            if (lastSegment.color !== currentColor) {
              const connPoint = lastSegment.coords[lastSegment.coords.length - 1];
              updatedSegments.push({ coords: [connPoint, newPoint], color: currentColor });
            } else {
              lastSegment.coords = [...lastSegment.coords, newPoint];
            }
          }

          return {
            location: newPoint,
            totalDistance: updatedDistance,
            segments: updatedSegments,
            lastCoords: newPoint,
          };
        });
      }
    );
    set({ subscription: sub });
  },

  calculatePace: (totalSeconds) => {
    if (totalSeconds > 0 && totalSeconds % 60 === 0) {
      const { totalDistance } = get();
      if (totalDistance < 5) return;
      const distanceInKm = totalDistance / 1000;
      const s = totalSeconds / distanceInKm;
      const m = Math.floor(s / 60);
      const paceStr = `${m}:${Math.floor(s % 60)
        .toString()
        .padStart(2, '0')}`;
      set({ currentPace: paceStr });
    }
  },

  stopWatching: () => {
    if (get().subscription) {
      get().subscription.remove();
      set({ subscription: null });
    }
  },

  resetLocation: () => {
    set({ totalDistance: 0, segments: [], lastCoords: null, location: null, currentPace: '00:00' });
  },
}));

export default useLocationStore;
