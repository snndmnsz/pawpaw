import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import DatePickerInput from "../../../../components/ui/DatePicker/DatePickerInput";
import Input from "../../../../components/ui/Input/Input";
import Button from "../../../../components/ui/Button/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { addVet } from "../../../../database/tables/vet";
import { useSelector } from "react-redux";
import moment from "moment";
import { addAnActivity } from "../../../../database/tables/activities";

import { schedulePushNotification } from "../../../../utils/notifications";

const VetAddScreen = ({ navigation }) => {
  const currentPetId = useSelector((state) => state.myPet.currentPetId);
  const petName = useSelector((state) => state.myPet.currentPetInfo.name);
  const [date, setDate] = useState("");

  const timeHandler = (date) => {
    setDate(date);
  };

  const vetAddHandler = () => {
    if (date === "") {
      return Alert.alert("oops...", "Please select a date");
    }
    const onlyDate = date.split(" ");
    const time = onlyDate[1] + ":00";
    if (time === "00:00:00") {
      return Alert.alert("oops...", "Please select a timeother than 00:00:00");
    }

    const datui = new Date(onlyDate[0]);
    const dates = moment(datui).format("YYYY-MM-DD");
    const formattedDateString = dates + "T" + time;

    const vetActivityData = {
      petId: currentPetId,
      activityType: "vet",
      date: formattedDateString,
      note: "Veterinary Appointment",
      startTime: time,
      endTime: "",
      calorie: "",
      meter: "",
    };
    addVet(currentPetId, formattedDateString)
      .then(() => {
        addAnActivity(currentPetId, vetActivityData)
          .then((res) => {
            navigation.navigate("VetAppoitments");
            schedulePushNotification(
              `${petName} has a Vet Appointment`,
              "Pssttt Vet Appointment is now...",
              datui,
              time
            );
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <Text style={styles.headerText}>Fill Inputs to add Vet Appointment</Text>
      <View style={styles.editContainer}>
        <DatePickerInput
          showLabel={true}
          title="Vet Appoitment Date"
          buttonText="Pick Date and Hour"
          onChange={timeHandler}
        />
        <View style={styles.buttonContainer}>
          <Button text="Add Vet Appointment" onPress={vetAddHandler} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default VetAddScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#FFFFFF",
  },
  headerText: {
    fontSize: 20,
    color: "#7D7D7D",
    textAlign: "center",
    fontWeight: "500",
    marginTop: 20,
  },
  scrollView: {
    height: "100%",
    marginTop: 15,
    // marginBottom: 20,
  },
  editContainer: {
    marginTop: 25,
  },
  buttonContainer: {
    marginTop: 45,
  },
});
