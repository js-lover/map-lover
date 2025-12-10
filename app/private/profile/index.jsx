import { StyleSheet, View, Text } from 'react-native';
import { UserInfoComponent, UserAverageStats, Button, SignOutButton } from '../../../components';
import { useAuthContext } from '../../hooks/useAuthContext';

const profile = () => {
  const { profile } = useAuthContext();

  console.log(profile); //undefined
  console.log(profile?.updated_at); //undefined

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        paddingTop: 24,
      }}>
      <UserInfoComponent />

      <Text>{profile?.username} , adkşfladf</Text>
      <SignOutButton />

      <UserAverageStats />

      <Button
        buttonStyle={styles.buttonStyle}
        textStyle={styles.textStyle}
        title="Logout"
        onPress={() => console.log('logout tıklandı')}
      />
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({});
