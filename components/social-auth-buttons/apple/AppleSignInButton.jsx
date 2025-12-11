import React, { useState } from 'react';
import {
  Platform,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';

export default function AppleSignInButton({ onSuccess, onError, onPressStart }) {
  const [loading, setLoading] = useState(false);

  const handleAppleSignIn = async () => {
    try {
      setLoading(true);
      onPressStart && onPressStart();

      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      onSuccess && onSuccess(credential);
    } catch (error) {
      if (error.code === 'ERR_CANCELED') {
        setLoading(false);
        return;
      }

      onError && onError(error);
    } finally {
      setLoading(false);
    }
  };

  // iOS'a özel native UI
  const renderAppleButton = () => {
    return (
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={8}
        style={styles.appleButton}
        onPress={handleAppleSignIn}
      />
    );
  };

  // Android / Web fallback
  const renderFallbackButton = () => {
    return (
      <TouchableOpacity style={styles.fallbackButton} onPress={handleAppleSignIn}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.fallbackButtonText}>Continue with Apple</Text>
        )}
      </TouchableOpacity>
    );
  };

  return <View>{Platform.OS === 'ios' ? renderAppleButton() : renderFallbackButton()}</View>;
}

const styles = StyleSheet.create({
  appleButton: {
    width: '100%',
    height: 48,
  },
  fallbackButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#000',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
