import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Icon } from "../App";

export const TextInputPost = ({
  type = "text",
  placeholder,
  handleChangeText,
  value,
  onFocus,
  onBlur,
  customStyle = {},
  secureTextEntry = false,
  ...props
}) => {
  const [paddingLeftInput, setPaddingLeftInput] = useState(0);
  const [backgroundColorInput, setBackgroundColorInput] = useState("#F6F6F6");
  const inputRef = useRef();

  useEffect(() => {
    if (type === "map") {
      setPaddingLeftInput(30);
    }
  }, [type]);

  const customOnFocus = () => {
    setBorderColorInput("#FF6C00");
    setBackgroundColorInput("#ffffff");
    if (onFocus) {
      onFocus();
    }
  };

  const customOnBlur = () => {
    setBorderColorInput("#E8E8E8");
    setBackgroundColorInput("#F6F6F6");
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <View style={{ position: "relative" }}>
      {type === "map" && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btn}
          //   onPress={togglePassword}
        >
          <Icon name="icon-map-pin" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      )}
      <TextInput
        ref={inputRef}
        style={{
          ...styles.input,
          paddingLeft: paddingLeftInput,
          ...customStyle,
        }}
        placeholder={placeholder}
        placeholderTextColor={"#BDBDBD"}
        value={value}
        onChangeText={handleChangeText}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    height: 50,
    // paddingBottom: 15,
    alignItems: "center",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
    color: "#212121",
    marginBottom: 16,
  },
  btn: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 0,
    height: 50,
    justifyContent: "center",
  },
  textShow: {
    lineHeight: 19,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
  },
});
