import { View } from "react-native";

const Divider = ({ 
  height = 1, 
  color = "#D1D5DB", 
  width = "100%", 
  marginVertical = 8 
}) => {
  return (
    <View
      style={{
        width,
        height,
        backgroundColor: color,
        marginVertical,
      }}
    />
  );
};

export default Divider;
