import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { BarChart } from "react-native-chart-kit";

const CustomBarChart = () => {
  const screenWidth = Dimensions.get("window").width;

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFFFFF",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(141, 148, 244, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.2,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <View style={styles.barContainer}>
      <BarChart
        // style={graphStyle}
        data={data}
        width={screenWidth}
        height={300}
        yAxisLabel="$"
        chartConfig={chartConfig}
        verticalLabelRotation={30}
      />
    </View>
  );
};

export default CustomBarChart;

const styles = StyleSheet.create({
  barContainer:{
    paddingHorizontal: "5%",
    paddingVertical: "5%",
  }
});
