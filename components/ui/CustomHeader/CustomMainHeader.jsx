import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import dog from "../../../assets/images/dog-ex.png";

export const CustomMainHeaderLeft = ({ isNameVisible }) => {
  return (
    <View style={styles.leftContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={dog} />
      </View>
      {isNameVisible && (
        <View style={styles.leftTextContainer}>
          <Text style={styles.spicie}>German Shepherd</Text>
          <Text style={styles.name}>Maximus</Text>
        </View>
      )}
    </View>
  );
};

export const CustomMainHeaderRight = ({ dateIconpressHandler }) => {
  const date = new Date();
  const day = date.getDate();
  const dayShort = date
    .toLocaleString("en-us", {
      weekday: "short",
    })
    .split(" ")[0];
  return (
    <View style={styles.rightContainer}>
      <TouchableOpacity
        style={styles.rightDateContainer}
        activeOpacity={0.7}
        onPress={dateIconpressHandler}
      >
        <Text style={styles.date}>{day}</Text>
        <Text style={styles.day}>{dayShort}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rightDateContainer: {
    right: 20,
    width: 55,
    height: 55,
    borderRadius: 12,
    borderColor: "#EAEFF5",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  date: {
    color: "#434343",
    fontWeight: "bold",
    fontSize: 25,
  },
  day: {
    color: "#9CA9B9",
    fontSize: 13,
  },
  leftContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    left: Platform.OS === "android" ? 5 : 25,
  },
  imageContainer: {
    // left: 20,
    width: 70,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30 / 2,
    borderColor: "#EAEFF3",
    borderWidth: 2,
  },
  leftTextContainer: {
    // left: Platform.OS === "android" ? 5 : 25,
    height: "50%",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  spicie: {
    fontSize: 12,
    color: "#7D7D7D",
  },
  name: {
    fontWeight: "bold",
    fontSize: 35,
    color: "#1E1E1E",
  },
});
