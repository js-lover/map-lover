import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  FadeInUp,
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withSpring
} from "react-native-reanimated";
import { Button } from "../../components";

export default function Register() {
  const [focused, setFocused] = useState("");

  const buttonScale = useSharedValue(1);

  const animatedButton = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }]
  }));

  const onPressRegister = () => {
    buttonScale.value = withSpring(0.999, { damping: 2 }, () => {
      buttonScale.value = withSpring(1);
    });
  };

  return (
    <View style={styles.container}>
      
      {/* Background Fade */}
      <Animated.View
        entering={FadeIn.duration(600)}
        style={styles.backgroundCircle}
      />

      <Animated.View entering={FadeInUp.duration(600)} style={styles.card}>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>Create an account</Text>

        {/* USERNAME */}
        <View style={styles.inputContainer}>
          <Animated.Text
            style={[
              styles.label,
              focused === "username" && { color: "#34C759" }
            ]}
            entering={FadeInUp.delay(100)}
          >
            Username
          </Animated.Text>

          <TextInput
            style={styles.input}
            onFocus={() => setFocused("username")}
            onBlur={() => setFocused("")}
          />
        </View>

        {/* EMAIL */}
        <View style={styles.inputContainer}>
          <Animated.Text
            style={[
              styles.label,
              focused === "email" && { color: "#34C759" }
            ]}
            entering={FadeInUp.delay(150)}
          >
            E-mail
          </Animated.Text>

          <TextInput
            keyboardType="email-address"
            style={styles.input}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused("")}
          />
        </View>

        {/* PASSWORD */}
        <View style={styles.inputContainer}>
          <Animated.Text
            style={[
              styles.label,
              focused === "password" && { color: "#34C759" }
            ]}
            entering={FadeInUp.delay(200)}
          >
            Password
          </Animated.Text>

          <TextInput
            secureTextEntry
            style={styles.input}
            onFocus={() => setFocused("password")}
            onBlur={() => setFocused("")}
          />
        </View>

        {/* REGISTER BUTTON */}
        <Animated.View style={[styles.buttonWrapper, animatedButton]}>
          <Button buttonStyle={styles.button} textStyle={styles.textStyle} onPress={() => console.log("register tiklandi")} title="Register" />
        </Animated.View>

      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    justifyContent: "center",
    alignItems: "center",
  },

  backgroundCircle: {
    position: "absolute",
    width: 380,
    height: 380,
    borderRadius: 200,
    backgroundColor: "rgba(52,199,89,0.15)",
    top: -60,
    left: -120,
  },

  card: {
    width: "85%",
    padding: 24,
    borderRadius: 24,
    backgroundColor: "#1A1A1A",
  },

  title: {
    fontSize: 32,
    fontWeight: 900,
    color: "white",
    marginBottom: 4
  },

  subtitle: {
    fontSize: 14,
    color: "#999",
    marginBottom: 24
  },

  inputContainer: {
    marginBottom: 20
  },

  label: {
    color: "#ccc",
    marginBottom: 8
  },

  input: {
    backgroundColor: "#2A2A2A",
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 12,
    color: "white"
  },

  buttonWrapper: {
    marginTop: 10
  },

    button: {
    borderRadius:8,
    height:50,
    borderColor:"#34C759",
    backgroundColor:"#34C759"
  },
  textStyle:{
     color:"#fbfbfb",
    fontSize:16,
    fontWeight:600
  },
});
