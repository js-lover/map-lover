import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Animated, { FadeInUp, FadeIn, FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { LoadingComponent } from '../../components';
import { supabase } from '@/lib/supabase';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Register() {
  const [focused, setFocused] = useState('');
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleRegister() {
    setLoading(true);

    try {
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

      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw loginError;

      const user = loginData.user;
      if (!user) throw new Error('Kullanıcı giriş yapamadı.');

      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          username: userName,
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      await supabase.auth.signOut();
      router.replace({
        pathname: '/public',
        params: { registeredEmail: email }
      });
      alert('Kayıt başarılı! Şimdi giriş yapabilirsiniz.');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Input render fonksiyonu - inline olarak tanımlandı
  const renderInput = (icon, label, placeholder, value, onChangeText, fieldName, options = {}) => {
    const { secureTextEntry, keyboardType } = options;
    const isFocused = focused === fieldName;

    return (
      <Animated.View entering={FadeInUp.delay(100)} style={styles.inputContainer}>
        <Text style={[styles.label, isFocused && styles.labelFocused]}>
          {label}
        </Text>
        <View style={[styles.inputWrapper, isFocused && styles.inputWrapperFocused]}>
          <Ionicons name={icon} size={20} color={isFocused ? '#22c55e' : '#64748b'} />
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#475569"
            value={value}
            onFocus={() => setFocused(fieldName)}
            onBlur={() => setFocused('')}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry && !showPassword}
            keyboardType={keyboardType}
            autoCapitalize={keyboardType === 'email-address' ? 'none' : 'words'}
            selectionColor="#22c55e"
          />
          {secureTextEntry && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#64748b"
              />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoadingComponent visible={loading} backgroundColor="rgba(0,0,0,1)" />

      {/* Background Gradient Circle */}
      <Animated.View entering={FadeIn.duration(800)} style={styles.backgroundCircle}>
        <LinearGradient
          colors={['rgba(34, 197, 94, 0.15)', 'rgba(34, 197, 94, 0.05)']}
          style={styles.gradientCircle}
        />
      </Animated.View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Register Card */}
        <Animated.View entering={FadeInUp.duration(600)} style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Ionicons name="person-add" size={28} color="#22c55e" />
            </View>
            <Text style={styles.title}>Kayıt Ol</Text>
            <Text style={styles.subtitle}>Yeni bir hesap oluştur</Text>
          </View>

          {renderInput('person-outline', 'Ad Soyad', 'Adınız Soyadınız', fullName, setFullName, 'fullname')}
          {renderInput('at-outline', 'Kullanıcı Adı', 'kullanici_adi', userName, setUserName, 'username')}
          {renderInput('mail-outline', 'E-posta', 'ornek@email.com', email, setEmail, 'email', { keyboardType: 'email-address' })}
          {renderInput('lock-closed-outline', 'Şifre', '••••••••', password, setPassword, 'password', { secureTextEntry: true })}

          {/* Register Button */}
          <Animated.View entering={FadeInUp.delay(300)} style={styles.buttonWrapper}>
            <TouchableOpacity onPress={handleRegister} activeOpacity={0.9}>
              <LinearGradient
                colors={['#22c55e', '#16a34a']}
                style={styles.button}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.buttonText}>Kayıt Ol</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* Login Link */}
          <Animated.View entering={FadeInDown.delay(400)} style={styles.linkContainer}>
            <Text style={styles.linkText}>Zaten hesabın var mı?</Text>
            <Link href="/public">
              <Text style={styles.linkAction}>Giriş Yap</Text>
            </Link>
          </Animated.View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  backgroundCircle: {
    position: 'absolute',
    width: 400,
    height: 400,
    top: -80,
    left: -150,
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
    marginBottom: 28,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
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
    marginBottom: 16,
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
    height: 52,
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
    marginTop: 8,
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
