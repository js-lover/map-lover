import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { AvatarComponent } from './';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../providers/ThemeProvider';

const UserInfoComponent = ({ username, memberDate, avatarUrl, location, onPress }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {/* Avatar Section */}
      <View style={styles.avatarSection}>
        <AvatarComponent avatarUrl={avatarUrl} onPress={onPress} size={90} />
        <TouchableOpacity
          style={[styles.editBadge, { backgroundColor: colors.primary, borderColor: colors.card }]}
          onPress={onPress}
          activeOpacity={0.8}
        >
          <Ionicons name="camera" size={14} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Info Section */}
      <View style={styles.infoSection}>
        <Text style={[styles.username, { color: colors.text }]}>{username || 'Kullanıcı'}</Text>

        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={14} color={colors.primary} />
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            {memberDate ? `${memberDate}'den beri üye` : 'Yeni üye'}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={14} color={colors.primary} />
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>{location || 'Konum alınıyor...'}</Text>
        </View>
      </View>
    </View>
  );
};

export default UserInfoComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  avatarSection: {
    position: 'relative',
  },
  editBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
  },
  infoSection: {
    flex: 1,
    gap: 6,
  },
  username: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    fontWeight: '500',
  },
});

