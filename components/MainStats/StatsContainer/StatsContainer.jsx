import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import StatsBox from "../StatsBox/StatsBox";
import { useSelector } from "react-redux";
import { getActivitiesForADate } from "../../../database/tables/activities";
import { getAllWeightForADate } from "../../../database/tables/weight";

const StatsContainer = () => {
  const selectedDate = useSelector(
    (state) => state.myPet.calender.selectedDate
  );
  const currentPetId = useSelector((state) => state.myPet.currentPetId);
  const isFocused = useIsFocused();

  const [walk = 0, setWalk] = useState(0);
  const [weight = 0, setWeight] = useState(0);
  const [sleep = 0, setSleep] = useState(0);
  const [calorie = 0, setCalorie] = useState(0);

  useEffect(() => {
    setWalk(0);
    setWeight(0);
    setSleep(0);
    setCalorie(0);
    if (isFocused) {
      getActivitiesForADate(currentPetId, selectedDate)
        .then((activities) => {
          let calorieData = 0;
          let walkMeters = 0;
          let sleepHours = 0;
          activities.forEach((activity) => {
            if (activity.activityType === "walk") {
              walkMeters += parseFloat(activity.meter);
            } else if (activity.activityType === "sleep") {
              const endTimeClock = activity.endTime.split(":");
              const startTimeClock = activity.startTime.split(":");
              const endTime = +endTimeClock[0];
              const startTime = +startTimeClock[0];
              const diff = endTime - startTime;
              sleepHours += diff;
            } else if (activity.activityType === "food") {
              calorieData += parseFloat(activity.calorie);
            }
          });
          setCalorie(calorieData);
          setWalk(walkMeters);
          setSleep(sleepHours);
        })
        .catch((err) => {
          console.log(err);
        });

      getAllWeightForADate(currentPetId)
        .then((weightData) => {
          if (weightData.length > 0) {
            weightData.sort((a, b) => {
              return new Date(a.date) - new Date(b.date);
            });
            const lastWeight = weightData[weightData.length - 1];
            setWeight(lastWeight.weight);
          } else if (weightData.length === 0) {
            setWeight(0);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isFocused,currentPetId]);

  return (
    <View style={styles.statsContainer}>
      <StatsBox
        backgroundC="#FEE8DC"
        textC="#EE7942"
        activity="Walk"
        data={walk}
        small="m"
      />
      <StatsBox
        backgroundC="#FFEFF1"
        textC="#FD5B71"
        activity="Calories"
        data={calorie}
        small="cal"
      />
      <StatsBox
        backgroundC="#E6EDFA"
        textC="#2871C8"
        activity="Sleep"
        data={sleep}
        small="h"
      />
      <StatsBox
        backgroundC="#F5EEFC"
        textC="#9B51E0"
        activity="Weight"
        data={weight}
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
