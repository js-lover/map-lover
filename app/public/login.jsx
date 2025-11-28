import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  FadeInUp,
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { Button } from '../../components';
import { EvilIcons } from '@expo/vector-icons';

import { login } from '../auth';
import { router } from 'expo-router';

export default function Login() {
  const [focused, setFocused] = useState('');

  const buttonScale = useSharedValue(1);

  // Buton animasyonu
  const animatedButton = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  function handleLogin() {
    login();
    router.replace('/private'); // otomatik private'e gider
  }

  return (
    <View style={styles.container}>
      {/* Fade arka plan */}
      <Animated.View entering={FadeIn.duration(600)} style={styles.backgroundCircle} />

      {/* Login kartı */}
      <Animated.View entering={FadeInUp.duration(600)} style={styles.card}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Please login to continue</Text>

        {/* EMAIL */}
        <View style={styles.inputContainer}>
          <Animated.Text
            style={[styles.label, focused === 'email' && { color: '#007AFF' }]}
            entering={FadeInUp.delay(100)}>
            Email
          </Animated.Text>

          <TextInput
            style={styles.input}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused('')}
          />
        </View>

        {/* PASSWORD */}
        <View style={styles.inputContainer}>
          <Animated.Text
            style={[styles.label, focused === 'password' && { color: '#007AFF' }]}
            entering={FadeInUp.delay(200)}>
            Şifre
          </Animated.Text>

          <TextInput
            secureTextEntry
            style={styles.input}
            onFocus={() => setFocused('password')}
            onBlur={() => setFocused('')}
          />
        </View>

        {/* Login Button */}
        <Animated.View style={[styles.buttonWrapper, animatedButton]}>
          <Button
            buttonStyle={styles.button}
            textStyle={styles.textStyle}
            onPress={handleLogin}
            title="Login"
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backgroundCircle: {
    position: 'absolute',
    width: 350,
    height: 350,
    borderRadius: 200,
    backgroundColor: 'rgba(0,122,255,0.18)',
    top: -70,
    right: -120,
  },

  card: {
    width: '85%',
    padding: 24,
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: 900,
    color: 'white',
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 24,
  },

  inputContainer: {
    marginBottom: 20,
  },

  label: {
    color: '#ccc',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 12,
    color: 'white',
  },

  buttonWrapper: {
    marginTop: 10,
  },

  button: {
    borderRadius: 8,
    height: 50,
    borderColor: '#0E7AFE',
    backgroundColor: '#0E7AFE',
  },
  textStyle: {
    color: '#fbfbfb',
    fontSize: 16,
    fontWeight: 600,
  },
  arrow: {},
});
