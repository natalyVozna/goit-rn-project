import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

export const AvatarBox = ({ url }) => {
  const [color, setColor] = useState("#FF6C00");

  useEffect(() => {
    if (url) setColor("#E8E8E8");
  }, [url]);
  return (
    <View
      style={{
        ...styles.container,
        left: Dimensions.get("window").width / 2 - 60,
      }}
    >
      {url ? (
        <Image source={url} style={styles.cover} />
      ) : (
        <View style={styles.cover}></View>
      )}

      <TouchableOpacity
        activeOpacity={0.8}
        style={{ ...styles.btn, borderColor: color }}
        // onPress={console.log("press")}
      >
        {url ? (
          <Ionicons name="md-close-outline" size={20} color="#E8E8E8" />
        ) : (
          <Ionicons name="add" size={20} color="#FF6C00" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: -60,
  },
  cover: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  btn: {
    position: "absolute",
    bottom: 14,
    right: -12,
    width: 25,
    height: 25,
    backgroundColor: "#fff",
    // borderColor: "#FF6C00",
    borderWidth: 1,
    paddingLeft: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  btnText: {
    color: "#FF6C00",
    fontSize: 16,
    position: "relative",
    bottom: 1,
  },
});
