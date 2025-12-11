import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const RunningStats = ({
  title,
  value,
  valueFontSize,
  valueFontWeight,
  titleFontSize,
  titleFontWeight,
}) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontWeight: valueFontWeight, fontSize: valueFontSize, color: 'black' }}>
        {value}
      </Text>
      <Text style={{ fontWeight: titleFontWeight, fontSize: titleFontSize, color: 'black' }}>
        {title}
      </Text>
    </View>
  );
};

export default RunningStats;

const styles = StyleSheet.create({});
