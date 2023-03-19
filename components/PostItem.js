import { Image, StyleSheet, Text, View } from "react-native";

export const PostItem = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/img/img-post.png")}
        fadeDuration={0}
        style={styles.imgCover}
      />
      <View style={styles.userContainer}>
        <Text style={styles.userNmae}>PostItem </Text>
        <Text style={styles.userEmail}>PostEmail </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: "rgba(0,0,0, 0.1)",
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
    fontWeight: 700,
    lineHeight: 15,
    color: "#212121",
  },
  userEmail: {
    color: "#212121",
    fontSize: 11,
    lineHeight: 13,
    fontFamily: "Roboto-Regular",
    fontWeight: 400,
  },
});
