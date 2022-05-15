import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import food from "../../../assets/activityImages/food.png";
import Input from "../../../components/ui/Input/Input";
const Food = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={food} />
      </View>
      <View style={styles.inputs}>
        <Input placeholder="Food" />
      </View>

      <View style={styles.circle}></View>
    </View>
  );
};

export default Food;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    color: "#7D7D7D",
    textAlign: "center",
    fontWeight: "500",
    marginTop: 20,
  },
  circle: {
    width: 700,
    height: 700,
    borderRadius: 700 / 2,
    top: -420,
    backgroundColor: "#FFEFF1",
    position: "absolute",
    zIndex: -1,
  },
  imageContainer: {
    marginTop: 30,
    width: "100%",
    height: 220,
  },
  image: {
    flex: 1,
    // width: null,
    // height: null,
    resizeMode: "contain",
  },
});
