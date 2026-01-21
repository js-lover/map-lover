import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { useMemo } from 'react';
import { decodePolyline } from '@/lib/utils/polyline';
import { useTheme } from '@/providers/ThemeProvider';

const RouteHistoryComponent = ({ routeName, date, distance, location, duration, path, onPress, onDelete }) => {
  const { colors } = useTheme();

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

  const svgPath = useMemo(() => {
    if (!path) return null;

    let coordinates = [];
    if (typeof path === 'string' && path.startsWith('[')) {
      try {
        coordinates = JSON.parse(path);
      } catch (e) {
        console.error('Path parsing error:', e);
        return null;
      }
    } else if (typeof path === 'string') {
      coordinates = decodePolyline(path);
    } else {
      coordinates = path;
    }

    if (!Array.isArray(coordinates) || coordinates.length < 2) return null;

    // Koordinatları normalize et (lat/lng veya latitude/longitude)
    const points = coordinates.map(p => ({
      x: p.longitude || p.lng,
      y: p.latitude || p.lat
    }));

    // Bounding box hesapla
    let minX = points[0].x, maxX = points[0].x;
    let minY = points[0].y, maxY = points[0].y;

    points.forEach(p => {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    });

    const width = maxX - minX;
    const height = maxY - minY;

    // Sıfır genişlik veya yükseklik kontrolü (tek nokta veya düz çizgi gibi)
    if (width === 0 && height === 0) return null;

    // Aspect ratio koruyarak padding ekle
    const padding = Math.max(width, height) * 0.1;
    const finalMinX = minX - padding;
    const finalMaxX = maxX + padding;
    const finalMinY = minY - padding;
    const finalMaxY = maxY + padding;

    const finalWidth = finalMaxX - finalMinX;
    const finalHeight = finalMaxY - finalMinY;

    // SVG path string oluştur
    // Y eksenini ters çeviriyoruz çünkü ekran koordinatlarında Y aşağı doğru artar ama latitude yukarı doğru artar
    const d = points.map((p, i) => {
      // 0-100 aralığına normalize et
      const x = ((p.x - finalMinX) / finalWidth) * 100;
      const y = 100 - ((p.y - finalMinY) / finalHeight) * 100; // Y eksenini çevir
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    return d;
  }, [path]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.95} style={styles.cardWrapper}>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {/* Üst Kısım - Harita Placeholder veya SVG */}
        <View style={[styles.mapContainer, { backgroundColor: colors.background }]}>
          <LinearGradient
            colors={[colors.surface, colors.background]} // Koyu tema renkleri
            style={styles.mapPlaceholder}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >

            <TouchableOpacity
              style={[styles.deleteButton, { backgroundColor: colors.background + '99', borderColor: colors.border }]}
              onPress={(e) => {
                e.stopPropagation();
                onDelete && onDelete();
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="trash-outline" size={24} color={colors.danger} />
            </TouchableOpacity>


            {svgPath ? (
              <Svg height="100%" width="100%" viewBox="0 0 100 100" style={{ padding: 20 }}>
                <Path
                  d={svgPath}
                  stroke={colors.primary}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </Svg>
            ) : (
              <Ionicons name="map-outline" size={68} color={colors.surfaceSecondary} />
            )}
          </LinearGradient>
        </View>

        {/* Alt Kısım - Bilgi Alanı */}
        <View style={[styles.infoContainer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
          <View style={styles.infoLeft}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.routeName, { color: colors.text }]}>
              {routeName}
            </Text>
            <View style={styles.dateRow}>
              <MaterialCommunityIcons name="calendar-blank-outline" size={14} color={colors.textSecondary} />
              <Text style={[styles.dateText, { color: colors.textSecondary }]}>{formatDate(date)}</Text>
            </View>
          </View>

          <View style={styles.infoRight}>
            <View style={styles.distanceContainer}>
              <Text style={[styles.distanceValue, { color: colors.primary }]}>{distance || '0'}</Text>
              <Text style={[styles.distanceText, { color: colors.textMuted }]}>km</Text>
            </View>
            <View style={styles.durationRow}>
              <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
              <Text style={[styles.durationText, { color: colors.textSecondary }]}>{duration || '0m'}</Text>
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
    marginBottom: 16, // Alt boşluk ekledim
  },
  card: {
    width: '100%',
    borderRadius: 24, // Daha modern yuvarlak köşeler
    overflow: 'hidden',
    borderWidth: 1,
  },
  mapContainer: {
    width: '100%',
    height: 160, // Biraz daha yüksek
    position: 'relative',
  },
  mapPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderTopWidth: 1,
  },
  infoLeft: {
    flex: 1,
    gap: 4,
  },
  routeName: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 13,
    fontWeight: '500',
  },
  infoRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  distanceValue: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  durationText: {
    fontSize: 13,
    fontWeight: '500',
  },
  distanceText: {
    fontSize: 14,
    fontWeight: '600',
    paddingBottom: 4,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  deleteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderWidth: 1,
  },
});

