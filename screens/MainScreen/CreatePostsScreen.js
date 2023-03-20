import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { Icon } from "../../App";
import { FontAwesome } from "@expo/vector-icons";
import { TextInputPost } from "../../components/TextinputPost";

const initialState = {
  name: "",
  address: "",
};

export const CreatePostsScreen = ({ navigation }) => {
  const [file, setFile] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [backgroundColorBtn, setBackgroundColorBtn] = useState("#F6F6F6");
  const [colorBtn, setColorBtn] = useState("#BDBDBD");

  const BackBtn = ({ onPress }) => {
    // console.log("props", props);
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={{ marginRight: 10 }}
      >
        <Icon name="icon-arrow-left" size={20} color={"#212121"} />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => <BackBtn onPress={() => navigation.goBack()} />,
    });
  }, []);

  const keyboardHide = (eventType) => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);

    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View
          // source={require("../../assets/img/photo-bg.jpg")}
          style={styles.image}
        >
          <TouchableOpacity
            style={styles.cameraBtn}
            ess={() => Alert.alert("Upload a picture!")}
          >
            <FontAwesome name="camera" size={20} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ marginBottom: 48 }}
          onPress={() => Alert.alert("Repair a picture!")}
        >
          <Text style={styles.uploadText}>
            {file ? "Редактировать фото" : "Загрузите фото"}
          </Text>
        </TouchableOpacity>

        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""}>
          <View style={styles.form}>
            <TextInputPost
              placeholder="Название..."
              handleChangeText={(value) =>
                setState((prevState) => ({ ...prevState, name: value }))
              }
              value={state.name}
              onFocus={() => setIsShowKeyboard(true)}
            />
            <TextInputPost
              placeholder="Местность..."
              type="map"
              handleChangeText={(value) =>
                setState((prevState) => ({ ...prevState, address: value }))
              }
              value={state.address}
              onFocus={() => setIsShowKeyboard(true)}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={{ ...styles.btn, backgroundColor: backgroundColorBtn }}
              onPress={keyboardHide}
            >
              <Text style={{ ...styles.btnText, color: colorBtn }}>
                Опубликовать
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            ...styles.btnDelete,
            backgroundColor: "#F6F6F6",
            left: Dimensions.get("window").width / 2 - 35,
          }}
          onPress={() => Alert.alert("Remove")}
        >
          <Icon name="icon-bin" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: "#FFFFFF",
    flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: "center",
  },
  cameraBtn: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  uploadText: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
  },
  btn: {
    height: 51,
    // backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 0,
    marginTop: 32,
    marginBottom: 32,
  },
  btnText: {
    // color: "#ffffff",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },

  btnDelete: {
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    position: "absolute",
    bottom: 32,
  },
});
