import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import dog from "../../../assets/images/photoDog.png";

const Photo = () => {
  return (
    <View style={styles.photoContainer}>
      <View style={styles.boxContainer}>
        <Image source={dog} style={styles.image} />
        <Text style={styles.photoText}>Upload Photo</Text>
      </View>
    </View>
  );
};

export default Photo;

const styles = StyleSheet.create({
  photoContainer: {
    width: "100%",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  boxContainer: {
    backgroundColor: "#F8FAFD",
    borderRadius: 1,
    width: 120,
    height: 120,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {},
  photoText: {
    paddingTop: 10,
    fontSize: 14,
    color: "#A7B0C0",
    textAlign: "center",
    fontWeight: "600",
  },
});
