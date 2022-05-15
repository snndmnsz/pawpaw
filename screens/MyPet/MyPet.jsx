import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import React from "react";
import StatsContainer from "../../components/MainStats/StatsContainer/StatsContainer";
import UpcomingEvents from "../../components/UpcomingEvents/UpcomingEvents";
import ActivityRing from "../../components/ui/charts/ActivityRings/ActivityRing";

const MyPet = ({ navigation }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.myPetContainer}
    >
      <Text style={styles.headerText}>TODAY</Text>
      <StatsContainer />
      <UpcomingEvents />
      <ActivityRing />
    </ScrollView>
  );
};

export default MyPet;

const styles = StyleSheet.create({
  myPetContainer: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  headerText: {
    fontSize: 15,
    color: "#434343",
    fontWeight: "bold",
    width: "100%",
    marginTop: "1%",
    marginBottom: "3%",
    paddingHorizontal: "5%",
  },
});