import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomCalender from "../../components/Calender/CustomCalender";
import CalenderDateDetail from "../../components/CalenderDateDetail/CalenderDateDetail";

const Activities = () => {
  const [date, setDate] = useState("");
  const selectedDateHandler = (date) => {
    setDate(date);
  };

  return (
    <View style={styles.activityContainer}>
      <View style={styles.calender}>
        <CustomCalender selectedDateFunction={selectedDateHandler} />
      </View>
      <View style={styles.date}>
        <CalenderDateDetail date={date} />
      </View>
    </View>
  );
};

export default Activities;

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    alignitems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
  },
  calender: {
    width: "100%",
    height: "61%",
  },
  date: {
    width: "100%",
    height: "35%",
  },
});
