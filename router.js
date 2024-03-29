import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen } from "./screens/AuthScreen/LoginScreen";
import { RegistrationScreen } from "./screens/AuthScreen/RegistrationScreen";
import { CreatePostsScreen } from "./screens/MainScreen/CreatePostsScreen";

import { HomeScreen } from "./screens/MainScreen/HomeScreen";
import { PostsScreen } from "./screens/MainScreen/PostsScreen";
import { ProfileScreen } from "./screens/MainScreen/ProfileScreen";
import { CommentsScreen } from "./screens/NestedScreens/CommentsScreen";

const AuthStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

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
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{ title: "Создать публикацию" }}
        name="CreatePosts"
        component={CreatePostsScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={ProfileScreen}
      />
      <Stack.Screen
        options={{ title: "Комментарии" }}
        name="Comments"
        component={CommentsScreen}
      />
    </Stack.Navigator>
  );
};
