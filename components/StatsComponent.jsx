import { StyleSheet, View, Text } from 'react-native';
import React from 'react';

const StatsComponent = ({ title, value }) => {
  return (
    <View style={{ borderRadius: 10, width: '100%', gap: 4, marginBottom: 20 }}>
      <Text category="s2" style={{ fontWeight: 600, fontSize: 18 }}>
        {value}
      </Text>
      <Text style={{ fontWeight: 300, color: '#0E7AFE' }}>{title}</Text>
    </View>
  );
};

export default StatsComponent;

const styles = StyleSheet.create({});
