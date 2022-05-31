import { StyleSheet, Text, View, Image, Dimensions, Alert } from "react-native";
import React, { useState } from "react";
import food from "../../../assets/activityImages/food.png";
import cat2 from "../../../assets/activityImages/cat/cat--2.png";
import Input from "../../../components/ui/Input/Input";
import ClockPicker from "../../../components/ui/ClockPicker/ClockPicker";
import Button from "../../../components/ui/Button/Button";
import MultiLineInput from "../../../components/ui/MultilineInput/MultiLineInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { schedulePushNotification } from "../../../utils/notifications"
import { addAnActivity } from "../../../database/tables/activities";

const Food = ({ navigation }) => {
  const selectedDate = useSelector(
    (state) => state.myPet.calender.selectedDate
  );
  const currentPetId = useSelector((state) => state.myPet.currentPetId);
  const petName = useSelector((state) => state.myPet.currentPetInfo.name);
  const spicie = useSelector((state) => state.myPet.currentPetInfo.spicie);

  const [note, setNote] = useState("");
  const [time, setTime] = useState("");
  const [calorie, setCalorie] = useState("");

  const noteHandler = (note) => {
    setNote(note);
  };

  const clockHandler = (time) => {
    setTime(`${time}:00`);
  };

  const caloriehandler = (calorie) => {
    setCalorie(calorie);
  };

  const foodSubmithandler = () => {
    if (note.length === 0 || time.length === 0 || calorie.length === 0) {
      return Alert.alert("oops...", "Please fill all the fields");
    } else if (calorie < 0) {
      return Alert.alert("oops...", "Please enter a valid calorie more than 0");
    } else if (calorie > 5000) {
      return Alert.alert("oops...", "Please enter a calorie less than 5000");
    } else if (note.length > 100) {
      return Alert.alert(
        "oops...",
        "Please enter a note less than 100 characters"
      );
    }
    const activityFormattedDate = selectedDate.split("T")[0];
    const newActivityDate = `${activityFormattedDate}T${time}`;

    const foodActivity = {
      petId: +currentPetId,
      activityType: "food",
      date: newActivityDate,
      note: note,
      startTime: time,
      endTime: "",
      calorie: calorie,
      meter: "",
    };
    const datui = new Date(activityFormattedDate);
    addAnActivity(currentPetId, foodActivity)
      .then(() => {
        navigation.navigate("ActivitiesMain");
        schedulePushNotification(
          `${petName} has a Food Activity`,
          `Pssttt ${petName} has a food activity now...`,
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
          <Image
            style={[
              styles.image,
              {
                left: spicie === "cat" ? -150 : 17,
              },
            ]}
            source={spicie === "dog" ? food : cat2}
          />
        </View>
        <View style={styles.inputContainer}>
          <MultiLineInput
            placeholder="What did the good boi eat today?"
            type="default"
            label="Note"
            showLabel={false}
            onChange={noteHandler}
          />
          <ClockPicker
            placeHolder="Start Time"
            buttonPlaceHolder="Set Time"
            onChange={clockHandler}
          />
          {/* <ClockPicker placeHolder="End Time" buttonPlaceHolder="Set Time" /> */}
          <Input
            placeholder="Calorie (cal)"
            type="numeric"
            label=""
            showLabel={false}
            onChange={caloriehandler}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button text="Create Food Activity" onPress={foodSubmithandler} />
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
    marginTop: 20,
  },
  buttonContainer: {
    width: "90%",
    marginTop: 20,
  },
});
