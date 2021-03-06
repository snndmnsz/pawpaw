import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  TouchableHighlight,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icons from "react-native-vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";
import CustomBarChart from "../../../components/ui/charts/BarChart/CustomBarChart";
import { getAllVetbyPetId } from "../../../database/tables/vet";
import { useSelector } from "react-redux";
import moment from "moment";
import { deleteAVet } from "../../../database/tables/vet";

const VetAppoitments = () => {
  const [vetData, setVetData] = useState([]);
  const isFocused = useIsFocused();
  const currentPetId = useSelector((state) => state.myPet.currentPetId);

  useEffect(() => {
    if (isFocused) {
      getAllVetbyPetId(currentPetId)
        .then((vet) => {
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
  }, [isFocused, currentPetId]);

  const onLongPressButton = (id) => {
    Alert.alert(
      "Delete Vet Appointment",
      "Are you sure you want to delete this vet appointment?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "DELETE",
          onPress: () => {
            deleteAVet(id)
              .then(() => {
                const deleteFormVetData = vetData.filter((item) => {
                  return item.id !== id;
                });
                setVetData(deleteFormVetData);
              })
              .catch((err) => {
                console.log(err);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.vetContainer}>
      <Text style={styles.headerText}>Pet Vet Appoitments</Text>
      <CustomBarChart title="Vet Appoitments" />
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
          <TouchableHighlight
            onLongPress={() => {
              onLongPressButton(item.id);
            }}
            underlayColor="#FAFAFA"
            style={{
              width: "100%",
            }}
          >
            <View
              style={[
                styles.listItemContainer,
                {
                  borderLeftColor: "#1DA8B1",
                  borderRightColor: "#1DA8B1",
                  borderBottomColor: "#F8F8F8",
                  borderTopColor: "#F8F8F8",
                  borderTopWidth: 2,
                  borderRightWidth: 3,
                  borderBottomWidth: 2,
                  borderLeftWidth: 3,
                },
              ]}
            >
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
          </TouchableHighlight>
        )}
      />
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
    // borderColor: "#EAEFF5",
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
