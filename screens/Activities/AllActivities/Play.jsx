import { StyleSheet, Text, View, Image, Dimensions, Alert } from "react-native";
import React, { useState } from "react";
import play from "../../../assets/activityImages/play.png";
import cat1 from "../../../assets/activityImages/cat/cat--1.png";
import Input from "../../../components/ui/Input/Input";
import ClockPicker from "../../../components/ui/ClockPicker/ClockPicker";
import Button from "../../../components/ui/Button/Button";
import MultiLineInput from "../../../components/ui/MultilineInput/MultiLineInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { schedulePushNotification } from "../../../utils/notifications"
import { addAnActivity } from "../../../database/tables/activities";

const Play = ({ navigation }) => {
  const selectedDate = useSelector(
    (state) => state.myPet.calender.selectedDate
  );
  const currentPetId = useSelector((state) => state.myPet.currentPetId);
  const petName = useSelector((state) => state.myPet.currentPetInfo.name);
  const spicie = useSelector((state) => state.myPet.currentPetInfo.spicie);
  const [note, setNote] = useState("");
  const [time, setTime] = useState("");

  const noteHandler = (note) => {
    setNote(note);
  };

  const clockHandler = (time) => {
    setTime(`${time}:00`);
  };

  const playSubmitHandler = () => {
    if (note.length === 0 || time.length === 0) {
      return Alert.alert("oops...", "Please fill all the fields");
    } else if (note.length > 100) {
      return Alert.alert(
        "oops...",
        "Please enter a note less than 100 characters"
      );
    }
    const activityFormattedDate = selectedDate.split("T")[0];
    const newActivityDate = `${activityFormattedDate}T${time}`
    ;
    // return console.log(new Date(newActivityDate).getTime());
  

    const playActivity = {
      petId: +currentPetId,
      activityType: "play",
      date: newActivityDate,
      note: note,
      startTime: time,
      endTime: "",
      calorie: "",
      meter: "",
    };
    const datui = new Date(activityFormattedDate);
    addAnActivity(currentPetId, playActivity)
      .then(() => {
        navigation.navigate("ActivitiesMain");
        schedulePushNotification(
          `${petName} has a Play Activity`,
          `Pssttt ${petName} has a play activity now...`,
          datui,
          time
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
            left : spicie === "cat" ? 5 : 37,
          }]} source={spicie === "dog" ? play : cat1} />
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
