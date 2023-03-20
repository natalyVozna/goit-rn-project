import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { PostItem } from "../../components/PostItem";

export const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerUser}>
        <Image
          source={require("../../assets/img/img-post.png")}
          fadeDuration={0}
          style={styles.imgCover}
        />
        <View style={styles.userContainer}>
          <Text style={styles.userNmae}>PostItem </Text>
          <Text style={styles.userEmail}>PostEmail </Text>
        </View>
      </View>
      {/* <PostItem /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: "#FFFFFF",
  },
  containerUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  imgCover: {
    width: 60,
    height: 60,
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 8,
  },
  userContainer: {},
  userNmae: {
    fontSize: 13,
    fontFamily: "Roboto-Bold",
    // fontWeight: 700,
    lineHeight: 15,
    color: "#212121",
  },
  userEmail: {
    color: "#212121",
    fontSize: 11,
    lineHeight: 13,
    // fontFamily: "Roboto-Regular",
    // fontWeight: 400,
  },
});
