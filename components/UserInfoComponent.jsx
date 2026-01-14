import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { AvatarComponent } from './';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const UserInfoComponent = ({ username, memberDate, avatarUrl, onPress }) => {
  return (
    <View style={styles.container}>
      {/* Avatar Section */}
      <View style={styles.avatarSection}>
        <AvatarComponent avatarUrl={avatarUrl} onPress={onPress} size={90} />
        <TouchableOpacity style={styles.editBadge} onPress={onPress} activeOpacity={0.8}>
          <Ionicons name="camera" size={14} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.username}>{username || 'Kullanıcı'}</Text>

        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={14} color="#22c55e" />
          <Text style={styles.infoText}>
            {memberDate ? `${memberDate}'den beri üye` : 'Yeni üye'}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={14} color="#22c55e" />
          <Text style={styles.infoText}>Manisa, Türkiye</Text>
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
    backgroundColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#1e293b',
  },
  infoSection: {
    flex: 1,
    gap: 6,
  },
  username: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
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
    color: '#94a3b8',
  },
});

