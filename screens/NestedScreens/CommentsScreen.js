import React, { useState } from "react";
import { useEffect } from "react";
import { Alert, FlatList, Image, StyleSheet, View } from "react-native";
import { CommentCard } from "../../components/CommentCard";
import { Textarea } from "../../components/Textarea";
import url from "../../assets/img/img-post.png";
import coverImg from "../../assets/img/img-1.jpg";
import { BackBtn } from "../../components/BackBtn";

export const CommentsScreen = ({ navigation, route }) => {
  console.log("item", route.params.item);
  const { item } = route.params;
  const [comment, setComment] = useState("");
  const text =
    "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!";

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      text: "Really love your most recent photo.",
      own: false,
      url: url,
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      text: "I’ve been trying to capture the same thing for a few months and would love some tips!",
      own: true,
      url: url,
    },
  ];

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => <BackBtn onPress={() => navigation.goBack()} />,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image source={coverImg} style={styles.image}></Image>
      <FlatList
        style={{ marginBottom: 70 }}
        data={DATA}
        renderItem={({ item }) => <CommentCard item={item} />}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={styles.textarea}>
        <Textarea
          placeholder="Комментировать..."
          handleChangeText={(value) => setComment(value)}
          value={comment}
          onPressBtn={() => Alert.alert("Send comment")}
          // customStyle={styles.textarea}
        />
      </View>
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
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 32,
  },
  textarea: {
    position: "absolute",
    bottom: 16,
    width: "100%",
    left: 16,
  },
});
