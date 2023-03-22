import React, { useState } from "react";
import { useEffect } from "react";
import { Alert, FlatList, Image, StyleSheet, View } from "react-native";
import { CommentCard } from "../../components/CommentCard";
import { Textarea } from "../../components/Textarea";
import url from "../../assets/img/img-post.png";
import coverImg from "../../assets/img/img-1.jpg";
import { BackBtn } from "../../components/BackBtn";
import { useSelector } from "react-redux";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";

export const CommentsScreen = ({ navigation, route }) => {
  const { photo, userId, postId } = route.params;
  const { userId: myId, nickname } = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");
  const [allComment, setAllComment] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => <BackBtn onPress={() => navigation.goBack()} />,
    });
  }, []);

  useEffect(() => {
    setIsOwner(myId === userId);
  }, [route.params.item]);

  const createComment = async () => {
    const docRef = doc(db, "posts", postId);
    await addDoc(collection(docRef, "comments"), {
      nickname,
      comment,
      date: Date.now(),
    });
    setComment("");
  };

  const getAllComments = async () => {
    const docRef = collection(db, "posts", postId, "comments");
    onSnapshot(docRef, (data) => {
      setAllComment(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getAllComments();
  }, []);
  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.image}></Image>
      <FlatList
        style={{ marginBottom: 70 }}
        data={allComment}
        renderItem={({ item }) => (
          <CommentCard item={item} photo={photo} own={isOwner} avatar={url} />
        )}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.textarea}>
        <Textarea
          placeholder="Комментировать..."
          handleChangeText={(value) => setComment(value)}
          value={comment}
          onPressBtn={() => createComment()}
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
    position: "relative",
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
