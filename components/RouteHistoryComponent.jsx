import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const RouteHistoryComponent = ({ routeName, date, distance, location, duration, onPress }) => {
  // Tarihi formatla
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const dateObj = new Date(dateString);
    const dateFormatted = dateObj.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
    });
    const timeFormatted = dateObj.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${dateFormatted} • ${timeFormatted}`;
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.95} style={styles.cardWrapper}>
      <View style={styles.card}>
        {/* Üst Kısım - Harita Placeholder */}
        <View style={styles.mapContainer}>
          {/* Placeholder - daha sonra gerçek harita görüntüsü ile değiştirilecek */}
          <LinearGradient
            colors={['#e8f4f8', '#d1e7dd', '#c3dfd9']}
            style={styles.mapPlaceholder}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="map-outline" size={68} color="#94a3b8" />
          </LinearGradient>

          {/* Walking Badge
          <View style={styles.walkingBadge}>
            <View style={styles.walkingIconContainer}>
              <Ionicons name="walk" size={16} color="#22c55e" />
            </View>
            <Text style={styles.walkingText}>Walking</Text>
          </View>
          */}
        </View>

        {/* Alt Kısım - Bilgi Alanı */}
        <View style={styles.infoContainer}>
          <View style={styles.infoLeft}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.routeName}>
              {routeName}
            </Text>
            <View style={styles.dateRow}>
              <MaterialCommunityIcons name="calendar-blank-outline" size={14} color="#9ca3af" />
              <Text style={styles.dateText}>{formatDate(date)}</Text>
            </View>
          </View>

          <View style={styles.infoRight}>
           <View style={styles.distanceContainer}>
             <Text style={styles.distanceValue}>{distance || '0'}</Text>
            <Text style={styles.distanceText}>km</Text>
           </View>
            <View style={styles.durationRow}>
              <Ionicons name="time-outline" size={14} color="#9ca3af" />
              <Text style={styles.durationText}>{duration || '0m'}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RouteHistoryComponent;

const styles = StyleSheet.create({
  cardWrapper: {
    width: '100%',
    paddingHorizontal: 16,
  },
  card: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    // Android Shadow
    elevation: 8,
  },
  mapContainer: {
    width: '100%',
    height: 150,
    position: 'relative',
  },
  mapPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  walkingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f2937',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    gap: 6,
  },
  walkingIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  walkingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1f2937',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  infoLeft: {
    flex: 1,
    gap: 6,
  },
  routeName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.3,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9ca3af',
  },
  infoRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  distanceValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#22c55e',
    letterSpacing: -0.5,
    
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  durationText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9ca3af',
  },
  distanceText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#9ca3af',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});

