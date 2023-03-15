import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

export const TextInputCustom = ({
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
  const [borderColorInput, setBorderColorInput] = useState("#E8E8E8");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#F6F6F6");
  const [hidePassword, setHidePassword] = useState(true);
  const inputRef = useRef();

  useEffect(() => {
    setHidePassword(secureTextEntry);
  }, [secureTextEntry]);

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

  const togglePassword = () => {
    if (type === "password") {
      setHidePassword(!hidePassword);
    }
  };

  return (
    <View style={{ position: "relative" }}>
      {type === "password" && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btn}
          onPress={togglePassword}
        >
          <Text style={styles.textShow}>
            {hidePassword ? "Показать" : "Скрыть"}
          </Text>
        </TouchableOpacity>
      )}
      <TextInput
        ref={inputRef}
        style={{
          ...styles.input,
          borderColor: borderColorInput,
          backgroundColor: backgroundColorInput,
          ...customStyle,
        }}
        placeholder={placeholder}
        placeholderTextColor={"#BDBDBD"}
        value={value}
        onFocus={customOnFocus}
        onBlur={customOnBlur}
        onChangeText={handleChangeText}
        secureTextEntry={hidePassword}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 16,
    height: 50,
    alignItems: "center",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#212121",
    marginBottom: 16,
  },
  btn: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    right: 16,
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
