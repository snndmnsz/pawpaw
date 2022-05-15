import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ActivityRings from "react-native-activity-rings";
import { LinearGradient } from "expo-linear-gradient";

const ActivityRing = () => {
  const activityData = [
    {
      label: "Walk",
      value: 0.6,
      color: "#EE7942",
      backgroundColor: "#EE7942",
    },
    {
      label: "Calories",
      value: 0.2,
      color: "#FD5B71",
      backgroundColor: "#FD5B71",
    },
    {
      label: "Sleep",
      value: 0.2,
      color: "#2871C8",
      backgroundColor: "#2871C8",
    },
    {
      label: "Weight",
      value: 0.2,
      color: "#9B51E0",
      backgroundColor: "#9B51E0",
    },
  ];

  const activityConfig = {
    width: 160,
    height: 160,
    radius: 15,
    ringSize: 14,
  };

  return (
    <View style={styles.ringContainer}>
      <LinearGradient
        colors={["#FAFAFA", "#FFFFFF"]}
        style={styles.ringInnerContainer}
      >
        <ActivityRings
          legend={true}
          data={activityData}
          config={activityConfig}
          theme={"light"}
        />
      </LinearGradient>
    </View>
  );
};

export default ActivityRing;

const styles = StyleSheet.create({
  ringContainer: {
    padding: "5%",
  },
  ringInnerContainer: {
    borderRadius: 15,
  },
});
