import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { PostItem } from "../../components/PostItem";
import avatar from "../../assets/img/img-post.png";
import { useState } from "react";
import { useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../firebase/config";

export const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const getAllPost = async () => {
    const dbRef = collection(db, "posts");
    onSnapshot(dbRef, (docsSnap) => {
      setPosts(docsSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerUser}>
        <Image source={avatar} fadeDuration={0} style={styles.imgCover} />
        <View style={styles.userContainer}>
          <Text style={styles.userNmae}>PostItem </Text>
          <Text style={styles.userEmail}>PostEmail </Text>
        </View>
      </View>
      <FlatList
        style={{ paddingBottom: 90 }}
        data={posts}
        renderItem={({ item }) => (
          <PostItem
            navigation={navigation}
            item={item}
            iconMessage="icon-message-circle"
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
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
    paddingBottom: 80,
    backgroundColor: "#FFFFFF",
  },
  containerUser: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  userContainer: {},
  imgCover: {
    width: 60,
    height: 60,
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 8,
  },
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
    fontFamily: "Roboto-Regular",
    // fontWeight: 400,
  },
});
