import { StyleSheet, View, Text } from 'react-native';
import { UserInfoComponent, UserAverageStats, Button } from '../../../components';
import { logout } from '../../auth';
import { router } from 'expo-router';
const profile = () => {
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
      <UserAverageStats />

      <Button
        buttonStyle={styles.buttonStyle}
        textStyle={styles.textStyle}
        title="Logout"
        onPress={() => {
          logout();
          router.replace('/public');
        }}
      />
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({});
