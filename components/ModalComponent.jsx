import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Platform,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native';
import { AppleMaps, GoogleMaps } from 'expo-maps';
import { AppleMapsMapType } from 'expo-maps/build/apple/AppleMaps.types';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/providers/ThemeProvider';

import useWorkoutSummaryStore from '@/store/useWorkoutSummaryStore';
import { LoadingComponent } from '.';
import Button from './profile/Button';
import { WorkoutHistoryService } from '@/services/workoutService';
import { simplifyPath, encodePolyline } from '@/lib/utils/polyline';

const { width } = Dimensions.get('window');

// Stat Item Component
const StatItem = ({ icon, label, value }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.statItem, { backgroundColor: colors.surfaceSecondary }]}>
      <View style={[styles.statIconContainer, { backgroundColor: colors.primarySubtle }]}>
        <Ionicons name={icon} size={18} color={colors.primary} />
      </View>
      <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{label}</Text>
    </View>
  );
};

const ModalComponent = ({ onSaveToSupabase }) => {
  const { colors, isDark } = useTheme();
  const { summary, isModalVisible, closeModal } = useWorkoutSummaryStore();
  const [localName, setLocalName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const flatCoords = useMemo(() => {
    if (!summary?.path) return [];
    return summary.path.flatMap((seg) =>
      seg.coords.map((c) => ({
        latitude: Number(c.latitude),
        longitude: Number(c.longitude),
      }))
    );
  }, [summary]);

  useEffect(() => {
    if (summary) {
      setLocalName(summary.workoutName);
    }
  }, [summary]);

  if (!summary) return null;

  const startCoords = flatCoords[0];
  const endCoords = flatCoords[flatCoords.length - 1];

  // Format duration
  const formatDuration = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  async function saveWorkout() {
    setIsLoading(true);

    try {
      const finalData = {
        workout_name: localName,
        distance: summary.distance,
        duration: summary.duration,
        pace: summary.pace,
        steps: summary.steps,
        calories: summary.calories,
        path: encodePolyline(simplifyPath(flatCoords, 0.00002)),
      };


      if (summary.distance < 200) {
        closeModal();
        Alert.alert('Mesafe Uyarısı', 'Mesafe 200 m den az olamaz!');
        return;
      }


      const result = await WorkoutHistoryService.createWorkout(finalData);
      if (result.success) {
        closeModal();
      } else {
        console.error("Error saving workout:", result.error);
      }
    } catch (error) {
      console.error("Error saving workout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      transparent={false}
      animationType="slide"
      visible={isModalVisible}
      onRequestClose={closeModal}>
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>

        {isLoading && <LoadingComponent visible={isLoading} />}

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Antrenman Özeti</Text>
          </View>

          {/* Map Container */}
          <View style={[styles.mapContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {Platform.OS === 'ios' ? (
              <AppleMaps.View
                key={`map-${flatCoords.length}`}
                style={{ flex: 1 }}
                properties={{
                  mapType: AppleMapsMapType.STANDARD,
                  isMyLocationEnabled: false,
                }}
                markers={[
                  startCoords && {
                    coordinates: startCoords,
                    tintColor: 'green',
                    title: 'Start',
                  },
                  endCoords && {
                    coordinates: endCoords,
                    tintColor: 'red',
                    title: 'Finish',
                  },
                ].filter(Boolean)}
                cameraPosition={endCoords ? { coordinates: endCoords, zoom: 16 } : undefined}
                polylines={summary.path.map((s, i) => ({
                  key: `seg-${i}`,
                  coordinates: s.coords,
                  color: s.color,
                  width: 5,
                  jointType: 'round',
                  capType: 'round',
                }))}
              />
            ) : (
              <GoogleMaps.View style={{ flex: 1 }} />
            )}
          </View>

          {/* Stats Card */}
          <View style={[styles.statsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {/* Workout Name Input */}
            <View style={styles.inputWrapper}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Antrenman Adı</Text>
              <View style={[styles.inputContainer, { backgroundColor: colors.background, borderColor: colors.border }]}>
                <Feather name="edit-3" size={18} color={colors.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={[styles.txtInput, { color: colors.text }]}
                  value={localName}
                  onChangeText={setLocalName}
                  placeholder="Antrenman adı..."
                  placeholderTextColor={colors.textMuted}
                />
              </View>
            </View>

            {/* Divider */}
            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            {/* Stats Grid */}
            <View style={styles.statsGrid}>
              <StatItem
                icon="map-outline"
                label="Mesafe"
                value={`${(summary.distance / 1000).toFixed(2)} km`}
              />
              <StatItem
                icon="time-outline"
                label="Süre"
                value={formatDuration(summary.duration)}
              />
              <StatItem
                icon="footsteps-outline"
                label="Adım"
                value={summary.steps || '0'}
              />
              <StatItem
                icon="speedometer-outline"
                label="Tempo"
                value={summary.pace || '0:00'}
              />
              <StatItem
                icon="flame-outline"
                label="Kalori"
                value={summary.calories || '0'}
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={() => saveWorkout()}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={[colors.primary, '#16a34a']}
                style={styles.saveBtnGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="cloud-upload-outline" size={22} color="#fff" />
                <Text style={styles.saveTxt}>Geçmişe Ekle</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.discardBtn}
              onPress={closeModal}
              activeOpacity={0.7}
            >
              <Text style={[styles.discardTxt, { color: colors.danger }]}>Vazgeç</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  header: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  mapContainer: {
    width: width * 0.92,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
  },
  statsCard: {
    marginVertical: 20,
    width: width * 0.92,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
  },
  inputWrapper: {
    width: '100%'
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
  },
  inputIcon: {
    marginLeft: 16,
  },
  txtInput: {
    flex: 1,
    height: 52,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  statItem: {
    width: '30%',
    alignItems: 'center',
    borderRadius: 14,
    padding: 12,
    gap: 6,
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  actionContainer: {
    width: width * 0.92,
    gap: 12,
    marginTop: 10,
  },
  saveBtn: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  saveBtnGradient: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  saveTxt: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700'
  },
  discardBtn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discardTxt: {
    fontSize: 16,
    fontWeight: '600'
  },
});

export default ModalComponent;