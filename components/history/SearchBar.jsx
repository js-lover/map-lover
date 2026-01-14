import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';

export default function SearchBar({ placeholder = 'Ara...', onChangeText }) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(focused ? '100%' : '100%', { duration: 300 }),
    borderColor: withTiming(focused ? 'rgba(34, 197, 94, 0.5)' : 'rgba(255, 255, 255, 0.1)', { duration: 200 }),
  }));

  const handleClear = () => {
    setValue('');
    onChangeText && onChangeText('');
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.iconContainer}>
        <Feather name="search" size={18} color={focused ? '#22c55e' : '#64748b'} />
      </View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#64748b"
        value={value}
        onChangeText={(text) => {
          setValue(text);
          onChangeText && onChangeText(text);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        selectionColor="#22c55e"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton} activeOpacity={0.7}>
          <View style={styles.clearIconContainer}>
            <Feather name="x" size={14} color="#fff" />
          </View>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 14,
    height: 50,
    paddingHorizontal: 4,
    backgroundColor: '#1e293b',
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  clearButton: {
    padding: 8,
  },
  clearIconContainer: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#475569',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

