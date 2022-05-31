import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { BarChart } from "react-native-chart-kit";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";
import { getAllWeightbyPetId } from "../../../../database/tables/weight";
import { getAllVetbyPetId } from "../../../../database/tables/vet";
import { useSelector, useDispatch } from "react-redux";

const CustomBarChart = ({ title }) => {
  const screenWidth = Dimensions.get("window").width * 0.8;
  const isFocused = useIsFocused();
  const [weightData, setWeightData] = useState([]);
  const [vetData, setVetData] = useState([]);
  const [dataLabels, setDataLabels] = useState();
  const currentPetId = useSelector((state) => state.myPet.currentPetId);

  useEffect(() => {
    setDataLabels([]);
    setWeightData([0, 0, 0, 0, 0, 0]);
    setVetData([0, 0, 0, 0, 0, 0]);
    const lastSixMont = [];
    for (let i = 0; i < 6; i++) {
      lastSixMont.push(moment().subtract(i, "month").format("MMM"));
    }
    setDataLabels(lastSixMont.reverse());

    if ((title === "Weight Stats" || title === "Weight History") && isFocused) {
      getAllWeightbyPetId(currentPetId)
        .then((res) => {
          const allMontData = [0, 0, 0, 0, 0, 0];
          const monthDataCounter = [0, 0, 0, 0, 0, 0];
          res.forEach((element) => {
            const date = moment(element.date).format("MMM");
            const index = lastSixMont.indexOf(date);
            if (index !== -1) {
              monthDataCounter[index]++;
              allMontData[index] += parseFloat(element.weight);
              // weightData[index] += parseFloat(element.weight);
            }
          });
          monthDataCounter.forEach((element, index) => {
            if (element !== 0) {
              allMontData[index] = parseFloat(
                (allMontData[index] / element).toFixed(1)
              );
            }
          });
          setWeightData(allMontData);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (title === "Vet Appoitments" && isFocused) {
      getAllVetbyPetId(currentPetId)
        .then((res) => {
          const allMontData = [0, 0, 0, 0, 0, 0];
          res.forEach((element) => {
            const date = moment(element.date).format("MMM");
            const index = lastSixMont.indexOf(date);
            if (index !== -1) {
              allMontData[index] += 1;
            }
          });
          setVetData(allMontData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isFocused,currentPetId]);

  return (
    <View style={styles.barContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>{title}</Text>
        <Text style={styles.headerSmallText}>Last 6 Months</Text>
      </View>
      <BarChart
        // style={graphStyle}
        data={{
          labels: dataLabels,
          datasets: [
            {
              data:
                title === "Weight Stats" || title === "Weight History"
                  ? weightData
                  : vetData,
              colors: [
                (opacity = 1) => `#1DA8B1`,
                (opacity = 1) => `#FC3090`,
                (opacity = 1) => `#F66816`,
                (opacity = 1) => `#2871C8`,
                (opacity = 1) => `#67C5A3`,
                (opacity = 1) => `#707BFB`,
              ],
            },
          ],
        }}
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
          fillShadowGradientFrom: "#8991FB",
          fillShadowGradientTo: "#8991FB",
          fillShadowGradientFromOpacity: 1,
          fillShadowGradientFromOffset: 1,
          fillShadowGradientToOffset: 1,
          barRadius: 5,
        }}
        withHorizontalLabels={false}
        withInnerLines={false}
        showBarTops={false}
        flatColor={true}
        fromZero={true}
        withCustomBarColorFromData={true}
        showValuesOnTopOfBars={true}
        style={{
          marginLeft: -55,
        }}
      />
    </View>
  );
};

export default CustomBarChart;

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
