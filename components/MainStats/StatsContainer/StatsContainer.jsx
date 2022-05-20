import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StatsBox from "../StatsBox/StatsBox";

const StatsContainer = () => {
  return (
    <View style={styles.statsContainer}>
      <StatsBox
        backgroundC="#FEE8DC"
        textC="#EE7942"
        activity="Walk"
        data="680"
        small="m"
      />
      <StatsBox
        backgroundC="#FFEFF1"
        textC="#FD5B71"
        activity="Calories"
        data="350"
        small="cal"
      />
      <StatsBox
        backgroundC="#E6EDFA"
        textC="#2871C8"
        activity="Sleep"
        data="12.2"
        small="h"
      />
      <StatsBox
        backgroundC="#F5EEFC"
        textC="#9B51E0"
        activity="Weight"
        data="7.6"
        small="kg"
      />
    </View>
  );
};

export default StatsContainer;

const styles = StyleSheet.create({
  statsContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
