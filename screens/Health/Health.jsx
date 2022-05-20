import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import medical from "../../assets/healthImages/medical.png";
import vaccine from "../../assets/healthImages/vaccine.png";
import vet from "../../assets/healthImages/vet.png";
import weight from "../../assets/healthImages/weight.png";
import UpcomingHealthEvents from "../../components/UpcomingHealthEvents/UpcomingHealthEvents";

const listData = [
  {
    id: 1,
    title: "Vaccine History",
    image: vaccine,
    backgroundColor: "#FD5B71",
    bg: "#FFF1F3",
    borderColor: "#FFEAED",
  },
  {
    id: 2,
    title: "Medical History",
    image: medical,
    backgroundColor: "#FFA556",
    bg: "#FFF7F0",
    borderColor: "#FFF4EA",
  },
  {
    id: 3,
    title: "Vet Appointments",
    image: vet,
    backgroundColor: "#1DA8B1",
    bg: "#E0ECED",
    borderColor: "#DAECED",
  },
  {
    id: 4,
    title: "Weight History",
    image: weight,
    backgroundColor: "#8991FB",
    bg: "#F1F2FF",
    borderColor: "#EDEEFF",
  },
];

const Health = ({ navigation }) => {
  return (
    <View style={styles.healtContainer}>
      <Text style={styles.headerText}>Pet Health Calender</Text>
      <UpcomingHealthEvents />
      <View style={styles.flatListContainer}>
        <FlatList
          data={listData}
          // contentContainerStyle={{
          //   alignItems: "center",
          //   justifyContent: "center",
          //   width: "100%",
          // }}
          style={styles.flatList}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                if (item.id === 1) {
                  navigation.navigate("VaccineHistory");
                } else if (item.id === 2) {
                  navigation.navigate("MedicalHistory");
                } else if (item.id === 3) {
                  navigation.navigate("VetAppoitments");
                } else if (item.id === 4) {
                  navigation.navigate("WeightHistory");
                }
              }}
              activeOpacity={0.8}
              style={[
                styles.listItemContainer,
                {
                  backgroundColor: item.bg,
                  borderWidth: 2,
                  borderColor: item.borderColor,
                },
              ]}
            >
              <View
                style={[
                  styles.imageContainer,
                  {
                    backgroundColor: item.backgroundColor,
                  },
                ]}
              >
                <Image
                  style={[
                    styles.image,
                    {
                      width: item.title === "Vaccine History" ? 39 : 30,
                      height: item.title === "Vaccine History" ? 39 : 30,
                    },
                  ]}
                  source={item.image}
                />
              </View>
              <View style={styles.textContainer}>
                <Text
                  style={[
                    styles.title,
                    {
                      color: item.backgroundColor,
                    },
                  ]}
                >
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Health;

const styles = StyleSheet.create({
  healtContainer: {
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  headerText: {
    fontSize: 20,
    color: "#7D7D7D",
    textAlign: "center",
    fontWeight: "500",
    marginTop: 8,
    marginBottom: 8,
  },
  flatListContainer: {
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    // width: "100%",
  },
  flatList: {
    width: "100%",
    marginTop: 10,
  },
  listItemContainer: {
    margin: 10,
    flexBasis: "45%",
    height: 150,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 85,
    height: 85,
    borderRadius: 85 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginTop: 15,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
});
