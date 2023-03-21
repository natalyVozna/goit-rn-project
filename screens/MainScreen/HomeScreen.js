import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "../../App";
import { PostsScreen } from "./PostsScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { ProfileScreen } from "./ProfileScreen";
import { CommentsScreen } from "../NestedScreens/CommentsScreen";
import { BtnTabBottom } from "../../components/BtnTabBottom";

const MainTab = createBottomTabNavigator();

export const HomeScreen = ({ navigation }) => {
  const LogOutBtn = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => Alert.alert("This is a logout!")}
        style={{ marginRight: 10 }}
      >
        <Icon name="icon-log-out" size={20} color={"#BDBDBD"} />
      </TouchableOpacity>
    );
  };

  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerShown: false,
          headerRight: (props) => <LogOutBtn />,
          tabBarItemStyle: { height: 0 },
          headerTitleStyle: styles.titleHeader,

          tabBarIcon: ({ focused, size }) => (
            <View
              style={{
                ...styles.tabIconContainer,
              }}
            >
              <Icon name="icon-grid" size={24} color="#212121" />
            </View>
          ),
        }}
      />
      <MainTab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          headerTitle: "Создать публикацию",
          tabBarItemStyle: { height: 0 },
          tabBarIcon: () => (
            <BtnTabBottom
              onPress={() => navigation.navigate("CreatePosts")}
              icon="icon-Union"
              size={13}
              color="#fff"
              customStyle={{
                backgroundColor: "#FF6C00",
                position: "absolute",
                top: 9,
              }}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            height: 0,
            // width: Dimensions.get("window").width,
          },
          tabBarPosition: "bottom",

          tabBarIcon: ({ focused }) => (
            <BtnTabBottom
              onPress={() => navigation.navigate("Profile")}
              icon="icon-user"
              size={24}
              color="#212121"
              customStyle={{
                backgroundColor: "#fff",
                position: "absolute",
                top: 9,
              }}
            />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabBar: {
    position: "absolute",
    paddingHorizontal: 70,
    flexDirection: "row",
    minHeight: 83,
    borderTopColor: "rgba(0, 0, 0, 0.3)",
  },
  tabIconContainer: {
    position: "absolute",
    top: 9,
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  titleHeader: {
    fontFamily: "Roboto-Medium",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 22,
    color: "#212121",
  },
});
