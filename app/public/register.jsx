import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  FadeInUp,
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Button, LoadingComponent } from '../../components';

import { registerNewUser } from '../../services/auth.services';
import { supabase } from '@/lib/supabase';
import { Link, router } from 'expo-router';

export default function Register() {
  const [focused, setFocused] = useState('');

  //userDatas
  const [fullName, setFullName] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const buttonScale = useSharedValue(1);

  const animatedButton = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const onPressRegister = () => {
    buttonScale.value = withSpring(0.999, { damping: 2 }, () => {
      buttonScale.value = withSpring(1);
    });
  };

  async function handleRegister() {
    setLoading(true);

    try {
      /** 1) Signup */
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: 'menza://auth/callback',
        },
      });

      if (signUpError) throw signUpError;
      const createdUser = signUpData.user;
      if (!createdUser) throw new Error('Kullanıcı oluşturulamadı.');

      /** 2) Signup sonrası hemen login yap */
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw loginError;

      const user = loginData.user;
      if (!user) throw new Error('Kullanıcı giriş yapamadı.');

      /** 3) Profil güncelle */
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          username: userName,
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      /** 4) PROFESYONEL: Kullanıcıyı çıkış yap */
      await supabase.auth.signOut();

      /** 5) Login sayfasına yönlendir */
      router.replace('/public');

      alert('Kayıt başarılı! Şimdi giriş yapabilirsiniz.');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <View style={styles.container}>
      {/* Background Fade */}

      <LoadingComponent visible={loading} backgroundColor="rgba(0,0,0,1)" />

      <Animated.View entering={FadeIn.duration(600)} style={styles.backgroundCircle} />

      <Animated.View entering={FadeInUp.duration(600)} style={styles.card}>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>Create an account</Text>

        {/* Name */}
        <View style={styles.inputContainer}>
          <Animated.Text
            style={[styles.label, focused === 'fullname' && { color: '#34C759' }]}
            entering={FadeInUp.delay(100)}>
            Full Name
          </Animated.Text>

          <TextInput
            style={styles.input}
            onFocus={() => setFocused('fullname')}
            onBlur={() => setFocused('')}
            onChangeText={(value) => setFullName(value)}
          />
        </View>

        {/* USERNAME */}
        <View style={styles.inputContainer}>
          <Animated.Text
            style={[styles.label, focused === 'username' && { color: '#34C759' }]}
            entering={FadeInUp.delay(100)}>
            Username
          </Animated.Text>

          <TextInput
            style={styles.input}
            onFocus={() => setFocused('username')}
            onBlur={() => setFocused('')}
            onChangeText={(value) => setUserName(value)}
          />
        </View>

        {/* EMAIL */}
        <View style={styles.inputContainer}>
          <Animated.Text
            style={[styles.label, focused === 'email' && { color: '#34C759' }]}
            entering={FadeInUp.delay(150)}>
            E-mail
          </Animated.Text>

          <TextInput
            keyboardType="email-address"
            style={styles.input}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused('')}
            onChangeText={(value) => setEmail(value)}
          />
        </View>

        {/* PASSWORD */}
        <View style={styles.inputContainer}>
          <Animated.Text
            style={[styles.label, focused === 'password' && { color: '#34C759' }]}
            entering={FadeInUp.delay(200)}>
            Password
          </Animated.Text>

          <TextInput
            secureTextEntry
            style={styles.input}
            onFocus={() => setFocused('password')}
            onBlur={() => setFocused('')}
            onChangeText={(value) => setPassword(value)}
          />
        </View>

        {/* REGISTER BUTTON */}
        <Animated.View style={[styles.buttonWrapper, animatedButton]}>
          <Button
            buttonStyle={styles.button}
            textStyle={styles.textStyle}
            onPress={handleRegister}
            title="Register"
          />

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 5,
              paddingTop: 20,
            }}>
            <Text style={{ color: '#fbfbfb', fontWeight: 200 }}>Already have an account?</Text>
            <Link href="/public">
              <Text style={{ color: '#0E7AFE', fontWeight: 700 }}>Login</Text>
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
    width: 380,
    height: 380,
    borderRadius: 200,
    backgroundColor: 'rgba(52,199,89,0.15)',
    top: -60,
    left: -120,
  },

  card: {
    width: '85%',
    padding: 24,
    borderRadius: 24,
    backgroundColor: '#1A1A1A',
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
    borderColor: '#34C759',
    backgroundColor: '#34C759',
  },
  textStyle: {
    color: '#fbfbfb',
    fontSize: 16,
    fontWeight: 600,
  },
});
