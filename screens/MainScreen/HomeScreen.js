import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "../../App";
import { PostsScreen } from "./PostsScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { ProfileScreen } from "./ProfileScreen";

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
      screenOptions={{ tabBarShowLabel: false, tabBarStyle: styles.tabBar }}
    >
      <MainTab.Screen
        options={{
          title: "Публикации",
          headerRight: (props) => <LogOutBtn />,
          tabBarItemStyle: { height: 0 },
          headerTitleStyle: styles.titleHeader,
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                ...styles.tabIconContainer,
                backgroundColor: focused ? "#FF6C00" : "#fff",
              }}
            >
              <Icon
                name="icon-grid"
                size={size}
                color={focused ? "#fff" : "#212121"}
              />
            </View>
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          headerTitle: "Создать публикацию",
          tabBarItemStyle: { height: 0 },
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                ...styles.tabIconContainer,
                backgroundColor: focused ? "#FF6C00" : "#fff",
              }}
            >
              <Icon
                name="icon-Union"
                size={size}
                color={focused ? "#fff" : "#212121"}
              />
            </View>
          ),
        }}
        name="Create"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarItemStyle: { height: 0 },
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                ...styles.tabIconContainer,
                backgroundColor: focused ? "#FF6C00" : "#fff",
              }}
            >
              <Icon
                name="icon-user"
                size={size}
                color={focused ? "#fff" : "#212121"}
              />
            </View>
          ),
        }}
        name="Profile"
        component={ProfileScreen}
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
    paddingHorizontal: 50,
    flexDirection: "row",
    minHeight: 83,
    borderTopColor: "rgba(0, 0, 0, 0.3)",
    // shadowColor: "rgba(0, 0, 0, 0.3)",
    // shadowOffset: {
    //   height: 6,
    //   width: 0,
    // },
    // shadowOpacity: 0.1,
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
