import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PostItem } from "../../components/PostItem";

export const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <PostItem />
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
  },
});
