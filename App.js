import { useCallback } from "react";
import { View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Main } from "./components/Main";

import RobotoRegular from "./assets/fonts/Roboto-Regular.ttf";
import RobotoMedium from "./assets/fonts/Roboto-Medium.ttf";
import RobotoBold from "./assets/fonts/Roboto-Bold.ttf";
import Nucleo from "./assets/icommon/Nucleo.ttf";
import glyphMap from "./assets/icommon/unicodesMap.json";
import { createIconSet } from "@expo/vector-icons";

export const Icon = createIconSet(glyphMap, "Nucleo", "nucleo.ttf");

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": RobotoRegular,
    "Roboto-Medium": RobotoMedium,
    "Roboto-Bold": RobotoBold,
    Nucleo: Nucleo,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      const a = await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Provider store={store}>
        <Main />
      </Provider>
    </View>
  );
}
