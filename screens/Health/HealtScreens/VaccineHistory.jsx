import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Icons from "react-native-vector-icons/Ionicons";
import DatePickerInput from "../../../components/ui/DatePicker/DatePickerInput";
import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";
import { useIsFocused } from "@react-navigation/native";
import CustomLineChart from "../../../components/ui/charts/LineChart/CustomLineChart";

const DUMMY_DATA = [
  {
    id: 1,
    month: "January",
    date: "13th Wednesday 12:00",
    vaccineName: "Diphtheria",
  },
  {
    id: 2,
    month: "February",
    date: "13th Wednesday 12:00",
    vaccineName: "Diphtheria",
  },
  {
    id: 3,
    month: "February",
    date: "13th Wednesday 12:00",
    vaccineName: "Diphtheria",
  },
  {
    id: 4,
    month: "February",
    date: "13th Wednesday 12:00",
    vaccineName: "Diphtheria",
  },
  {
    id: 5,
    month: "February",
    date: "13th Wednesday 12:00",
    vaccineName: "Diphtheria",
  },
  {
    id: 6,
    month: "February",
    date: "13th Wednesday 12:00",
    vaccineName: "Diphtheria",
  },
  {
    id: 7,
    month: "February",
    date: "13th Wednesday 12:00",
    vaccineName: "Diphtheria",
  },
  {
    id: 8,
    month: "February",
    date: "13th Wednesday 12:00",
    vaccineName: "Diphtheria",
  },
];

const VaccineHistory = ({ route, navigation }) => {
  const isEdit = route.params?.edit;
  const addButton = route.params?.addButton;

  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const nameHandler = (name) => {
    setName(name);
  };
  const timeHandler = (date) => {
    setDate(date);
  };

  const addVaccineHandler = () => {
    if (name.length === 0 || date.length === 0) {
      return alert("Please fill all the fields");
    } else if (name.length > 20) {
      return alert("Please enter a valid name");
    }
    console.log(name, date);
  };

  return (
    <View style={styles.vaccineContainer}>
      <Text style={styles.headerText}>Pet Vaccine History</Text>
      <CustomLineChart />
      {isEdit ? (
        <View style={styles.editContainer}>
          <DatePickerInput
            showLabel={false}
            buttonText="Pick Date and Hour"
            title="Vaccine Date"
            onChange={timeHandler}
          />
          <Input
            placeholder="Vaccine Name"
            type="default"
            label="Vaccine Name"
            showLabel={false}
            onChange={nameHandler}
          />
          <View style={styles.buttonContainer}>
            <Button text="Add Vaccine" onPress={addVaccineHandler} />
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
                <Icons name="analytics-outline" size={20} color="#ffffff" />
              </View>
              <View style={styles.infoContainer}>
                <View style={styles.monthContainer}>
                  <Text style={styles.monthText}>{item.month}</Text>
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>
                <Text style={styles.weightText}>{item.vaccineName}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default VaccineHistory;

const styles = StyleSheet.create({
  vaccineContainer: {
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
    backgroundColor: "#FD5B71",
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
