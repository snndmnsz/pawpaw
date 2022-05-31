import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useState } from "react";
import sleep from "../../../assets/activityImages/sleep.png";
import cat4 from "../../../assets/activityImages/cat/cat--4.png";
import Input from "../../../components/ui/Input/Input";
import ClockPicker from "../../../components/ui/ClockPicker/ClockPicker";
import Button from "../../../components/ui/Button/Button";
import MultiLineInput from "../../../components/ui/MultilineInput/MultiLineInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { schedulePushNotification } from "../../../utils/notifications"
import { addAnActivity } from "../../../database/tables/activities";

const Sleep = ({ navigation }) => {
  const selectedDate = useSelector(
    (state) => state.myPet.calender.selectedDate
  );
  const currentPetId = useSelector((state) => state.myPet.currentPetId);
  const petName = useSelector((state) => state.myPet.currentPetInfo.name);
  const spicie = useSelector((state) => state.myPet.currentPetInfo.spicie);
  const [note, setNote] = useState("");
  const [bedTime, setBedTime] = useState("");
  const [wakeupTime, setWakeupTime] = useState("");

  const noteHandler = (note) => {
    setNote(note);
  };

  const wakeUpHandler = (time) => {
    setWakeupTime(`${time}:00`);
  };

  const bedTimeHandler = (time) => {
    setBedTime(`${time}:00`);
  };

  const sleepSubmitHandler = () => {
    if (note.length === 0 || bedTime.length === 0 || wakeupTime.length === 0) {
      return Alert.alert("oops...", "Please fill all the fields");
    } else if (note.length > 100) {
      return Alert.alert(
        "oops...",
        "Please enter a note less than 100 characters"
      );
    }
    const activityFormattedDate = selectedDate.split("T")[0];
    const newActivityDate = `${activityFormattedDate}T${bedTime}`;

    // console.log(newActivityDate);
    const sleepActivity = {
      petId: +currentPetId,
      activityType: "sleep",
      date: newActivityDate,
      note: note,
      startTime: bedTime,
      endTime: wakeupTime,
      calorie: "",
      meter: "",
    };
    const datui = new Date(activityFormattedDate);
    addAnActivity(currentPetId, sleepActivity)
      .then(() => {
        navigation.navigate("ActivitiesMain");
        schedulePushNotification(
          `${petName} has a Sleep Activity`,
          `Pssttt ${petName} has a sleep activity now...`,
          datui,
          bedTime
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollContainer}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={[styles.image,{
             left : spicie === "cat" ? 4 : 37,
          }]} source={spicie === "dog" ? sleep : cat4} />
        </View>
        <View style={styles.inputContainer}>
          <MultiLineInput
            placeholder="How was the sleep of the good boi?"
            type="default"
            label="Note"
            showLabel={false}
            onChange={noteHandler}
          />
          <ClockPicker
            onChange={bedTimeHandler}
            placeHolder="Bed Time"
            buttonPlaceHolder="Set Time"
          />
          <ClockPicker
            onChange={wakeUpHandler}
            placeHolder="Wake Up Time"
            buttonPlaceHolder="Set Time"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button text="Create Sleep Activity" onPress={sleepSubmitHandler} />
        </View>
        <View style={styles.circle}></View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Sleep;

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
    top: -450,
    // left: -15,
    backgroundColor: "#E6EDFA",
    position: "absolute",
    zIndex: -1,
  },
  imageContainer: {
    marginTop: 20,
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
