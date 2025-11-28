import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons"; // search/close icon için

export default function SearchBar({ placeholder = "Search...", onChangeText }) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  // input genişleme animasyonu
  const widthAnim = useSharedValue(0.85); // 85% başlangıç

  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(focused ? "95%" : "85%", { duration: 300 }),
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Feather name="search" size={20} color="#0E7AFE" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={(text) => {
          setValue(text);
          onChangeText && onChangeText(text);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => setValue("")}
          style={styles.clearButton}
        >
          <Feather name="x" size={18} color="#0E7AFE" />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth:0.2,
    borderColor:"#0E7AFE",
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 12,
    alignSelf: "center",
    backgroundColor:"#fbfbfb"
    
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: "#0E7AFE",
    fontSize: 16,
  },
  clearButton: {
    marginLeft: 8,
  },
});
