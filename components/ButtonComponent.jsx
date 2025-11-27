import { Pressable, Text } from "react-native";

export default function Button({ title, onPress, className, textClass }) {
  return (
    <Pressable 
      onPress={onPress} 
      className={`bg-blue-500 py-3 px-4 rounded-xl items-center ${className}`}
    >
      <Text className={`text-white font-semibold text-base ${textClass}`}>
        {title}
      </Text>
    </Pressable>
  );
}