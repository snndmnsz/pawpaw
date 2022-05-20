import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomCalender from "../../components/Calender/CustomCalender";
import CalenderDateDetail from "../../components/CalenderDateDetail/CalenderDateDetail";

const Activities = () => {
  return (
    <View style={styles.activityContainer}>
      <View style={styles.calender}>
        <CustomCalender />
      </View>
      <View style={styles.date}>
        <CalenderDateDetail />
      </View>
    </View>
  );
};

export default Activities;

const styles = StyleSheet.create({
  activityContainer: {
    // flex: 1,
    alignitems: "center",
    // justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "100%",
  },
  calender: {
    // width: "100%",
    // height: "61%",
    // flex: 1,

    flexShrink: 1,
  },
  date: {
    flex: 1,
    // width: "100%",
    // height: "35%",
  },
});
