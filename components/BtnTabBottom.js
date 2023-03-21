import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "../App";

export const BtnTabBottom = ({ icon, size, color, customStyle, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.tabIconContainer,
        ...customStyle,
      }}
      onPress={onPress}
    >
      <Icon
        name={icon}
        size={size ? size : 13}
        color={color ? color : "#fff"}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    // position: "absolute",
    // top: 9,
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
