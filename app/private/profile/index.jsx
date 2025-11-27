import { StyleSheet, View, Text } from 'react-native';
import { UserInfoComponent, UserAverageStats } from '../../../components';

const profile = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', width: '100%' , paddingTop:24 }}>
      <UserInfoComponent />
      <UserAverageStats />



    </View>
  );
};

export default profile;

const styles = StyleSheet.create({});
