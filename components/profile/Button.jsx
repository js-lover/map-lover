import { Text, Pressable, StyleSheet, View } from 'react-native';

export default function Button({
  onPress,
  textStyle,
  buttonStyle,
  title,
  icon,        // ✅ opsiyonel
  iconPosition = 'left', // opsiyonel (left | right)
}) {
  return (
    <Pressable onPress={onPress} style={[styles.button, buttonStyle]}>
      <View style={styles.content}>
        {icon && iconPosition === 'left' && (
          <View style={styles.icon}>{icon}</View>
        )}

        <Text style={[styles.text, textStyle]}>{title}</Text>

        {icon && iconPosition === 'right' && (
          <View style={styles.icon}>{icon}</View>
        )}
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    borderWidth: 0.5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',   // 👈 icon + text
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 4,
  },
  text: {
    color: 'gray',
    fontWeight: '700',
  },
});
