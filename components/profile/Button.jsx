import {  Text, Pressable, StyleSheet } from 'react-native';

export default function Button ({ onPress, textStyle,buttonStyle, title })  {
  return (
    <Pressable onPress={onPress} style={[styles.button, buttonStyle]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
};


const styles = StyleSheet.create({
  button: {
    borderWidth: 0.5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderColor: 'gray',
    justifyContent:"center",
    alignItems:"center"
  },
  text: {
    color: 'gray',
    fontWeight: 700,
    justifyContent:"center",
    alignItems:"center"
  },
});
