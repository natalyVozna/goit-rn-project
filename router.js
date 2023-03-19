import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { LoginScreen } from "./screens/AuthScreen/LoginScreen";
import { RegistrationScreen } from "./screens/AuthScreen/RegistrationScreen";
import { PostsScreen } from "./screens/MainScreen/PostsScreen";
import { CreatePostsScreen } from "./screens/MainScreen/CreatePostsScreen";
import { ProfileScreen } from "./screens/MainScreen/ProfileScreen";

//icons import
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Icon } from "./App";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { HomeScreen } from "./screens/MainScreen/HomeScreen";

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }

  return (
    <HomeScreen />
    // <MainTab.Navigator
    //   screenOptions={{ tabBarShowLabel: false, tabBarStyle: styles.tabBar }}
    // >
    //   <MainTab.Screen
    //     options={{
    //       title: "Публикации",
    //       headerRight: (props) => <LogOutBtn />,
    //       tabBarItemStyle: { height: 0 },
    //       headerTitleStyle: styles.titleHeader,
    //       tabBarIcon: ({ focused, size, color }) => (
    //         <View
    //           style={{
    //             ...styles.tabIconContainer,
    //             backgroundColor: focused ? "#FF6C00" : "#fff",
    //           }}
    //         >
    //           <Icon
    //             name="icon-grid"
    //             size={size}
    //             color={focused ? "#fff" : "#212121"}
    //           />
    //         </View>
    //       ),
    //     }}
    //     name="Posts"
    //     component={PostsScreen}
    //   />
    //   <MainTab.Screen
    //     options={{
    //       headerTitle: "Создать публикацию",
    //       tabBarItemStyle: { height: 0 },
    //       tabBarIcon: ({ focused, size, color }) => (
    //         <View
    //           style={{
    //             ...styles.tabIconContainer,
    //             backgroundColor: focused ? "#FF6C00" : "#fff",
    //           }}
    //         >
    //           <Icon
    //             name="icon-Union"
    //             size={size}
    //             color={focused ? "#fff" : "#212121"}
    //           />
    //         </View>
    //       ),
    //     }}
    //     name="Create"
    //     component={CreatePostsScreen}
    //   />
    //   <MainTab.Screen
    //     options={{
    //       headerShown: false,
    //       tabBarItemStyle: { height: 0 },
    //       tabBarIcon: ({ focused, size, color }) => (
    //         <View
    //           style={{
    //             ...styles.tabIconContainer,
    //             backgroundColor: focused ? "#FF6C00" : "#fff",
    //           }}
    //         >
    //           <Icon
    //             name="icon-user"
    //             size={size}
    //             color={focused ? "#fff" : "#212121"}
    //           />
    //         </View>
    //       ),
    //     }}
    //     name="Profile"
    //     component={ProfileScreen}
    //   />
    // </MainTab.Navigator>
  );
};
