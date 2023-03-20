import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, View } from "react-native";
import { Icon } from "./App";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { LoginScreen } from "./screens/AuthScreen/LoginScreen";
import { RegistrationScreen } from "./screens/AuthScreen/RegistrationScreen";
import { CreatePostsScreen } from "./screens/MainScreen/CreatePostsScreen";

import { HomeScreen } from "./screens/MainScreen/HomeScreen";
import { CommentsScreen } from "./screens/CommentsScreen";
import { MapScreen } from "./screens/MapScreen";

const AuthStack = createNativeStackNavigator();
// const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  const BackBtn = (onPress) => {
    // console.log("props", props);
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        // onPress={navigation.goBack}
        onPress={onPress}
        style={{ marginRight: 10 }}
      >
        <Icon name="icon-arrow-left" size={20} color={"#212121"} />
      </TouchableOpacity>
    );
  };

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
    // <HomeScreen />
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
      <AuthStack.Screen
        options={{ title: "Создать публикацию" }}
        name="CreatePosts"
        component={CreatePostsScreen}
      />
      <AuthStack.Screen
        options={{ title: "Комментарии" }}
        name="Comments"
        component={CommentsScreen}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Map"
        component={MapScreen}
      />
    </AuthStack.Navigator>
  );
};
