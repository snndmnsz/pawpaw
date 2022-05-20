import { StyleSheet, Text, View, FlatList, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import CustomBarChart from "../../../components/ui/charts/BarChart/CustomBarChart";
import Icons from "react-native-vector-icons/Ionicons";
import DatePickerInput from "../../../components/ui/DatePicker/DatePickerInput";
import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";
import { useIsFocused } from "@react-navigation/native";
import {
  getAllWeightbyPetId,
  addWeight,
} from "../../../database/tables/weight";
import { useSelector } from "react-redux";
import moment from "moment";

const WeightHistory = ({ route, navigation }) => {
  let isEdit = route.params?.edit;
  const addButton = route.params?.addButton;
  //console.log(isEdit);

  const [weightData, setWeightData] = useState([]);
  const isFocused = useIsFocused();
  const currentPetId = useSelector((state) => state.myPet.currentPetId);

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
      return Alert.alert("oops...", "Please enter weight and date");
    } else if (isNaN(weitgh)) {
      return Alert.alert("oops...", "Please enter a valid weight");
    } else if (weitgh > 100 || weitgh < 0) {
      return Alert.alert("oops...", "Please enter a valid weight");
    }
    const onlyDate = date.split(" ");
    const time = onlyDate[1] + ":00";
    if (time === "00:00:00") {
      return Alert.alert("oops...", "Please select a timeother than 00:00:00");
    }
    const dates = moment(onlyDate[0]).format("YYYY-MM-DD");
    const formattedDateString = new Date(dates + "T" + time).toISOString();
    console.log(weitgh, date);

    addWeight(currentPetId, weitgh, formattedDateString)
      .then(() => {
        navigation.navigate("WeightHistory");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (isFocused) {
      getAllWeightbyPetId(currentPetId)
        .then((weight) => {
          // sort weight by date
          const sortedWeight = weight.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
          });
          const data = sortedWeight.map((item) => {
            return {
              id: item.id,
              month: moment(item.date).format("MMM"),
              date: moment(item.date).format("Do dddd"),
              weight: parseFloat(item.weight),
            };
          });
          setWeightData(data.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isFocused, isEdit]);

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
          data={weightData}
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
