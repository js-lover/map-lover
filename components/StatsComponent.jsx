import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { useTheme } from '@/providers/ThemeProvider';

const StatsComponent = ({ title, value }) => {
  const { colors } = useTheme();
  return (
    <View style={{ borderRadius: 10, width: '100%', gap: 4, marginBottom: 20 }}>
      <Text style={{ fontWeight: '600', fontSize: 18, color: colors.text }}>
        {value}
      </Text>
      <Text style={{ fontWeight: '300', color: colors.primary }}>{title}</Text>
    </View>
  );
};

export default StatsComponent;

const styles = StyleSheet.create({});
