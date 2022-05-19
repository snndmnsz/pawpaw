import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import dog from "../../../assets/images/dog-ex.png";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedDate } from "../../../redux/slice/myPetSlice";
import moment from "moment";

export const CustomMainHeaderLeft = ({ isNameVisible }) => {
  const currentPetInfo = useSelector((state) => state.myPet.currentPetInfo);
  return (
    <View style={styles.leftContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={dog} />
      </View>
      {isNameVisible && (
        <View style={styles.leftTextContainer}>
          <Text style={styles.spicie}>{currentPetInfo.breed}</Text>
          <Text style={styles.name}>{currentPetInfo.name}</Text>
        </View>
      )}
    </View>
  );
};

export const CustomMainHeaderRight = ({ navigation }) => {
  const currentDay = moment().format("ddd");
  const currentDayNumber = moment().format("D");
  const date = new Date().toISOString();
  const dispatch = useDispatch();

  const pressHandler = () => {
    navigation.navigate("Activities", {
      screen: "NewActivity",
    });
    dispatch(setSelectedDate(date));
  };

  return (
    <View style={styles.rightContainer}>
      <TouchableOpacity
        style={styles.rightDateContainer}
        activeOpacity={0.7}
        onPress={pressHandler}
      >
        <Text style={styles.date}>{currentDayNumber}</Text>
        <Text style={styles.day}>{currentDay}</Text>
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
    height: "58%",
    justifyContent: "center",
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
