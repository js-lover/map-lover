import { EvilIcons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Image, TouchableOpacity, View, StyleSheet } from "react-native";

export default function AvatarComponent({
  avatarUrl,
  onPress,
  size = 90,
}) {
  // ✅ cache busting (aynı url bile olsa yeniden render)
  const uri = useMemo(() => {
    if (typeof avatarUrl === "string" && avatarUrl.length > 0) {
      return `${avatarUrl}${avatarUrl.includes("?") ? "&" : "?"}t=${Date.now()}`;
    }
    return null;
  }, [avatarUrl]);

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Image
        source={
          uri
            ? { uri }
            : require("../assets/icon.jpg") // fallback
        }
        style={[
          styles.avatar,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
        resizeMode="cover"
        onError={(e) =>
          console.warn("Avatar load error:", e.nativeEvent?.error)
        }
      />

      <TouchableOpacity
        onPress={onPress}
        style={styles.editIcon}
        activeOpacity={0.7}
      >
        <EvilIcons name="pencil" size={24} color="#0E7AFE" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: "#eee",
  },
  editIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    borderRadius: 100,
    backgroundColor: "rgba(250,250,250,0.8)",
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.2,
    borderColor: "#0E7AFE",
  },
});
