import { Pressable, Text } from 'react-native';

export default function Button({ title, onPress, className, textClass }) {
  return (
    <Pressable
      onPress={onPress}
      className={`items-center rounded-xl bg-blue-500 px-4 py-3 ${className}`}>
      <Text className={`text-base font-semibold text-white ${textClass}`}>{title}</Text>
    </Pressable>
  );
}
