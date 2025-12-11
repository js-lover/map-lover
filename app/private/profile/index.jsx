import { StyleSheet, View, Text } from 'react-native';
import { UserInfoComponent, UserAverageStats, Button, SignOutButton } from '../../../components';
import { useAuthContext } from '../../hooks/useAuthContext';
import { getUserProfile, signOut } from '../../../services/auth.services';
import { use, useEffect, useState } from 'react';
import { LoadingComponent } from '../../../components';

const profile = () => {
  const { profile } = useAuthContext();
  const [loading, setLoading] = useState(false);

  console.log('profile component render edildi');

  async function handleLogout() {
    setLoading(true);
    try {
      await signOut();
      console.log('Kullanıcı çıkış yaptı');
    } catch (error) {
      console.error('Çıkış yaparken hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  }

  console.log('profile from context:', profile);

  const fullName = profile?.full_name;
  const date = profile?.created_at;
  const memberDate = date ? new Date(date).getFullYear() : '';

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        paddingTop: 24,
      }}>
      <LoadingComponent visible={loading} />

      <UserInfoComponent username={fullName} memberDate={memberDate} />

      <UserAverageStats />

      <Button
        buttonStyle={styles.buttonStyle}
        textStyle={styles.textStyle}
        title="Logout"
        onPress={handleLogout}
      />
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({});
