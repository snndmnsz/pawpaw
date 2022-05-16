import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect } from "react";
import Icons from "react-native-vector-icons/Ionicons";
import DatePickerInput from "../../../components/ui/DatePicker/DatePickerInput";
import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";
import { useIsFocused } from "@react-navigation/native";
import CustomBarChart from "../../../components/ui/charts/BarChart/CustomBarChart";

const DUMMY_DATA = [
  {
    id: 1,
    month: "January",
    date: "13th Wednesday",
    time: "12:00",
  },
  {
    id: 2,
    month: "February",
    date: "13th Wednesday",
    time: "12:00",
  },
  {
    id: 3,
    month: "February",
    date: "13th Wednesday",
    time: "12:00",
  },
  {
    id: 4,
    month: "February",
    date: "13th Wednesday",
    time: "12:00",
  },
  {
    id: 5,
    month: "February",
    date: "13th Wednesday",
    time: "12:00",
  },
  {
    id: 6,
    month: "February",
    date: "13th Wednesday",
    time: "12:00",
  },
  {
    id: 7,
    month: "February",
    date: "13th Wednesday",
    time: "12:00",
  },
  {
    id: 8,
    month: "February",
    date: "13th Wednesday",
    time: "12:00",
  },
];

const VetAppoitments = ({ route, navigation }) => {
  const isEdit = route.params?.edit;
  const addButton = route.params?.addButton;
  return (
    <View style={styles.vetContainer}>
      <Text style={styles.headerText}>Pet Vet Appoitments</Text>
      <CustomBarChart title="Vet Appoitments" />
      {isEdit ? (
        <View style={styles.editContainer}>
          <DatePickerInput
            showLabel={true}
            customLabel="Vet Hours and Date"
            buttonText="Pick Date and Hour"
          />
          <View style={styles.buttonContainer}>
            <Button text="Add Vet Appointment" />
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
                <Icons name="paw" size={20} color="#ffffff" />
              </View>
              <View style={styles.infoContainer}>
                <View style={styles.monthContainer}>
                  <Text style={styles.monthText}>{item.month}</Text>
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>
                <Text style={styles.weightText}>{item.time}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default VetAppoitments;

const styles = StyleSheet.create({
  vetContainer: {
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
    backgroundColor: "#1DA8B1",
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
  editContainer: {
    marginTop: 35,
  },
});
