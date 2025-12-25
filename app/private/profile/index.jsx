import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  return (
    <SafeAreaView style={styles.container}>
      <LoadingComponent visible={loading} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <UserInfoComponent
          username={fullName}
          memberDate={memberDate}
          avatarUrl={avatarUrl}
          onPress={handleChangeAvatar}
        />

        <UserAverageStats />

        <Button
          title="Logout"
          buttonStyle={styles.buttonStyle}
          onPress={handleLogout}
        />
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
    alignItems: 'center',
    paddingBottom: 40,
  },
  buttonStyle: {
    marginTop: 24,
  },
});
