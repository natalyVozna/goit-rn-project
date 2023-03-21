import React from "react";
import { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { BackBtn } from "../../components/BackBtn";

export const MapScreen = ({ navigation, route }) => {
  const { latitude, longitude } = route.params.item;

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => <BackBtn onPress={() => navigation.goBack()} />,
    });
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: latitude ? latitude : 50.51639,
          longitude: longitude ? longitude : 30.602185,
          // latitude: 50.51639,
          // longitude: 30.602185,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        // mapType="standard"
        // minZoomLevel={15}
      >
        <Marker
          title="I am here"
          coordinate={{
            latitude: latitude ? latitude : 50.51639,
            longitude: longitude ? longitude : 30.602185,
          }}
          description="Hello"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    // alignItems: "flex-start",
    // paddingHorizontal: 16,
    // paddingVertical: 32,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
