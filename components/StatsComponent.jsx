import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from '@ui-kitten/components';

const StatsComponent = ({ title, value }) => {
  return (
    <View style={{ borderRadius: 10, width: '100%', padding: 10 }}>
      <Text category="s1">{title}</Text>
      <Text category="s2" style={{ fontWeight: 'light' }}>
        {value}
      </Text>
    </View>
  );
};

export default StatsComponent;

const styles = StyleSheet.create({});
