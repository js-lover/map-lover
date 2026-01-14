import { StyleSheet, ScrollView, RefreshControl, Text, View, TouchableOpacity } from 'react-native';
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
import { signOut } from '../../../services/auth.services';
import { pickAndUploadAvatar } from '../../../services/uploadAvatar';
import { supabase } from '../../../lib/supabase';

const Profile = () => {


  const { profile: contextProfile, session } = useAuthContext();

  const [profile, setProfile] = useState(contextProfile);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const fullName = profile?.full_name;
  const date = profile?.created_at;
  const memberDate = date ? new Date(date).getFullYear() : '';

  // -------------------------------------------------------------
  // ⭐ PROFİLİ BURADA FETCH ET
  // -------------------------------------------------------------
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

  // -------------------------------------------------------------
  // ⭐ İlk load & context değişince senkronize et
  // -------------------------------------------------------------
  useEffect(() => {
    if (contextProfile) {
      setProfile(contextProfile);
    }
  }, [contextProfile]);

  // -------------------------------------------------------------
  // ⭐ Avatar URL resolve + cache busting
  // -------------------------------------------------------------
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

  // -------------------------------------------------------------
  // ⭐ Pull to Refresh
  // -------------------------------------------------------------
  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await fetchProfile();
    } catch (err) {
      console.log('Refresh error:', err);
    } finally {
      setRefreshing(false);
    }
  }, []);

  // -------------------------------------------------------------
  // ⭐ Avatar değiştir
  // -------------------------------------------------------------
  const handleChangeAvatar = async () => {
    try {
      setLoading(true);

      const result = await pickAndUploadAvatar(profile.id, profile.avatar_url);
      if (result?.error) return;

      await fetchProfile(); // ⭐ SADECE BURASI
    } catch (err) {
      console.log('Avatar change error:', err);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------
  // ⭐ Logout
  // -------------------------------------------------------------
  const handleLogout = async () => {
    setLoading(true);
    await signOut();
    setLoading(false);
  };

  // -------------------------------------------------------------
  // Menu Item Component
  // -------------------------------------------------------------
  const MenuItem = ({ icon, iconType = 'ionicons', title, subtitle, onPress, showArrow = true, danger = false }) => {
    const IconComponent = iconType === 'material' ? MaterialIcons : iconType === 'feather' ? Feather : Ionicons;

    return (
      <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
        <View style={[styles.menuIconContainer, danger && styles.menuIconDanger]}>
          <IconComponent name={icon} size={20} color={danger ? '#ef4444' : '#22c55e'} />
        </View>
        <View style={styles.menuContent}>
          <Text style={[styles.menuTitle, danger && styles.menuTitleDanger]}>{title}</Text>
          {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
        </View>
        {showArrow && (
          <Feather name="chevron-right" size={20} color="#475569" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoadingComponent visible={loading} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#22c55e"
            colors={['#22c55e']}
          />
        }
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.pageTitle}>Profil</Text>
        </View>

        {/* User Info Card */}
        <View style={styles.userCard}>
          <LinearGradient
            colors={['rgba(34, 197, 94, 0.1)', 'rgba(34, 197, 94, 0.05)']}
            style={styles.userCardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          <UserInfoComponent
            username={fullName}
            memberDate={memberDate}
            avatarUrl={avatarUrl}
            onPress={handleChangeAvatar}
          />
        </View>

        {/* Stats Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>İstatistikler</Text>
          <View style={styles.statsCard}>
            <UserAverageStats />
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Ayarlar</Text>
          <View style={styles.menuCard}>
            <MenuItem
              icon="person-outline"
              title="Profili Düzenle"
              subtitle="Ad, soyad ve bilgilerinizi güncelleyin"
              onPress={() => { }}
            />
            <View style={styles.menuDivider} />
            <MenuItem
              icon="notifications-outline"
              title="Bildirimler"
              subtitle="Bildirim tercihlerinizi yönetin"
              onPress={() => { }}
            />
            <View style={styles.menuDivider} />
            <MenuItem
              icon="shield-checkmark-outline"
              title="Gizlilik"
              subtitle="Gizlilik ayarlarınızı düzenleyin"
              onPress={() => { }}
            />
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Hesap</Text>
          <View style={styles.menuCard}>
            <MenuItem
              icon="help-circle-outline"
              title="Yardım & Destek"
              subtitle="SSS ve iletişim"
              onPress={() => { }}
            />
            <View style={styles.menuDivider} />
            <MenuItem
              icon="log-out-outline"
              title="Çıkış Yap"
              onPress={handleLogout}
              showArrow={false}
              danger
            />
          </View>
        </View>

        {/* App Version */}
        <Text style={styles.versionText}>Menza v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

// -------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
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
    color: '#fff',
    letterSpacing: -0.5,
  },
  userCard: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    backgroundColor: '#1e293b',
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
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    marginLeft: 4,
  },
  statsCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    paddingTop: 0,
    overflow: 'hidden',
  },
  menuCard: {
    backgroundColor: '#1e293b',
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
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
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
    color: '#fff',
  },
  menuTitleDanger: {
    color: '#ef4444',
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#334155',
    marginLeft: 70,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#475569',
    marginTop: 32,
  },
});

