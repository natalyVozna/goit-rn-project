import React from "react";
import { Image, StyleSheet, View, Text, Dimensions } from "react-native";

export const CommentCard = ({ url, id, text, own = false }) => {
  return (
    <View
      style={{
        ...styles.container,
        flexDirection: own ? "row-reverse" : "row",
      }}
    >
      <Image
        source={url}
        style={{
          ...styles.image,
          marginLeft: own && 16,
          marginRight: own ? 0 : 16,
        }}
      />
      <View
        style={{
          ...styles.commentBlock,
          width: Dimensions.get("window").width - 76,
          borderTopRightRadius: own ? 0 : 6,
          borderTopLeftRadius: own ? 6 : 0,
        }}
      >
        <Text style={styles.comment}>{text}</Text>
        <Text
          style={{
            ...styles.date,
            textAlign: own ? "left" : "right",
          }}
        >
          09 июня, 2020 | 08:40
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    marginBottom: 24,
    maxWidth: "100%",
  },
  image: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    overflow: "hidden",
  },
  commentBlock: {
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    // borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  comment: {
    color: "#212121",
    // fontFamily: "Roboto-Reqular",
    // fontWeight: 400,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 9,
  },
  date: {
    color: "#BDBDBD",
    // fontFamily: "Roboto-Reqular",
    // fontWeight: 400,
    fontSize: 10,
    lineHeight: 12,
    width: "100%",
  },
});
