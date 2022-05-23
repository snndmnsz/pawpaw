import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import DatePickerInput from "../../../../components/ui/DatePicker/DatePickerInput";
import Input from "../../../../components/ui/Input/Input";
import Button from "../../../../components/ui/Button/Button";
import { useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { addAMedical } from "../../../../database/tables/medical";
import moment from "moment";

const MedicalAddScreen = ({ navigation }) => {
  const currentPetId = useSelector((state) => state.myPet.currentPetId);

  const [illness, setIllness] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, endStartTime] = useState("");

  const ilnessHandler = (note) => {
    setIllness(note);
  };
  const startTimeHandler = (date) => {
    setStartTime(date);
  };
  const endTimeHandler = (date) => {
    endStartTime(date);
  };

  const medicalDataHandler = () => {
    if (illness === "" || startTime === "" || endTime === "") {
      return Alert.alert("oops...", "Please fill all the fields");
    } else if (startTime > endTime) {
      return Alert.alert("oops...", "Start date should be less than end date");
    } else if (startTime === endTime) {
      return Alert.alert(
        "oops...",
        "Start date and end date should not be same"
      );
    } else if (illness > 20) {
      return Alert.alert(
        "oops...",
        "Please enter illness name less than 20 characters"
      );
    }
    const onlyDateStart = startTime.split(" ");
    const onlyDateEnd = endTime.split(" ");
    if (onlyDateStart > onlyDateEnd) {
      return Alert.alert("oops...", "Start date should be less than end date");
    }
    const timeStart = onlyDateStart[1] + ":00";
    const timeEnd = onlyDateEnd[1] + ":00";
    if (timeStart === "00:00:00" || timeEnd === "00:00:00") {
      return alert("Please select a timeother than 00:00:00");
    }
    const datesStart = moment(new Date(onlyDateStart[0])).format("YYYY-MM-DD");
    const datesEnd = moment(new Date(onlyDateEnd[0])).format("YYYY-MM-DD");

    const formattedDateStringStart = datesStart + "T" + timeStart;
    const formattedDateStringEnd = datesEnd + "T" + timeEnd;

    const todayDateStringMoment = moment()
      .format("YYYY-MM-DD HH:mm:ss")
      .split(" ");
    const todayDateString =
      todayDateStringMoment[0] + "T" + todayDateStringMoment[1];

    addAMedical(
      currentPetId,
      illness,
      todayDateString,
      formattedDateStringStart,
      formattedDateStringEnd
    )
      .then(() => {
        navigation.navigate("MedicalHistory");
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
      <Text style={styles.headerText}>Fill Inputs to add Medical Record</Text>
      <View style={styles.editContainer}>
        <DatePickerInput
          showLabel={true}
          title="Start Date"
          buttonText="Pick Start Date"
          onChange={startTimeHandler}
        />
        <DatePickerInput
          showLabel={true}
          title="End Date"
          buttonText="Pick Start End Date"
          onChange={endTimeHandler}
        />
        <Input
          placeholder="Illness Name"
          type="default"
          label="Illness Name"
          showLabel={false}
          onChange={ilnessHandler}
        />
        <View style={styles.buttonContainer}>
          <Button text="Add Medical Record" onPress={medicalDataHandler} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default MedicalAddScreen;

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
