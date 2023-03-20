import React, { useState } from "react";
import { useEffect } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "../App";
import { CommentCard } from "../components/CommentCard";
import { Textarea } from "../components/Textarea";
import { TextInputCustom } from "../components/TextInputCustom";

export const CommentsScreen = ({ navigation, route }) => {
  const [comment, setComment] = useState("");
  const url = require("../assets/img/img-post.png");
  const text =
    "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!";

  const BackBtn = ({ onPress }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={{ marginLeft: 10 }}
      >
        <Icon name="icon-arrow-left" size={20} color={"#212121"} />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => <BackBtn onPress={() => navigation.goBack()} />,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/img/img-1.jpg")}
        style={styles.image}
      ></Image>
      <CommentCard url={url} text={text} />
      <CommentCard url={url} text={text} own={true} />
      <Textarea
        placeholder="Комментировать..."
        handleChangeText={(value) => setComment(value)}
        value={comment}
        onPressBtn={() => Alert.alert("Send comment")}
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
});
