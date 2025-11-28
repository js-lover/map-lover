import { StyleSheet, View, Text, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ImageBackground } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import { Button } from '../../components';
import { buttonStyle } from '@expo/ui/swift-ui/modifiers';

const index = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <ImageBackground
        style={styles.image}
        source={require('../../assets/images/runner3.jpg')}
        contentFit="cover"
        transition={500}
        contentPosition={'bottom center'}
        blurRadius={0}>
        <View
          style={{
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            position: 'absolute',
            left: 0,
            top: 120,
          }}>
          <Text
            className=""
            style={{
              color: '#fbfbfb',
              fontSize: 50,
              fontWeight: '900',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            {' '}
            THE DASH{' '}
          </Text>
          <Text
            style={{
              color: '#fbfbfb',
              fontSize: 50,
              fontWeight: '900',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            {' '}
            COLLECTIVE{' '}
          </Text>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            position: 'absolute',
            bottom: 170,
          }}>
          <Button
            title="Login"
            buttonStyle={styles.loginButtonStyle}
            textStyle={styles.loginTextStyle}
            onPress={() => router.navigate('public/login')}
          />
          <Button
            title="Register"
            buttonStyle={styles.registerButtonStyle}
            textStyle={styles.registerTextStyle}
            onPress={() => router.navigate('public/register')}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0553',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonStyle: {
    borderRadius: 8,
    width: 250,
    height: 50,
    borderColor: '#0E7AFE',
    backgroundColor: '#0E7AFE',
  },
  loginTextStyle: {
    color: '#fbfbfb',
    fontSize: 16,
    fontWeight: 600,
  },

  registerButtonStyle: {
    borderRadius: 8,
    width: 250,
    height: 50,
    borderColor: '#34C759',
  },
  registerTextStyle: {
    color: '#34C759',
    fontSize: 16,
    fontWeight: 600,
  },
});
