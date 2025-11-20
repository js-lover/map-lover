import { StyleSheet, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Layout } from '@ui-kitten/components';
import { UserInfoComponent, UserAverageStats, StatsComponent } from '../components';

const profile = () => {
  return (
    <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
        <UserInfoComponent />
        <UserAverageStats />
    </Layout>
  );
};

export default profile;

const styles = StyleSheet.create({});
