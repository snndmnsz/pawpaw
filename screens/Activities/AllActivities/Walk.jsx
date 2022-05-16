import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import walk from "../../../assets/activityImages/walk.png";
const Walk = () => {
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollContainer}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={walk} />
        </View>
        <View style={styles.circle}></View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Walk;

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  circle: {
    width: 700,
    height: 700,
    borderRadius: 700 / 2,
    top: -440,
    // left: -15,
    backgroundColor: "#FEE8DC",
    position: "absolute",
    zIndex: -1,
  },
  imageContainer: {
    marginTop: 30,
    width: "100%",
    height: 220,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    // width: null,
    // height: null,
    resizeMode: "contain",
    left: 22,
  },
});
