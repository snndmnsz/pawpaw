import { StyleSheet, Text, View, FlatList, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Icons from "react-native-vector-icons/Ionicons";
import DatePickerInput from "../../../components/ui/DatePicker/DatePickerInput";
import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";
import { useIsFocused } from "@react-navigation/native";
import CustomStackedBarChart from "../../../components/ui/charts/StackedBarChart/CustomStackedBarChart";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  getAllMedicalbyPetId,
  addAMedical,
} from "../../../database/tables/medical";
import { useSelector } from "react-redux";
import moment from "moment";

const MedicalHistory = ({ route, navigation }) => {
  const isEdit = route.params?.edit;
  const addButton = route.params?.addButton;

  const [medicalData, setMedicalData] = useState([]);
  const isFocused = useIsFocused();
  const currentPetId = useSelector((state) => state.myPet.currentPetId);

  const [illness, setIllness] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, endStartTime] = useState("");

  const ilnessHandler = (note) => {
    setIllness(note);
  };
  const startTimeHandler = (date) => {
    setStartTime(date);
  };
  const endTimeHandler = (date) => {
    endStartTime(date);
  };

  const medicalDataHandler = () => {
    if (illness === "" || startTime === "" || endTime === "") {
      return Alert.alert("oops...","Please fill all the fields");
    } else if (startTime > endTime) {
      return Alert.alert("oops...","Start date should be less than end date");
    } else if (startTime === endTime) {
      return Alert.alert("oops...","Start date and end date should not be same");
    } else if (illness > 20) {
      return Alert.alert("oops...","Please enter illness name less than 20 characters");
    }
    console.log(illness, startTime, endTime);

    const onlyDateStart = startTime.split(" ");
    const onlyDateEnd = endTime.split(" ");
    const timeStart = onlyDateStart[1] + ":00";
    const timeEnd = onlyDateEnd[1] + ":00";
    if (timeStart === "00:00:00" || timeEnd === "00:00:00") {
      return alert("Please select a timeother than 00:00:00");
    }
    const datesStart = moment(onlyDateStart[0]).format("YYYY-MM-DD");
    const datesEnd = moment(onlyDateEnd[0]).format("YYYY-MM-DD");
    const formattedDateStringStart = new Date(
      datesStart + "T" + timeStart
    ).toISOString();
    const formattedDateStringEnd = new Date(
      datesEnd + "T" + timeEnd
    ).toISOString();
    const todayDateString = new Date().toISOString();
    addAMedical(
      currentPetId,
      illness,
      todayDateString,
      formattedDateStringStart,
      formattedDateStringEnd
    )
      .then(() => {
        navigation.navigate("MedicalHistory");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (isFocused) {
      getAllMedicalbyPetId(currentPetId)
        .then((medical) => {
          const sortedMedical = medical.sort((a, b) => {
            return new Date(a.startDate) - new Date(b.startDate);
          });
          const data = sortedMedical.map((item) => {
            return {
              id: item.id,
              startDate: moment(item.startDate).format("DD/MM/YYYY"),
              endDate: moment(item.endDate).format("DD/MM/YYYY"),
              illness: item.medicalName,
            };
          });
          setMedicalData(data.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isFocused, isEdit]);

  return (
    <View style={styles.medicalContainer}>
      <Text style={styles.headerText}>Pet Medical History</Text>
      <CustomStackedBarChart />
      {isEdit ? (
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={styles.editContainer}
        >
          <DatePickerInput
            showLabel={true}
            title="Start Date"
            buttonText="Pick Start Date"
            onChange={startTimeHandler}
          />
          <DatePickerInput
            showLabel={true}
            title="End Date"
            buttonText="Pick Start End Date"
            onChange={endTimeHandler}
          />
          <Input
            placeholder="Illness Name"
            type="default"
            label="Illness Name"
            showLabel={false}
            onChange={ilnessHandler}
          />
          <View style={styles.buttonContainer}>
            <Button text="Add Medical History" onPress={medicalDataHandler} />
          </View>
        </KeyboardAwareScrollView>
      ) : (
        <FlatList
          data={medicalData}
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
                <Icons name="stats-chart-outline" size={21} color="#ffffff" />
              </View>
              <View style={styles.infoContainer}>
                <View style={styles.monthContainer}>
                  <Text style={styles.monthText}>{item.startDate}</Text>
                  <Text> to </Text>
                  <Text style={styles.monthText}>{item.endDate}</Text>
                </View>
                <Text style={styles.weightText}>{item.illness}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default MedicalHistory;

const styles = StyleSheet.create({
  medicalContainer: {
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
    backgroundColor: "#FFA556",
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
    fontSize: 14,
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
    fontSize: 15,
    color: "#828282",
    fontWeight: "500",
  },
  buttonContainer: {
    marginTop: 15,
    marginBottom: 15,
  },
});
