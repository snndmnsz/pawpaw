import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import DetailListContainer from "./DayDetail/DetailListContainer";
import { useSelector } from "react-redux";
import moment from "moment";

const CalenderDateDetail = () => {
  const selectedDate = useSelector(
    (state) => state.myPet.calender.selectedDate
  );


  return (
    <View style={styles.detailsContainer}>
      <View style={styles.detailDateContainer}>
        <Text style={styles.dateText}>
          {moment(new Date(selectedDate)).format("MMM Do")}
        </Text>
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
