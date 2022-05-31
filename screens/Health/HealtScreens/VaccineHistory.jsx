import { StyleSheet, Text, View, FlatList, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Icons from "react-native-vector-icons/Ionicons";
import DatePickerInput from "../../../components/ui/DatePicker/DatePickerInput";
import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";
import { useIsFocused } from "@react-navigation/native";
import CustomLineChart from "../../../components/ui/charts/LineChart/CustomLineChart";

import { getAllVaccinebyPetId } from "../../../database/tables/vaccine";

import { useSelector } from "react-redux";
import moment from "moment";

const VaccineHistory = () => {
  const [vaccineData, setVaccineData] = useState([]);
  const isFocused = useIsFocused();
  const currentPetId = useSelector((state) => state.myPet.currentPetId);

  useEffect(() => {
    if (isFocused) {
      getAllVaccinebyPetId(currentPetId)
        .then((vaccine) => {
          // sort weight by date
          const sortedVaccine = vaccine.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
          });
          const data = sortedVaccine.map((item) => {
            return {
              id: item.id,
              month: moment(item.date).format("MMM"),
              date: moment(item.date).format("Do dddd"),
              vaccineName: item.vaccineName,
            };
          });
          setVaccineData(data.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isFocused,currentPetId]);

  return (
    <View style={styles.vaccineContainer}>
      <Text style={styles.headerText}>Pet Vaccine History</Text>
      <CustomLineChart />

      <FlatList
        data={vaccineData}
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
