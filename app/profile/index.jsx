import { StyleSheet, View, Text } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { UserInfoComponent, UserAverageStats } from '../../components';

const profile = () => {
  return (
    <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', width: '100%' , paddingTop:24 }}>
      <UserInfoComponent />
      <UserAverageStats />



    </Layout>
  );
};

export default profile;

const styles = StyleSheet.create({});
