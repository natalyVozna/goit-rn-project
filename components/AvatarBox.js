import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const AvatarBox = () => {
  return (
    <View
      style={{
        ...styles.container,
        left: Dimensions.get("window").width / 2 - 60,
      }}
    >
      <View style={styles.cover}></View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.btn}
        // onPress={console.log("press")}
      >
        <Text style={styles.btnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: -60,
  },
  cover: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  btn: {
    position: "absolute",
    bottom: 14,
    right: -12,
    width: 25,
    height: 25,
    backgroundColor: "#fff",
    borderColor: "#FF6C00",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  btnText: {
    color: "#FF6C00",
    fontSize: 16,
    position: "relative",
    bottom: 1,
  },
});
