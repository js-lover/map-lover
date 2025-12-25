import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const RunningStats = ({ title, value, variant = 'normal', valueStyle, titleStyle, containerStyle }) => {
  const isPrimary = variant === 'primary';

  return (
    <View style={[styles.statBox , containerStyle]}>
      {/* Sabit yükseklik + overflow */}
      <View style={styles.valueContainer}>
        <Text style={[styles.value, isPrimary && styles.primaryValue, valueStyle]}>{value}</Text>
      </View>

      <Text style={[styles.title, isPrimary && styles.primaryTitle, titleStyle]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  valueContainer: {
    height: 40, 
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  value: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    fontVariant: ['tabular-nums'], 
  },

  primaryValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#000',
  },

  title: {
    fontSize: 10,
    fontWeight: '400',
    color: '#666',
    marginTop: 0,
  },

  primaryTitle: {
    fontSize: 12,
    letterSpacing: 1,
  },
});

export default RunningStats;
