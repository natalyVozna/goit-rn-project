import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AppLoading from "expo-app-loading";
import RobotoRegular from "./assets/fonts/Roboto-Regular.ttf";
import RobotoMedium from "./assets/fonts/Roboto-Medium.ttf";
import RobotoBold from "./assets/fonts/Roboto-Bold.ttf";
import Nucleo from "./assets/icommon/Nucleo.ttf";

import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";

import { createIconSet } from "@expo/vector-icons";
export const Icon = createIconSet(glyphMap, "Nucleo", "nucleo.ttf");

import glyphMap from "./assets/icommon/unicodesMap.json";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);
  // const routing = useRoute(null);
  const routing = useRoute({});

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
      <NavigationContainer>{routing}</NavigationContainer>
    </View>
  );
}
