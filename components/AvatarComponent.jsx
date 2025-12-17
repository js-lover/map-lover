import { EvilIcons } from "@expo/vector-icons";
import React from "react";
import { Image, TouchableOpacity, View, StyleSheet } from "react-native";

export default function AvatarComponent({ avatarUrl, onPress }) {
  // debug
  console.log('AvatarComponent avatarUrl:', avatarUrl);

  const uri = typeof avatarUrl === 'string' && avatarUrl.length > 0 ? avatarUrl : null;

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={
            uri
              ? { uri } // remote image
              : require('../assets/icon.jpg') // local placeholder (ekle: assets içinde)
          }
          style={styles.avatar}
          resizeMode="cover"
          // onError ile yükleme hatalarını loglayabilirsiniz
          onError={(e) => console.warn('Avatar load error:', e.nativeEvent?.error)}
        />
        <View style={{position: "absolute", top: 0, right: 0, borderRadius:100, backgroundColor:"rgba(250,250,250,0.7)", width:28, height:28, justifyContent:"center", alignItems:"center", borderWidth:0.2, borderColor:"#0E7AFE"}}>
          <EvilIcons onPress={onPress} name="pencil" size={24} color="#0E7AFE" style={{  }} />
        </View>
        

    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 100,
    backgroundColor: "#eee",
  },
});
