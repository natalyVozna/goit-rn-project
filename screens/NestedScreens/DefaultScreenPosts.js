import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { PostItem } from "../../components/PostItem";
import avatar from "../../assets/img/img-post.png";
import { useState } from "react";
import { useEffect } from "react";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  // {
  //   id: "58694a0f-3da1-471f-bd96-145571e29d72",
  //   title: "Third Item",
  // },
  // {
  //   id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f6",
  //   title: "Second Item",
  // },
  // {
  //   id: "58694a0f-3da1-471f-bd96-145571e29d76",
  //   title: "Third Item",
  // },
];

export const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  console.log(" navigation", navigation);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  console.log("posts", posts);
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
