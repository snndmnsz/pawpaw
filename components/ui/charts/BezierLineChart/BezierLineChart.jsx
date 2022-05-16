import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { LineChart } from "react-native-chart-kit";

const BezierLineChart = () => {
  const screenWidth = Dimensions.get("window").width * 0.8;

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `#1DA8B1`, // optional
        strokeWidth: 2, // optional
        // colors: [
        //   (opacity = 1) => `#1DA8B1`,
        //   (opacity = 1) => `#FC3090`,
        //   (opacity = 1) => `#F66816`,
        //   (opacity = 1) => `#2871C8`,
        //   (opacity = 1) => `#67C5A3`,
        //   (opacity = 1) => `#707BFB`,
        // ],
      },
    ],
  };
  return (
    <View style={styles.barContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Weight Stats</Text>
        <Text style={styles.headerSmallText}>Last 6 Months</Text>
      </View>
      <LineChart
        // style={graphStyle}
        bezier={true}
        bezierCurve={1}
        data={data}
        width={screenWidth}
        height={168}
        // yAxisLabel="$"
        // yAxisSuffix="k"
        chartConfig={{
          backgroundGradientFrom: "#FFFFFF",
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: "#FFFFFF",
          backgroundGradientToOpacity: 0.5,
          color: (opacity = 1) => `#7D7D7D`,
          strokeWidth: 2, // optional, default 3
          barPercentage: 0.5,
          useShadowColorFromDataset: false, // optional
          fillShadowGradientFrom: "#1DA8B1",
          fillShadowGradientTo: "#DAECED",
          fillShadowGradientFromOpacity: 0.8,
          fillShadowGradientFromOffset: 1,
          fillShadowGradientToOffset: 0.1,
          barRadius: 5,
        }}
        withHorizontalLabels={true}
        withInnerLines={true}
        showBarTops={false}
        flatColor={true}
        fromZero={true}
        withCustomBarColorFromData={true}
        showValuesOnTopOfBars={true}
        style={{
          marginLeft: -20,
          marginTop: 10,
        }}
      />
    </View>
  );
};

export default BezierLineChart;

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
