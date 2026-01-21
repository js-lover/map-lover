import { useLocalSearchParams } from 'expo-router';
import { AppleMaps, GoogleMaps } from 'expo-maps';
import {
  AppleMapsMapStyleElevation,
  AppleMapsMapType,
} from 'expo-maps/build/apple/AppleMaps.types';
import { Platform, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LoadingComponent } from '@/components';
import { useEffect, useState } from 'react';
import { WorkoutHistoryService } from '@/services/workoutService';
import { decodePolyline } from '@/lib/utils/polyline';
import { useTheme } from '@/providers/ThemeProvider';

export default function Detail() {
  const { colors, isDark } = useTheme();
  const { routeId, name, location, date, distance, steps, calories, pace } = useLocalSearchParams();
  const [workout, setWorkout] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      try {
        setIsLoading(true);
        const result = await WorkoutHistoryService.getWorkoutById(routeId);
        if (result.success) {
          setWorkout(result.data);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (routeId) fetchWorkoutDetails();
  }, [routeId]);

  const mapCoordinates = (() => {
    if (!workout?.path) return [];
    if (typeof workout.path === 'string' && workout.path.startsWith('[')) {
      try {
        return JSON.parse(workout.path).map(p => ({
          latitude: p.latitude || p.lat,
          longitude: p.longitude || p.lng,
        }));
      } catch (e) {
        return [];
      }
    }
    if (typeof workout.path === 'string') {
      return decodePolyline(workout.path);
    }
    if (Array.isArray(workout.path)) {
      return workout.path.map(p => ({
        latitude: p.latitude || p.lat,
        longitude: p.longitude || p.lng,
      }));
    }
    return [];
  })();

  const distanceKm = distance ? (Number(distance) / 1000).toFixed(2) + ' km' : '0 km';
  const paceValue = pace?.slice(0, 5) || '00:00';
  const dateValue = date?.slice(0, 10) || '';


  if (Platform.OS === 'ios') {
    if (isLoading) {
      return <LoadingComponent visible={true} />;
    }

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={[]}>
        <AppleMaps.View
          style={{ flex: 1 }}
          properties={{
            isTrafficEnabled: false,
            mapType: AppleMapsMapType.STANDARD,
            selectionEnabled: false,
            isMyLocationEnabled: false,
            elevation: AppleMapsMapStyleElevation.AUTOMATIC,
          }}
          markers={
            mapCoordinates.length > 0
              ? [
                {
                  // (Finish)
                  coordinates: mapCoordinates[mapCoordinates.length - 1],
                  tintColor: 'red',
                  title: 'Bitiş',
                },
                {
                  // (Start)
                  coordinates: mapCoordinates[0],
                  tintColor: 'green',
                  title: 'Başlangıç',
                },
              ]
              : []
          }
          cameraPosition={{
            coordinates: mapCoordinates[0] || { latitude: 0, longitude: 0 },
            zoom: 16,
          }}
          polylines={[
            {
              key: 'route',
              coordinates: mapCoordinates,
              width: 5,
              jointType: 'round',
              capType: 'round',
              color: colors.primary,
            },
          ]}
        />

        <View
          style={{
            position: 'absolute',
            width: '92%',
            bottom: 90,
            alignSelf: 'center',
            borderRadius: 24,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.7)',
          }}>
          <BlurView
            tint={isDark ? "dark" : "light"}
            intensity={40}
            style={{
              padding: 16,
              width: '100%',
            }}>
            {/* Header */}
            <View>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontSize: 20,
                  fontWeight: '800',
                  color: colors.text,
                  letterSpacing: -0.5,
                  marginBottom: 2,
                }}>
                {name}
              </Text>
              <Text style={{ fontSize: 12, color: colors.textSecondary, fontWeight: '500' }}>
                {dateValue}
              </Text>
            </View>

            <View style={{
              height: 1,
              backgroundColor: colors.border,
              marginVertical: 12
            }} />

            {/* Stats Grid */}
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                gap: 10,
              }}>

              {/* Distance */}
              <View style={{
                width: '48%',
                backgroundColor: colors.primarySubtle,
                borderRadius: 14,
                padding: 10,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: colors.primary + '33'
              }}>
                <Text style={{ fontWeight: '800', fontSize: 20, color: colors.text }}>
                  {distanceKm.split(' ')[0]}
                  <Text style={{ fontSize: 13, fontWeight: '600', color: colors.primary }}> km</Text>
                </Text>
                <Text style={{ color: colors.textSecondary, fontSize: 11, marginTop: 2 }}>Mesafe</Text>
              </View>

              {/* Pace */}
              <View style={{
                width: '48%',
                backgroundColor: colors.primarySubtle,
                borderRadius: 14,
                padding: 10,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: colors.primary + '33'
              }}>
                <Text style={{ fontWeight: '800', fontSize: 20, color: colors.text }}>{paceValue}</Text>
                <Text style={{ color: colors.textSecondary, fontSize: 11, marginTop: 2 }}>Tempo</Text>
              </View>

              {/* Steps */}
              <View style={{
                flex: 1,
                backgroundColor: colors.surfaceSecondary,
                borderRadius: 14,
                padding: 10,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: colors.border,
              }}>
                <Text style={{ fontWeight: '700', fontSize: 16, color: colors.text }}>{steps}</Text>
                <Text style={{ color: colors.textSecondary, fontSize: 11, marginTop: 2 }}>Adım</Text>
              </View>

              {/* Calories */}
              <View style={{
                flex: 1,
                backgroundColor: colors.surfaceSecondary,
                borderRadius: 14,
                padding: 10,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: colors.border,
              }}>
                <Text style={{ fontWeight: '700', fontSize: 16, color: colors.text }}>{calories}</Text>
                <Text style={{ color: colors.textSecondary, fontSize: 11, marginTop: 2 }}>Kalori</Text>
              </View>
            </View>
          </BlurView>
        </View>
      </SafeAreaView>
    );
  } else if (Platform.OS === 'android') {
    return (
      <SafeAreaView edges={[]} style={{ flex: 1 }}>
        <GoogleMaps.View
          style={{ flex: 1 }}
          cameraPosition={
            longitude && latitude
              ? {
                coordinates: {
                  latitude: latitude,
                  longitude: longitude,
                },
                zoom: 16,
              }
              : undefined
          }
        />
      </SafeAreaView>
    );
  } else {
    return <Text>Maps are only available on Android and iOS</Text>;
  }
}
