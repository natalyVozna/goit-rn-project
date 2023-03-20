import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AvatarBox } from "../../components/AvatarBox";
import { PostItem } from "../../components/PostItem";

export const ProfileScreen = ({ navigation }) => {
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  // console.log(" navigation", navigation);

  const url = require("../../assets/img/avatar.jpg");

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setDimensions(width);
    };
    const subscription = Dimensions.addEventListener("change", onChange);

    return () => subscription?.remove();
  }, []);

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    // {
    //   id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    //   title: "Second Item",
    // },
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

  return (
    // <TouchableWithoutFeedback onPress={keyboardHide}>
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/img/photo-bg.jpg")}
        style={styles.image}
      >
        <View
          style={{
            ...styles.form,
            minHeight: Dimensions.get("window").height - 160,
          }}
        >
          <AvatarBox url={url} />
          <View style={{ ...styles.content, width: dimensions }}>
            <Text style={styles.title}>Natali Romanova</Text>
            {/* <PostItem /> */}
            <FlatList
              data={DATA}
              renderItem={({ item }) => (
                <PostItem
                  goToComents={() => navigation.navigate("Comments")}
                  item={item}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
    // </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    // justifyContent: "flex-end",
    alignItems: "center",
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    width: "100%",
    marginTop: 200,
    // minHeight: 600,
    height: "100%",
  },
  content: {
    marginHorizontal: 16,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginTop: 92,
    marginBottom: 33,
  },
});
