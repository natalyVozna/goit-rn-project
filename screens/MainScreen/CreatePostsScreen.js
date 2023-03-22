import React, { useEffect, useRef, useState } from "react";
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
  Image,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { nanoid } from "nanoid";

import { Icon } from "../../App";
import { TextInputPost } from "../../components/TextinputPost";
import { Button } from "../../components/Button";
import { BackBtn } from "../../components/BackBtn";
import { db, storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useSelector } from "react-redux";

const initialState = {
  name: "",
  address: "",
};

export const CreatePostsScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [backgroundColorBtn, setBackgroundColorBtn] = useState("#F6F6F6");
  const [colorBtn, setColorBtn] = useState("#BDBDBD");
  const { userId, nickname } = useSelector((state) => state.auth);

  const [photo, setPhoto] = useState("");
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [hasPermission, setHasPermission] = useState(null);
  const refCamera = useRef(null);

  const [location, setLocation] = useState({});

  //дозвіл на отримання Location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  //дозвіл на відкриття фотокамери
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  //логіка для кнопкт назад в head
  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => (
        <BackBtn
          customStyle={{ marginRight: 10 }}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, []);

  useEffect(() => {
    if (photo && state.name && state.address) {
      setBackgroundColorBtn("#FF6C00");
      setColorBtn("#fff");
    } else {
      setBackgroundColorBtn("#F6F6F6");
      setColorBtn("#BDBDBD");
    }
  }, [state, photo]);

  const takePhoto = async () => {
    if (refCamera) {
      try {
        const data = await refCamera.current.takePictureAsync();
        setPhoto(data.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    //переводимо наше фото у формат через спосиь який рекомендує firebase
    const file = await response.blob();
    const uniqueIdPost = Date.now().toString();

    const storageRef = await ref(storage, `postImages/${uniqueIdPost}.jpg`);

    //загружаємл фото на сервер   path storageRef
    await uploadBytes(storageRef, file);

    //отримуємо силку на фото
    const uploadedPhoto = await getDownloadURL(
      ref(storage, `postImages/${uniqueIdPost}.jpg`)
    );

    return uploadedPhoto;
  };

  const uploadPostToServer = async () => {
    const uploadedPhoto = await uploadPhotoToServer();
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        photo: uploadedPhoto,
        title: state.name,
        address: state.address,
        userId,
        nickname,
        ...location,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const sendPhoto = async () => {
    uploadPostToServer();
    navigation.navigate("DefaultScreen");
    // setState(initialState);
  };

  const savePhoto = async () => {
    if (photo) {
      try {
        await MediaLibrary.createAssetAsync(photo);
        Alert.alert("Photo save");
        setPhoto(null);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const keyboardHide = (eventType) => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    // setState(initialState);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const renderCameraBlock = () => {
    if (!isShowKeyboard) {
      if (!photo) {
        return (
          <Camera ref={refCamera} type={type} style={styles.camera}>
            <View style={styles.optionBox}>
              <Button
                icon="retweet"
                color={type === CameraType.back ? "#BDBDBD" : "#fff"}
                onPress={() => {
                  setType(
                    type === CameraType.back
                      ? CameraType.front
                      : CameraType.back
                  );
                }}
              />
              <Button
                icon="flash"
                color={
                  flash === Camera.Constants.FlashMode.off ? "#BDBDBD" : "#fff"
                }
                onPress={() => {
                  setFlash(
                    flash === Camera.Constants.FlashMode.off
                      ? Camera.Constants.FlashMode.on
                      : Camera.Constants.FlashMode.off
                  );
                }}
              />
            </View>
            <Button
              icon={"camera"}
              color="#BDBDBD"
              customStyle={styles.cameraBtn}
              size={20}
              onPress={() => takePhoto()}
            />
          </Camera>
        );
      } else {
        return (
          <Image
            source={{ uri: photo }}
            style={{
              ...styles.camera,
            }}
          />
        );
      }
    }

    return null;
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        {/* <Camera ref={setCameraRef} type={type} style={styles.camera}> */}
        {!photo ? (
          <Camera
            ref={refCamera}
            type={type}
            style={{ ...styles.camera, height: isShowKeyboard ? 100 : 240 }}
          >
            <View style={styles.optionBox}>
              <Button
                icon="retweet"
                color={type === CameraType.back ? "#BDBDBD" : "#fff"}
                onPress={() => {
                  setType(
                    type === CameraType.back
                      ? CameraType.front
                      : CameraType.back
                  );
                }}
              />
              <Button
                icon="flash"
                color={
                  flash === Camera.Constants.FlashMode.off ? "#BDBDBD" : "#fff"
                }
                onPress={() => {
                  setFlash(
                    flash === Camera.Constants.FlashMode.off
                      ? Camera.Constants.FlashMode.on
                      : Camera.Constants.FlashMode.off
                  );
                }}
              />
            </View>
            <Button
              icon={"camera"}
              color="#BDBDBD"
              customStyle={styles.cameraBtn}
              size={20}
              onPress={() => takePhoto()}
            />
          </Camera>
        ) : (
          <Image
            source={{ uri: photo }}
            style={{
              ...styles.camera,
              height: isShowKeyboard ? 100 : 240,
            }}
          />
        )}

        {/* {renderCameraBlock()} */}

        <TouchableOpacity
          style={{ marginBottom: 48 }}
          onPress={() => Alert.alert("Repair a picture!")}
        >
          <Text style={styles.uploadText}>
            {photo ? "Редактировать фото" : "Загрузите фото"}
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
              onPress={sendPhoto}
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
  camera: {
    // height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    position: "relative",
  },
  optionBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    width: "100%",
    position: "absolute",
    top: 20,
    left: 0,
  },
  photoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    // height: 240,
    width: "100%",
    borderColor: "red",
    backgroundColor: "red",
    borderWidth: 2,
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

  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },

  flipContainer: {
    flex: 0.1,
    alignSelf: "flex-end",
  },

  button: { alignSelf: "center" },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 50,
  },
});
