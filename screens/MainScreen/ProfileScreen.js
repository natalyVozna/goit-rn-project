import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AvatarBox } from "../../components/AvatarBox";
import { PostItem } from "../../components/PostItem";
import url from "../../assets/img/avatar.jpg";
import coverImg from "../../assets/img/photo-bg.jpg";
import { BtnTabBottom } from "../../components/BtnTabBottom";

export const ProfileScreen = ({ navigation }) => {
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

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
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];

  return (
    // <TouchableWithoutFeedback onPress={keyboardHide}>
    <ScrollView style={styles.container}>
      <ImageBackground source={coverImg} style={styles.image}>
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
            <View>
              {DATA.map((item) => (
                <PostItem
                  key={item.id.toString()}
                  item={item}
                  type="like"
                  iconMessage="icon-message-color"
                  navigation={navigation}
                />
              ))}
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.footer}>
        <View style={styles.tabsBottom}>
          <BtnTabBottom
            onPress={() => navigation.navigate("Posts")}
            icon="icon-grid"
            size={24}
            color="#212121"
            customStyle={{ backgroundColor: "#fff" }}
          />
          <BtnTabBottom
            // onPress={() => navigation.navigate("Profile")}
            icon="icon-user"
            size={24}
            color="#fff"
            customStyle={{ backgroundColor: "#FF6C00" }}
          />
          <BtnTabBottom
            onPress={() => navigation.navigate("CreatePosts")}
            icon="icon-Union"
            size={13}
            color="#212121"
            customStyle={{ backgroundColor: "#fff" }}
          />
        </View>
      </View>
    </ScrollView>
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
    height: "100%",
    marginBottom: 10,
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
  footer: {
    height: 83,
    width: Dimensions.get("window").width,
    borderTopColor: "rgba(0, 0, 0, 0.3)",
    borderTopWidth: 1,
    alignItems: "center",
  },
  tabsBottom: {
    height: 83,
    width: Dimensions.get("window").width,
    paddingHorizontal: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 9,
  },
  icon: {
    position: "relative",
  },
});
