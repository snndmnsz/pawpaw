import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import food from "../../../assets/activityImages/food.png";
import Input from "../../../components/ui/Input/Input";
import ClockPicker from "../../../components/ui/ClockPicker/ClockPicker";
import Button from "../../../components/ui/Button/Button";
import MultiLineInput from "../../../components/ui/MultilineInput/MultiLineInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Food = () => {
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollContainer}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={food} />
        </View>
        <View style={styles.inputContainer}>
          <MultiLineInput
            placeholder="What did the good boi eat today?"
            type="default"
            label="Note"
            showLabel={false}
          />
          <ClockPicker placeHolder="Start Time" buttonPlaceHolder="Set Time" />
          {/* <ClockPicker placeHolder="End Time" buttonPlaceHolder="Set Time" /> */}
          <Input
            placeholder="Calorie (cal)"
            type="numeric"
            label=""
            showLabel={false}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text="Create Food Activity"
            onPress={() => alert("Activity Created")}
          />
        </View>
        <View style={styles.circle}></View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Food;

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
  inputContainer: {
    width: "100%",
  },
  buttonContainer: {
    width: "90%",
    marginTop: 20,
  },
});
