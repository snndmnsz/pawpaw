import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import toilet from "../../../assets/activityImages/toilet.png";
import Input from "../../../components/ui/Input/Input";
import ClockPicker from "../../../components/ui/ClockPicker/ClockPicker";
import Button from "../../../components/ui/Button/Button";
import MultiLineInput from "../../../components/ui/MultilineInput/MultiLineInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Toilet = () => {
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollContainer}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={toilet} />
        </View>
        <View style={styles.inputContainer}>
          <MultiLineInput
            placeholder="How was the toilet situation of the good boi?"
            type="default"
            label="Note"
            showLabel={false}
          />
          <ClockPicker placeHolder="Time" buttonPlaceHolder="Set Time" />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text="Create Toilet Activity"
            onPress={() => alert("Toilet Created")}
          />
        </View>
        <View style={styles.circle}></View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Toilet;

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
    top: -430,
    // left: -15,
    backgroundColor: "#F5EEFC",
    position: "absolute",
    zIndex: -1,
  },
  imageContainer: {
    marginTop: 28,
    width: "100%",
    height: 260,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    // width: null,
    // height: null,
    resizeMode: "contain",
    left: 58,
  },
  inputContainer: {
    width: "100%",
  },
  buttonContainer: {
    width: "90%",
    marginTop: 20,
  },
});
