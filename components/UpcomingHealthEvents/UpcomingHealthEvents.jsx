import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";

const UpcomingHealthEvents = () => {
  const date = new Date();
  const day = date.getDate();
  const dayShort = date
    .toLocaleString("en-us", {
      weekday: "short",
    })
    .split(" ")[0];

  return (
    <View style={styles.upcomingContainer}>
      {/* <View style={styles.upcomingHeader}>
        <Text style={styles.upcomingHeaderText}>Upcoming Events</Text>
        <Icon name="arrow-forward-outline" size={24} color="#222" />
      </View> */}
      <LinearGradient
        style={styles.upcomingBox}
        colors={["rgba(108, 175, 248, 0.60)", "rgba(18, 122, 235, 0.70)"]}
      >
        <View style={styles.upcomingInfo}>
          <View style={styles.upcomingDate}>
            <Text style={styles.upcomingDay}>{day}</Text>
            <Text style={styles.upcomingDayName}>{dayShort}</Text>
          </View>
          <View style={styles.timeContainer}>
            <View style={styles.timeSingleContainer}>
              <Text style={styles.time}>13.30</Text>
              <Text style={styles.activity}>Vacci</Text>
            </View>
            <View style={styles.timeSingleContainer}>
              <Text style={styles.time}>15.30</Text>
              <Text style={styles.activity}>Vet A.</Text>
            </View>
            <View style={styles.timeSingleContainer}>
              <Text style={styles.time}>15.30</Text>
              <Text style={styles.activity}>Vacci</Text>
            </View>
            <View style={styles.timeSingleContainer}>
              <Text style={styles.time}>15.30</Text>
              <Text style={styles.activity}>Vacci</Text>
            </View>
          </View>
        </View>
        {/* <View style={styles.upcomingButtonContainer}>
          <TouchableOpacity activeOpacity={0.9} style={styles.upcomingButton}>
            <Text style={styles.upcomingText}>See Details</Text>
          </TouchableOpacity>
        </View> */}
      </LinearGradient>
    </View>
  );
};

export default UpcomingHealthEvents;

const styles = StyleSheet.create({
  upcomingContainer: {
    marginTop: "2%",
    backgroundColor: "transparent",
    width: "100%",
    paddingHorizontal: "5%",
  },
  upcomingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "3%",
  },
  upcomingHeaderText: {
    color: "#434343",
    fontSize: 17,
    fontWeight: "bold",
  },
  upcomingBox: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    flexDirection: "column",
    justifyContent: "space-around",
    paddingHorizontal: "15%",
  },
  upcomingInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  upcomingDate: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  upcomingDay: {
    color: "#FFFFFF",
    fontSize: 70,
    fontWeight: "bold",
    left: -15,
  },
  upcomingDayName: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
    top: -14,
    left: -12,
  },
  upcomingButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  upcomingButton: {
    height: 34,
    width: 140,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#EAEFF5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "1%",
  },
  upcomingText: {
    color: "#127AEB",
    fontSize: 14,
    fontWeight: "600",
  },
  timeContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  timeSingleContainer: {
    marginTop: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  time: {
    color: "#F5EEFC",
    fontSize: 20,
    marginRight: "7%",
  },
  activity: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});
