import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useState } from "react";
import play from "../../../assets/activityImages/play.png";
import Input from "../../../components/ui/Input/Input";
import ClockPicker from "../../../components/ui/ClockPicker/ClockPicker";
import Button from "../../../components/ui/Button/Button";
import MultiLineInput from "../../../components/ui/MultilineInput/MultiLineInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";

const Play = () => {
  const selectedDate = useSelector(
    (state) => state.myPet.calender.selectedDate
  );
  const [note, setNote] = useState("");
  const [time, setTime] = useState("");

  const noteHandler = (note) => {
    setNote(note);
  };

  const clockHandler = (time) => {
    setTime(`${time}:00`);
  };

  const playSubmitHandler = () => {
    const activityFormattedDate = selectedDate.split("T")[0];
    const newActivityDate = new Date(`${activityFormattedDate}T${time}`);
    console.log(newActivityDate);

    if (note.length === 0 || time.length === 0) {
      return alert("Please fill all the fields");
    } else if (note.length > 100) {
      return alert("Please enter a note less than 100 characters");
    }
    console.log(note, "==", time, "==", newActivityDate);
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollContainer}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={play} />
        </View>
        <View style={styles.inputContainer}>
          <MultiLineInput
            placeholder="What the good boi want to play today?"
            type="default"
            label="Note"
            showLabel={false}
            onChange={noteHandler}
          />
          <ClockPicker
            onChange={clockHandler}
            placeHolder="Start Time"
            buttonPlaceHolder="Set Time"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button text="Create Play Activity" onPress={playSubmitHandler} />
        </View>
        <View style={styles.circle}></View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Play;

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
    backgroundColor: "#E6FCF4",
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
    left: 37,
  },
  inputContainer: {
    width: "100%",
  },
  buttonContainer: {
    width: "90%",
    marginTop: 20,
  },
});
