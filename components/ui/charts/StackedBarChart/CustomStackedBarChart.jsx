import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { StackedBarChart } from "react-native-chart-kit";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";
const { getAllMedicalbyPetId } = require("../../../../database/tables/medical");

const CustomStackedBarChart = () => {
  const screenWidth = Dimensions.get("window").width * 0.8;
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const currentPetId = useSelector((state) => state.myPet.currentPetId);
  const isFocused = useIsFocused();

  useEffect(() => {
    setData([]);
    setLabels([]);

    if (isFocused) {
      getAllMedicalbyPetId(currentPetId)
        .then((res) => {
          const sicknessArray = [];
          const sicknessCount = [];
          res.forEach((sickness) => {
            if (sicknessArray.includes(sickness.medicalName)) {
              //find index of sickness
              const index = sicknessArray.indexOf(sickness.medicalName);
              sicknessCount[index]++;
            } else if (!sicknessArray.includes(sickness.medicalName)) {
              sicknessArray.push(sickness.medicalName);
              sicknessCount.push(1);
            }
          });
          // console.log(sicknessArray);
          // console.log("----------");
          // console.log(sicknessCount);

          setData(sicknessCount);
          setLabels(sicknessArray);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isFocused,currentPetId]);

  return (
    <View style={styles.barContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Medical History Stats</Text>
        <Text style={styles.headerSmallText}>Last 6 Months</Text>
      </View>
      <StackedBarChart
        // style={graphStyle}
        data={{
          labels: ["Maximus"],
          legend: labels,
          data: [data],
          barColors: [
            "#FFA556",
            "#FD5B71",
            "#67C5A3",
            "#CADD45",
            "#AD5B71",
            "#88A3D3",
          ],
        }}
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
