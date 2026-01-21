import { StyleSheet, ScrollView, RefreshControl, Text, View, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import {
  UserInfoComponent,
  UserAverageStats,
  Button,
  LoadingComponent,
} from '../../../components';

import { useAuthContext } from '../../../hooks/useAuthContext';
import { useTheme } from '../../../providers/ThemeProvider';
import { signOut, deleteUserAccount } from '../../../services/auth.services';
import { pickAndUploadAvatar } from '../../../services/uploadAvatar';
import { supabase } from '../../../lib/supabase';
import { getDailyUserStats, getWeeklyUserStats, getMonthlyUserStats } from '../../../services/getUserStats';

import useLocationStore from '../../../store/useLocationStore';

const Profile = () => {
  const { theme, colors, isDark, toggleTheme } = useTheme();
  const { profile: contextProfile, session } = useAuthContext();
  const userAddress = useLocationStore((state) => state.userAddress);

  const [profile, setProfile] = useState(contextProfile);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const [stats, setStats] = useState({
    daily: { totalDistance: 0, totalDuration: 0, totalCalories: 0, totalSteps: 0, totalWorkouts: 0 },
    weekly: { totalDistance: 0, totalDuration: 0, totalCalories: 0, totalSteps: 0, totalWorkouts: 0 },
    monthly: { totalDistance: 0, totalDuration: 0, totalCalories: 0, totalSteps: 0, totalWorkouts: 0 },
  });

  const fullName = profile?.full_name;
  const date = profile?.created_at;
  const memberDate = date ? new Date(date).getFullYear() : '';

  const fetchProfile = async () => {
    try {
      if (!session?.user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;

      setProfile(data);
    } catch (err) {
      console.log('Profile fetch error:', err);
    }
  };

  const fetchStats = async () => {
    try {
      const [daily, weekly, monthly] = await Promise.all([
        getDailyUserStats(),
        getWeeklyUserStats(),
        getMonthlyUserStats(),
      ]);

      setStats({
        daily: daily || { totalDistance: 0, totalDuration: 0, totalCalories: 0, totalSteps: 0, totalWorkouts: 0 },
        weekly: weekly || { totalDistance: 0, totalDuration: 0, totalCalories: 0, totalSteps: 0, totalWorkouts: 0 },
        monthly: monthly || { totalDistance: 0, totalDuration: 0, totalCalories: 0, totalSteps: 0, totalWorkouts: 0 },
      });
    } catch (error) {
      console.log('Error fetching user stats:', error);
    }
  };


  // First load & context change sync
  useEffect(() => {
    if (contextProfile) {
      setProfile(contextProfile);
    }
    fetchStats();
  }, [contextProfile]);

  // Avatar URL resolve + cache busting
  useEffect(() => {
    let mounted = true;

    if (!profile?.avatar_url) {
      setAvatarUrl(null);
      return;
    }

    const path = profile.avatar_url;

    const addCacheBusting = (url) => {
      const sep = url.includes('?') ? '&' : '?';
      return `${url}${sep}t=${Date.now()}`;
    };

    const resolveAvatar = async () => {
      try {
        const { data: signedData } = await supabase.storage
          .from('avatars')
          .createSignedUrl(path, 60 * 60);

        const signedUrl = signedData?.signedUrl;

        if (signedUrl) {
          setAvatarUrl(addCacheBusting(signedUrl));
          return;
        }

        const { data: publicData } = supabase.storage
          .from('avatars')
          .getPublicUrl(path);

        if (publicData?.publicUrl) {
          setAvatarUrl(addCacheBusting(publicData.publicUrl));
        }
      } catch (err) {
        console.log('Avatar resolve error:', err);
      }
    };

    resolveAvatar();

    return () => {
      mounted = false;
    };
  }, [profile]);

  // Pull to refresh
  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await Promise.all([fetchProfile(), fetchStats()]);
    } catch (err) {
      console.log('Refresh error:', err);
    } finally {
      setRefreshing(false);
    }
  }, []);

  // Change avatar
  const handleChangeAvatar = async () => {
    try {
      setLoading(true);

      const result = await pickAndUploadAvatar(profile.id, profile.avatar_url);
      if (result?.error) return;

      await fetchProfile();
    } catch (err) {
      console.log('Avatar change error:', err);
    } finally {
      setLoading(false);
    }
  };

  //Login
  const handleLogout = async () => {
    setLoading(true);
    await signOut();
    setLoading(false);
  };

  // Delete Account
  const handleDeleteAccount = () => {
    Alert.alert(
      "Hesabımı Sil",
      "Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz ve tüm verileriniz silinecektir.",
      [
        {
          text: "İptal",
          style: "cancel"
        },
        {
          text: "Evet, Sil",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              await deleteUserAccount();
            } catch (error) {
              Alert.alert("Hata", "Hesap silinirken bir hata oluştu.");
              console.error("Delete account error:", error);
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  //Menu Item
  const MenuItem = ({ icon, iconType = 'ionicons', title, subtitle, onPress, showArrow = true, danger = false }) => {
    const IconComponent = iconType === 'material' ? MaterialIcons : iconType === 'feather' ? Feather : Ionicons;

    return (
      <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
        <View style={[
          styles.menuIconContainer,
          { backgroundColor: danger ? colors.dangerSubtle : colors.primarySubtle },
          danger && styles.menuIconDanger
        ]}>
          <IconComponent name={icon} size={20} color={danger ? colors.danger : colors.primary} />
        </View>
        <View style={styles.menuContent}>
          <Text style={[styles.menuTitle, { color: colors.text }, danger && styles.menuTitleDanger]}>{title}</Text>
          {subtitle && <Text style={[styles.menuSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>}
        </View>
        {showArrow && (
          <Feather name="chevron-right" size={20} color={colors.textMuted} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <LoadingComponent visible={loading} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={[styles.pageTitle, { color: colors.text }]}>Profil</Text>
        </View>

        {/* User Info Card */}
        <View style={[styles.userCard, { backgroundColor: colors.card }]}>
          <LinearGradient
            colors={[colors.primarySubtle, colors.border]}
            style={styles.userCardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          <UserInfoComponent
            username={fullName}
            memberDate={memberDate}
            avatarUrl={avatarUrl}
            location={userAddress}
            onPress={handleChangeAvatar}
          />
        </View>

        {/* Stats Section */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>İstatistikler</Text>
          <View style={[styles.statsCard, { backgroundColor: colors.card }]}>
            <UserAverageStats stats={stats} />
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Ayarlar</Text>
          <View style={[styles.menuCard, { backgroundColor: colors.card }]}>

            <MenuItem
              icon={isDark ? "moon-outline" : "sunny-outline"}
              title="Görünüm"
              subtitle={isDark ? "Koyu Tema" : "Açık Tema"}
              onPress={toggleTheme}
              showArrow={false}
            />
            <View style={[styles.menuDivider, { backgroundColor: colors.border }]} />
            <MenuItem
              icon="shield-checkmark-outline"
              title="Gizlilik"
              subtitle="Gizlilik ayarlarınızı düzenleyin"
              onPress={() => router.push('/private/profile/privacy')}
            />
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Hesap</Text>
          <View style={[styles.menuCard, { backgroundColor: colors.card }]}>
            <MenuItem
              icon="help-circle-outline"
              title="Yardım & Destek"
              subtitle="SSS ve iletişim"
              onPress={() => router.push('/private/profile/help')}
            />
            <View style={[styles.menuDivider, { backgroundColor: colors.border }]} />
            <MenuItem
              icon="log-out-outline"
              title="Çıkış Yap"
              onPress={handleLogout}
              showArrow={false}
              danger
            />
            <View style={[styles.menuDivider, { backgroundColor: colors.border }]} />
            <MenuItem
              icon="trash-outline"
              title="Hesabımı Sil"
              onPress={handleDeleteAccount}
              showArrow={false}
              danger
            />
          </View>
        </View>

        {/* App Version */}
        <Text style={[styles.versionText, { color: colors.textMuted }]}>Menza v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

// -------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  userCard: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 16,
  },
  userCardGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
    marginLeft: 4,
  },
  statsCard: {
    borderRadius: 16,
    padding: 16,
    paddingTop: 0,
    overflow: 'hidden',
  },
  menuCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuIconDanger: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  menuTitleDanger: {
    color: '#ef4444',
  },
  menuSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  menuDivider: {
    height: 1,
    marginLeft: 70,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 32,
  },
});

