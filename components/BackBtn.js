import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "../App";

export const BackBtn = ({ onPress, customStyle, color, size }) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={customStyle}>
      <Icon
        name="icon-arrow-left"
        size={size ? size : 20}
        color={color ? color : "#212121"}
      />
    </TouchableOpacity>
  );
};
