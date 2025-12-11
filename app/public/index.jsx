import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  FadeInUp,
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Button, LoadingComponent } from '../../components';
import { Link, useRouter } from 'expo-router';
import { signInUser } from '@/services/auth.services';

export default function Login() {
  const [focused, setFocused] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setLoading(true);
    try {
      await signInUser(email, password);
    } catch (error) {
      alert('missing email or phone');
    } finally {
      setLoading(false);
    }
  }

  const buttonScale = useSharedValue(1);

  // Buton animasyonu
  const animatedButton = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Fade arka plan */}

      <LoadingComponent visible={loading} backgroundColor="rgba(0,0,0,0.5)" />

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
            onChangeText={(value) => setEmail(value)}
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
            onChangeText={(value) => setPassword(value)}
          />
        </View>

        {/* Login Button */}
        <Animated.View style={[styles.buttonWrapper, animatedButton]}>
          <Button
            buttonStyle={styles.button}
            textStyle={styles.textStyle}
            onPress={handleSignIn}
            title="Login"
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 5,
              paddingTop: 20,
            }}>
            <Text style={{ color: '#fbfbfb', fontWeight: 200 }}>Don't you have an account?</Text>
            <Link href="/public/register">
              <Text style={{ color: '#34C759', fontWeight: 700 }}>Register</Text>
            </Link>
          </View>
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
