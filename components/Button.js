import { TouchableOpacity } from "react-native";

import { FontAwesome } from "@expo/vector-icons";

export const Button = ({ icon, color, customStyle, size, onPress }) => {
  return (
    <TouchableOpacity style={customStyle} onPress={onPress}>
      <FontAwesome
        name={icon}
        size={size ? size : 20}
        color={color ? color : "#BDBDBD"}
      />
    </TouchableOpacity>
  );
};
