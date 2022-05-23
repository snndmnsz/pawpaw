import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import DatePickerInput from "../../../../components/ui/DatePicker/DatePickerInput";
import Input from "../../../../components/ui/Input/Input";
import Button from "../../../../components/ui/Button/Button";
import { addWeight } from "../../../../database/tables/weight";
import { useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import moment from "moment";
const WeightAddScreen = ({ navigation }) => {
  const [weitgh, setWeight] = useState(0);
  const [date, setDate] = useState("");
  const currentPetId = useSelector((state) => state.myPet.currentPetId);

  const weightHandler = (weight) => {
    setWeight(+weight);
  };
  const dateHandler = (date) => {
    setDate(date);
  };

  const addWeightHandler = () => {
    if (weitgh === "" || date === "") {
      return Alert.alert("oops...", "Please enter weight and date");
    } else if (isNaN(weitgh)) {
      return Alert.alert("oops...", "Please enter a valid weight");
    } else if (weitgh > 100 || weitgh < 0) {
      return Alert.alert("oops...", "Please enter a valid weight");
    }
    const onlyDate = date.split(" ");
    const time = onlyDate[1] + ":00";
    if (time === "00:00:00") {
      return Alert.alert("oops...", "Please select a timeother than 00:00:00");
    }
    const datui = new Date(onlyDate[0]);
    const dates = moment(datui).format("YYYY-MM-DD");
    const formattedDateString = dates + "T" + time;

    const today = new Date().toISOString().split("T")[0];
    if (dates > today) {
      return Alert.alert(
        "oops...",
        "Please enter a data that is not in the future"
      );
    }

    addWeight(currentPetId, weitgh, formattedDateString)
      .then(() => {
        navigation.navigate("WeightHistory");
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
      <Text style={styles.headerText}>Fill Inputs to add Weight</Text>
      <View style={styles.editContainer}>
        <DatePickerInput
          showLabel={false}
          buttonText="Pick Date and Hour"
          title="Weight Date"
          onChange={dateHandler}
        />
        <Input
          placeholder="Weight (kg)"
          type="numeric"
          label="Weight (kg)"
          showLabel={false}
          onChange={weightHandler}
        />
        <View style={styles.buttonContainer}>
          <Button text="Add Weight" onPress={addWeightHandler} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default WeightAddScreen;

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
