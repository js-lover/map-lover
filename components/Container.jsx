import React from 'react';
import { View } from 'react-native';

/**
 * Reusable Container Component
 *
 * Props:
 * - children: içeriği
 * - className: NativeWind ile stil vermek için
 * - style: normal React Native inline style
 */
const Container = ({ children, className = '', style = {} }) => {
  return (
    <View className={`flex-1 items-center justify-center  ${className}`} style={style}>
      {children}
    </View>
  );
};

export default Container;
