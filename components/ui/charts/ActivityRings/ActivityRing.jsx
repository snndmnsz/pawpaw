import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import ActivityRings from "react-native-activity-rings";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import moment from "moment";
import { getActivitiesForADate } from "../../../../database/tables/activities";

const ActivityRing = () => {
  const selectedDate = useSelector(
    (state) => state.myPet.calender.selectedDate
  );
  const currentPetId = useSelector((state) => state.myPet.currentPetId);
  const isFocused = useIsFocused();
  const [activityData, setActivityData] = useState([]);

  const activityNameConverter = (activityName) => {
    switch (activityName) {
      case "walk":
        return "Walk";
      case "food":
        return "Food";
      case "sleep":
        return "Sleep";
      case "play":
        return "Play";
      case "toilet":
        return "Toilet";
      default:
        return "";
    }
  };

  useEffect(() => {
    activityData.forEach((data) => {
      data.value = 0;
    });
    if (isFocused) {
      getActivitiesForADate(currentPetId, selectedDate)
        .then((activities) => {
          const datas = [
            {
              label: "Food",
              value: 0,
              color: "#FC3090",
              backgroundColor: "#FC3090",
            },
            {
              label: "Play",
              value: 0,
              color: "#1DA8B1",
              backgroundColor: "#1DA8B1",
            },
            {
              label: "Sleep",
              value: 0,
              color: "#2871C8",
              backgroundColor: "#2871C8",
            },
            {
              label: "Toilet",
              value: 0,
              color: "#9B51E0",
              backgroundColor: "#9B51E0",
            },
            {
              label: "Walk",
              value: 0,
              color: "#FFA500",
              backgroundColor: "#FFA500",
            },
          ];
          const values = [0, 0, 0, 0, 0];
          activities.forEach((activity) => {
            const name = activityNameConverter(activity.activityType);
            if (name !== "") {
              const index = datas.findIndex((data) => data.label === name);
              values[index] += 1;
            }
          });
          const total = values.reduce((a, b) => a + b, 0);
          datas.forEach((data, index) => {
            const p = (values[index] / total);
            if(p > 0) {
              data.value = p;
            }else{
              data.value = 0;
            }
          });
          setActivityData(datas);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isFocused,currentPetId]);

  const activityConfig = {
    width: 150,
    height: 150,
    radius: 15,
    ringSize: 8,
  };

  return (
    <View style={styles.ringContainer}>
      <LinearGradient
        colors={["#FAFAFA", "#FFFFFF"]}
        style={styles.ringInnerContainer}
      >
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>Activity Distribution</Text>
          <Text style={styles.headerSmallText}>Daily</Text>
        </View>
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
  ringContainer: {},
  ringInnerContainer: {
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
