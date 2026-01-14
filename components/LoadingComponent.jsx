import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function Loader({ visible = false, backgroundColor = 'rgba(0,0,0,0.9)' }) {
  if (!visible) return null;

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: backgroundColor,

        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}>
      <ActivityIndicator size="large" color="#666"  />
    </View>
  );
}

const styles = StyleSheet.create({});
