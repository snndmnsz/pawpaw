import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import CustomBarChart from "../../../components/ui/charts/BarChart/CustomBarChart";
import Icons from "react-native-vector-icons/Ionicons";
import DatePickerInput from "../../../components/ui/DatePicker/DatePickerInput";
import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";
import { useIsFocused } from "@react-navigation/native";

const DUMMY_DATA = [
  {
    id: 1,
    month: "January",
    date: "13th Wednesday",
    weight: "12.5",
  },
  {
    id: 2,
    month: "February",
    date: "13th Wednesday",
    weight: "12.5",
  },
  {
    id: 3,
    month: "February",
    date: "13th Wednesday",
    weight: "12.5",
  },
  {
    id: 4,
    month: "February",
    date: "13th Wednesday",
    weight: "12.5",
  },
  {
    id: 5,
    month: "February",
    date: "13th Wednesday",
    weight: "12.5",
  },
  {
    id: 6,
    month: "February",
    date: "13th Wednesday",
    weight: "12.5",
  },
  {
    id: 7,
    month: "February",
    date: "13th Wednesday",
    weight: "12.5",
  },
  {
    id: 8,
    month: "February",
    date: "13th Wednesday",
    weight: "12.5",
  },
];

const WeightHistory = ({ route, navigation }) => {
  const isEdit = route.params?.edit;
  const addButton = route.params?.addButton;
  //console.log(isEdit);

  const [weitgh, setWeight] = useState(0);
  const [date, setDate] = useState("");

  const weightHandler = (weight) => {
    setWeight(+weight);
  };
  const dateHandler = (date) => {
    setDate(date);
  };

  const addWeightHandler = () => {
    if (weitgh === "" || date === "") {
      alert("Please enter weight and date");
    } else if (isNaN(weitgh)) {
      alert("Please enter a valid weight");
    } else if (weitgh > 100 || weitgh < 0) {
      alert("Please enter a valid weight");
    }
    console.log(weitgh, date);
  };

  return (
    <View style={styles.weightContainer}>
      <Text style={styles.headerText}>Pet Weight History</Text>
      <CustomBarChart title="Weight Stats" />
      {isEdit ? (
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
      ) : (
        <FlatList
          data={DUMMY_DATA}
          contentContainerStyle={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItemContainer}>
              <View style={styles.iconContainer}>
                <Icons name="bar-chart-outline" size={20} color="#ffffff" />
              </View>
              <View style={styles.infoContainer}>
                <View style={styles.monthContainer}>
                  <Text style={styles.monthText}>{item.month}</Text>
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>
                <Text style={styles.weightText}>{item.weight}kg</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default WeightHistory;

const styles = StyleSheet.create({
  weightContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerText: {
    fontSize: 18,
    color: "#7D7D7D",
    textAlign: "center",
    fontWeight: "500",
    marginTop: 8,
  },
  flatList: {
    marginTop: 15,
    paddingHorizontal: 5,
    width: "100%",
  },
  listItemContainer: {
    marginBottom: 5,
    width: "90%",
    minWidth: "90%",
    height: 63,
    borderColor: "#EAEFF5",
    borderRadius: 12,
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2871C8",
    marginRight: 15,
  },
  infoContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  monthContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  monthText: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "bold",
    marginRight: 5,
  },
  dateText: {
    fontSize: 14,
    color: "#4F4F4F",
  },
  weightText: {
    marginTop: 3,
    fontSize: 16,
    color: "#828282",
    fontWeight: "500",
  },
  buttonContainer: {
    marginTop: 35,
  },
});
