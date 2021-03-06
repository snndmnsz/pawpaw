import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import React, { useEffect } from "react";
import StatsContainer from "../../components/MainStats/StatsContainer/StatsContainer";
import UpcomingEvents from "../../components/UpcomingEvents/UpcomingEvents";
import ActivityRing from "../../components/ui/charts/ActivityRings/ActivityRing";
import CustomBarChart from "../../components/ui/charts/BarChart/CustomBarChart";
import CustomLineChart from "../../components/ui/charts/LineChart/CustomLineChart";
import CustomStackedBarChart from "../../components/ui/charts/StackedBarChart/CustomStackedBarChart";
import { useIsFocused } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedDate } from "../../redux/slice/myPetSlice";
import moment from "moment";

const MyPet = ({ navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (isFocused) {
  //     const currentDate = moment().format("YYYY-MM-DDTHH:mm:ss");
  //     dispatch(setSelectedDate(currentDate));
  //   }
  // }, [isFocused]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.myPetContainer}
    >
      <Text style={styles.headerText}>TODAY</Text>
      <StatsContainer />
      <UpcomingEvents navigation={navigation} />
      <ActivityRing />
      <CustomBarChart title="Weight History" />
      <CustomLineChart />
      <CustomStackedBarChart />
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
