import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogOutBtn } from "../../components/LogoutBtn";
import { CommentsScreen } from "../NestedScreens/CommentsScreen";
import { DefaultScreenPosts } from "../NestedScreens/DefaultScreenPosts";
import { MapScreen } from "../NestedScreens/MapScreen";

const NestedScreen = createNativeStackNavigator();

export const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        options={{
          title: "Публикации",
          headerRight: (props) => <LogOutBtn />,
        }}
        name="DefaultScreen"
        component={DefaultScreenPosts}
      />
      {/* <NestedScreen.Screen
        options={{ title: "Комментарии" }}
        name="Comments"
        component={CommentsScreen}
      /> */}
      <NestedScreen.Screen
        options={{ title: "Карта" }}
        name="Map"
        component={MapScreen}
      />
    </NestedScreen.Navigator>
  );
};
