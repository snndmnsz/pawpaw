import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { StackedBarChart } from "react-native-chart-kit";

const CustomStackedBarChart = () => {
  const screenWidth = Dimensions.get("window").width * 0.8;
  const data = {
    labels: ["Maximus"],
    legend: ["Heartworm", "Parvovirus", "Rabies"],
    data: [[3, 3, 6]],
    barColors: ["#FFA556", "#FD5B71", "#67C5A3"],
  };

  return (
    <View style={styles.barContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Medical History Stats</Text>
        <Text style={styles.headerSmallText}>Last 6 Months</Text>
      </View>
      <StackedBarChart
        // style={graphStyle}
        data={data}
        width={screenWidth}
        height={170}
        // yAxisLabel="$"
        // yAxisSuffix="k"
        chartConfig={{
          backgroundGradientFrom: "#FFFFFF",
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: "#FFFFFF",
          backgroundGradientToOpacity: 0.5,
          color: (opacity = 1) => `#7D7D7D`,
          strokeWidth: 3, // optional, default 3
          barPercentage: 1,
          useShadowColorFromDataset: false, // optional
          fillShadowGradientFrom: "#8991FB",
          fillShadowGradientTo: "#8991FB",
          fillShadowGradientFromOpacity: 1,
          fillShadowGradientFromOffset: 1,
          fillShadowGradientToOffset: 1,
          //   barRadius: 5,
        }}
        withHorizontalLabels={false}
        withInnerLines={false}
        showBarTops={false}
        flatColor={true}
        fromZero={true}
        withVerticalLabels={false}
        withCustomBarColorFromData={false}
        showValuesOnTopOfBars={false}
        style={
          {
            //   marginLeft: -0,
          }
        }
      />
    </View>
  );
};

export default CustomStackedBarChart;

const styles = StyleSheet.create({
  barContainer: {
    width: "90%",
    alignSelf: "center",
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: 13,
    borderWidth: 3,
    borderColor: "#EAEFF5",
    borderRadius: 12,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    width: "80%",
    right: "8%",
    marginBottom: 2,
  },
  headerText: {
    color: "#434343",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 5,
  },
  headerSmallText: {
    color: "#AAAAAA",
    fontSize: 14,
    fontWeight: "500",
    top: -2,
  },
});
