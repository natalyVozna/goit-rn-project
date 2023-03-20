import { useEffect } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "../App";
import cover from "../assets/img/img-1.jpg";

export const PostItem = ({ item, goToComents, type }) => {
  console.log("title, id", item);
  const { title, address, photo } = item;
  return (
    <View
      style={{
        ...styles.container,
        width: Dimensions.get("window").width - 32,
      }}
    >
      <Image
        source={{ uri: photo }}
        style={{ ...styles.image, width: Dimensions.get("window").width - 32 }}
      ></Image>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.actionBox}>
        <View style={styles.addressBox}>
          <TouchableOpacity
            style={{ ...styles.btnWrap, marginRight: 24 }}
            onPress={goToComents}
          >
            <Icon name="icon-message-circle" size={24} color={"#FF6C00"} />
            <Text style={styles.text}>8</Text>
          </TouchableOpacity>
          {type === "like" && (
            <TouchableOpacity style={styles.btnWrap}>
              <Icon name="icon-thumbs-up" size={24} color={"#FF6C00"} />
              <Text style={styles.text}>153</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.btnWrap}>
          <Icon name="icon-map-pin" size={24} color={"#BDBDBD"} />
          <Text style={styles.textLink}>{address}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 35,
  },
  image: {
    // width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 8,
  },
  title: {
    color: "#212121",
    // fontFamily: "Roboto-Medium",
    textAlign: "left",
    alignItems: "flex-start",
    // fontWeight: 500,
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 11,
  },
  actionBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addressBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "#212121",
    // fontFamily: "Roboto-Reqular",
    // fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 9,
  },
  textLink: {
    color: "#212121",
    // fontFamily: "Roboto-Reqular",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 9,
    textDecorationLine: true,
  },

  btnWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
});
