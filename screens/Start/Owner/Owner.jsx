import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import image from "../../../assets/images/owner.png";
import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Owner = () => {
  return (
    <KeyboardAwareScrollView
      style={styles.ownerPageContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.circle}></View>
      <Text style={styles.headerText}>Please Fill Your Info</Text>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={image} />
      </View>
      <Input
        placeholder="Your Name and Surname"
        type="default"
        label="Name Surname"
      />
      <View style={styles.buttonContainer}>
        <Button text="Finish" />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Owner;

const styles = StyleSheet.create({
  ownerPageContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    position: "relative",
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
    backgroundColor: "#FEE8DC",
    position: "absolute",
    top: -320,
    left: -158,
    margin: "auto",
    zIndex: -1,
  },
  imageContainer: {
    marginTop: 20,
    width: "100%",
    height: 345,
    aliginItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 345,
    left: 40,
  },
  buttonContainer: {
    widht: "100%",
    marginTop: 30,
    marginBottom: 95,
    paddingHorizontal: 20,
    flexDirection: "column",
  },
});
