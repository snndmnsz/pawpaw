import { StyleSheet, Text, View, FlatList ,Alert} from "react-native";
import React, { useEffect, useState } from "react";
import Icons from "react-native-vector-icons/Ionicons";
import DatePickerInput from "../../../components/ui/DatePicker/DatePickerInput";
import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";
import { useIsFocused } from "@react-navigation/native";
import CustomBarChart from "../../../components/ui/charts/BarChart/CustomBarChart";

import { getAllVetbyPetId, addVet } from "../../../database/tables/vet";
import { addAnActivity } from "../../../database/tables/activities";
import { useSelector } from "react-redux";
import moment from "moment";

const VetAppoitments = ({ route, navigation }) => {
  const isEdit = route.params?.edit;
  const addButton = route.params?.addButton;

  const [vetData, setVetData] = useState([]);
  const isFocused = useIsFocused();
  const currentPetId = useSelector((state) => state.myPet.currentPetId);

  const [date, setDate] = useState("");

  const timeHandler = (date) => {
    setDate(date);
  };

  const vetAddHandler = () => {
    if (date === "") {
      return Alert.alert("oops...","Please select a date");
    }
    const onlyDate = date.split(" ");
    const time = onlyDate[1] + ":00";
    if (time === "00:00:00") {
      return Alert.alert("oops...","Please select a timeother than 00:00:00");
    }
    const dates = moment(onlyDate[0]).format("YYYY-MM-DD");
    const formattedDateString = new Date(dates + "T" + time).toISOString();
    const vetActivityData = {
      petId: currentPetId,
      activityType: "vet",
      date: formattedDateString,
      note: "Veterinary Appointment",
      startTime: time,
      endTime: "",
      calorie: "",
      meter: "",
    };

    addVet(currentPetId, formattedDateString)
      .then(() => {
        addAnActivity(currentPetId, vetActivityData)
          .then((res) => {
            navigation.navigate("VetAppoitments");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (isFocused) {
      getAllVetbyPetId(currentPetId)
        .then((vet) => {
          // sort weight by date
          const sortedVet = vet.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
          });
          const data = sortedVet.map((item) => {
            return {
              id: item.id,
              month: moment(item.date).format("MMM"),
              date: moment(item.date).format("Do dddd"),
              time: moment(item.date).format("HH:mm"),
            };
          });
          setVetData(data.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isFocused, isEdit]);

  return (
    <View style={styles.vetContainer}>
      <Text style={styles.headerText}>Pet Vet Appoitments</Text>
      <CustomBarChart title="Vet Appoitments" />
      {isEdit ? (
        <View style={styles.editContainer}>
          <DatePickerInput
            showLabel={true}
            title="Vet Appoitment Date"
            buttonText="Pick Date and Hour"
            onChange={timeHandler}
          />
          <View style={styles.buttonContainer}>
            <Button text="Add Vet Appointment" onPress={vetAddHandler} />
          </View>
        </View>
      ) : (
        <FlatList
          data={vetData}
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
