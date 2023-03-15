import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { AvatarBox } from "../components/AvatarBox";
import { TextInputCustom } from "../components/TextInputCustom";

const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setDimensions(width);
    };
    const subscription = Dimensions.addEventListener("change", onChange);

    return () => subscription?.remove();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);

    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      {/* <View style={styles.container} onLayout={onLayoutRootView}> */}
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/img/photo-bg.jpg")}
          style={styles.image}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : ""}
          >
            <View style={styles.form}>
              <AvatarBox />
              <View style={{ ...styles.content, width: dimensions }}>
                <Text style={styles.title}>Войти</Text>

                <TextInputCustom
                  placeholder="Адрес электронной почты"
                  handleChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                  value={state.email}
                  keyboardType="email-address"
                  onFocus={() => setIsShowKeyboard(true)}
                />
                <TextInputCustom
                  type="password"
                  customStyle={{ marginBottom: isShowKeyboard ? 32 : 43 }}
                  placeholder="Пароль"
                  handleChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                  value={state.password}
                  secureTextEntry={true}
                  onFocus={() => setIsShowKeyboard(true)}
                />

                {!isShowKeyboard && (
                  <>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.btn}
                      onPress={keyboardHide}
                    >
                      <Text style={styles.btnText}>Войти</Text>
                    </TouchableOpacity>
                    <Text style={styles.linkAuth}>
                      Нет аккаунта? Зарегистрироваться
                    </Text>
                  </>
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    width: "100%",
  },
  content: {
    marginHorizontal: 16,
  },
  input: {
    backgroundColor: "#F6F6F6",
    // borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 16,
    height: 50,
    alignItems: "center",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#212121",
    fontWeight: "400",
    marginBottom: 16,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginTop: 92,
    marginBottom: 33,
  },
  btn: {
    height: 51,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 0,
    // marginTop: 43,
    marginBottom: 16,
  },
  btnText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  linkAuth: {
    color: "#1B4371",
    fontSize: 16,
    textDecorationLine: "underline",
    fontFamily: "Roboto-Regular",
    marginBottom: 66,
    textAlign: "center",
  },
});
