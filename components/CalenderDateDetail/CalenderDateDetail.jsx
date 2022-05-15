import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import DetailListContainer from "./DayDetail/DetailListContainer";

const CalenderDateDetail = ({ date }) => {
  const dateFormatter = (date) => {
    //format date to  day number day week name
    const dateObj = new Date(date === "" ? new Date() : date);
    const day = dateObj.getDate();
    const dayName = dateObj
      .toLocaleString("en", { weekday: "long" })
      .split(" ")[0];
    return `${day}th ${dayName}`;
  };

  return (
    <View style={styles.detailsContainer}>
      <View style={styles.detailDateContainer}>
        <Text style={styles.dateText}>{dateFormatter(date)}</Text>
        <View style={styles.dateLine}></View>
      </View>
      <DetailListContainer />
    </View>
  );
};

export default CalenderDateDetail;

const styles = StyleSheet.create({
  detailsContainer: {
    height: "100%",
  },
  detailDateContainer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  dateText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#A2AEBE",
  },
  dateLine: {
    width: Dimensions.get("window").width * 0.65,
    height: 2,
    backgroundColor: "#A2AEBE",
  },
});
