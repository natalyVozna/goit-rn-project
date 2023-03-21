import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen } from "./screens/AuthScreen/LoginScreen";
import { RegistrationScreen } from "./screens/AuthScreen/RegistrationScreen";
import { CreatePostsScreen } from "./screens/MainScreen/CreatePostsScreen";

import { HomeScreen } from "./screens/MainScreen/HomeScreen";
import { ProfileScreen } from "./screens/MainScreen/ProfileScreen";

const AuthStack = createNativeStackNavigator();

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
        options={{ headerShown: false }}
        name="Profile"
        component={ProfileScreen}
      />
    </AuthStack.Navigator>
  );
};
