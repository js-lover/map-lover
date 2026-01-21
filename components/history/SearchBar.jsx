import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/providers/ThemeProvider';

export default function SearchBar({ placeholder = 'Ara...', onChangeText }) {
  const { colors } = useTheme();
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(focused ? '100%' : '100%', { duration: 300 }),
    borderColor: withTiming(focused ? colors.primary + '80' : colors.border, { duration: 200 }),
  }));

  const handleClear = () => {
    setValue('');
    onChangeText && onChangeText('');
  };

  return (
    <Animated.View style={[styles.container, { backgroundColor: colors.card }, animatedStyle]}>
      <View style={styles.iconContainer}>
        <Feather name="search" size={18} color={focused ? colors.primary : colors.textMuted} />
      </View>
      <TextInput
        style={[styles.input, { color: colors.text }]}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        value={value}
        onChangeText={(text) => {
          setValue(text);
          onChangeText && onChangeText(text);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        selectionColor={colors.primary}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton} activeOpacity={0.7}>
          <View style={[styles.clearIconContainer, { backgroundColor: colors.surfaceSecondary }]}>
            <Feather name="x" size={14} color={colors.text} />
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
    borderRadius: 14,
    height: 50,
    paddingHorizontal: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

