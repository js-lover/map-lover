import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  FadeInUp,
  FadeIn,
  FadeInDown,
  useSharedValue,
  useAnimatedStyle
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, LoadingComponent } from '../../components';
import { Link, useLocalSearchParams } from 'expo-router';
import { signInUser } from '@/services/auth.services';

export default function Login() {
  const [focused, setFocused] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const params = useLocalSearchParams();
  const passwordInputRef = useRef(null);

  // Buton animasyonu için shared value
  const buttonScale = useSharedValue(1);
  const animatedButton = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  useEffect(() => {
    if (params?.registeredEmail) {
      setEmail(params.registeredEmail);
      // Email dolu geldiyse şifreye odaklan
      setTimeout(() => {
        passwordInputRef.current?.focus();
      }, 500);
    }
  }, [params]);

  async function handleSignIn() {
    setLoading(true);
    try {
      await signInUser(email, password);
    } catch (error) {
      alert('E-posta veya şifre hatalı');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <LoadingComponent visible={loading} backgroundColor="rgba(0,0,0,0.8)" />

      {/* Background Gradient Circle */}
      <Animated.View entering={FadeIn.duration(800)} style={styles.backgroundCircle}>
        <LinearGradient
          colors={['rgba(34, 197, 94, 0.15)', 'rgba(34, 197, 94, 0.05)']}
          style={styles.gradientCircle}
        />
      </Animated.View>

      {/* Login Card */}
      <Animated.View entering={FadeInUp.duration(600)} style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="walk" size={32} color="#22c55e" />
          </View>
          <Text style={styles.title}>Hoş Geldin</Text>
          <Text style={styles.subtitle}>Devam etmek için giriş yap</Text>
        </View>

        {/* Email Input */}
        <Animated.View entering={FadeInUp.delay(100)} style={styles.inputContainer}>
          <Text style={[styles.label, focused === 'email' && styles.labelFocused]}>
            E-posta
          </Text>
          <View style={[styles.inputWrapper, focused === 'email' && styles.inputWrapperFocused]}>
            <Ionicons name="mail-outline" size={20} color={focused === 'email' ? '#22c55e' : '#64748b'} />
            <TextInput
              style={styles.input}
              placeholder="ornek@email.com"
              placeholderTextColor="#475569"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused('')}
              onChangeText={setEmail}
              selectionColor="#22c55e"
            />
          </View>
        </Animated.View>

        {/* Password Input */}
        <Animated.View entering={FadeInUp.delay(200)} style={styles.inputContainer}>
          <Text style={[styles.label, focused === 'password' && styles.labelFocused]}>
            Şifre
          </Text>
          <View style={[styles.inputWrapper, focused === 'password' && styles.inputWrapperFocused]}>
            <Ionicons name="lock-closed-outline" size={20} color={focused === 'password' ? '#22c55e' : '#64748b'} />
            <TextInput
              ref={passwordInputRef}
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#475569"
              secureTextEntry={!showPassword}
              value={password}
              onFocus={() => setFocused('password')}
              onBlur={() => setFocused('')}
              onChangeText={setPassword}
              selectionColor="#22c55e"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#64748b"
              />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Login Button */}
        <Animated.View entering={FadeInUp.delay(300)} style={[styles.buttonWrapper, animatedButton]}>
          <TouchableOpacity onPress={handleSignIn} activeOpacity={0.9}>
            <LinearGradient
              colors={['#22c55e', '#16a34a']}
              style={styles.button}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.buttonText}>Giriş Yap</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Register Link */}
        <Animated.View entering={FadeInDown.delay(400)} style={styles.linkContainer}>
          <Text style={styles.linkText}>Hesabın yok mu?</Text>
          <Link href="/public/register">
            <Text style={styles.linkAction}>Kayıt Ol</Text>
          </Link>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundCircle: {
    position: 'absolute',
    width: 400,
    height: 400,
    top: -100,
    right: -150,
  },
  gradientCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 200,
  },
  card: {
    width: '88%',
    padding: 28,
    borderRadius: 24,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 8,
    marginLeft: 4,
  },
  labelFocused: {
    color: '#22c55e',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderRadius: 14,
    height: 54,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    gap: 12,
  },
  inputWrapperFocused: {
    borderColor: 'rgba(34, 197, 94, 0.5)',
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  buttonWrapper: {
    marginTop: 12,
  },
  button: {
    height: 54,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 24,
  },
  linkText: {
    color: '#64748b',
    fontSize: 14,
  },
  linkAction: {
    color: '#22c55e',
    fontSize: 14,
    fontWeight: '700',
  },
});
