import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import moment from "moment";
import { getActivitiesForADate } from "../../database/tables/activities";

const UpcomingEvents = ({ navigation }) => {
  const date = new Date();
  const day = date.getDate();
  const dayShort = date
    .toLocaleString("en-us", {
      weekday: "short",
    })
    .split(" ")[0];

  const selectedDate = useSelector(
    (state) => state.myPet.calender.selectedDate
  );
  const currentPetId = useSelector((state) => state.myPet.currentPetId);
  const isFocused = useIsFocused();

  const [data, setData] = useState([]);

  useEffect(() => {
    setData([]);
    if (isFocused) {
      getActivitiesForADate(currentPetId, selectedDate)
        .then((activities) => {
          const datas = [];
          activities.forEach((activity) => {
            const activityName =
              activity.activityType === "walk"
                ? "Walk"
                : activity.activityType === "food"
                ? "Food"
                : activity.activityType === "sleep"
                ? "Sleep"
                : activity.activityType === "vet"
                ? "Vet Ap."
                : activity.activityType === "play"
                ? "Play"
                : activity.activityType === "toilet"
                ? "Toilet"
                : activity.activityType === "vaccine"
                ? "Vacc"
                : activity.activityType === "walk"
                ? "Walk"
                : "";
            const time = activity.startTime.split(":");
            const activityObject = {
              id: activity.id,
              name: activityName,
              time: time[0] + ":" + time[1],
            };
            datas.push(activityObject);
          });
          datas.sort((a, b) => {
            return a.time?.localeCompare(b?.time);
          });
          const currentTime = moment().format("HH:mm");
          const filteredData = datas.filter((element) => {
            return element.time >= currentTime;
          })
          setData(filteredData.slice(0, 3));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isFocused,currentPetId]);

  return (
    <View style={styles.upcomingContainer}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.upcomingHeader}
        onPress={() => {
          navigation.navigate("ActivitiesMain");
        }}
      >
        <Text style={styles.upcomingHeaderText}>Upcoming Events</Text>
        <Icon name="arrow-forward-outline" size={24} color="#222" />
      </TouchableOpacity>
      <LinearGradient
        style={styles.upcomingBox}
        colors={["rgba(154, 160, 241, 0.85)", "rgba(113, 123, 251, 0.85)"]}
      >
        <View style={styles.upcomingInfo}>
          <View style={styles.upcomingDate}>
            <Text style={styles.upcomingDay}>{day}</Text>
            <Text style={styles.upcomingDayName}>{dayShort}</Text>
          </View>
          <View style={styles.timeContainer}>
            {data.length === 0 && (
              <View style={styles.timeSingleContainer}>
                <Text style={styles.activity}>No Events Found</Text>
              </View>
            )}
            {data.map((item, index) => {
              return (
                <View key={item.id} style={styles.timeSingleContainer}>
                  <Text style={styles.time}>{item.time}</Text>
                  <Text style={styles.activity}>{item.name}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.upcomingButtonContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.upcomingButton}
            onPress={() => {
              navigation.navigate("ActivitiesMain");
            }}
          >
            <Text style={styles.upcomingText}>See Details</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default UpcomingEvents;

const styles = StyleSheet.create({
  upcomingContainer: {
    marginTop: "2%",
    backgroundColor: "transparent",
    width: "100%",
    paddingHorizontal: "5%",
  },
  upcomingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "3%",
  },
  upcomingHeaderText: {
    color: "#434343",
    fontSize: 17,
    fontWeight: "bold",
  },
  upcomingBox: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    flexDirection: "column",
    justifyContent: "space-around",
    paddingHorizontal: "15%",
  },
  upcomingInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  upcomingDate: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  upcomingDay: {
    color: "#FFFFFF",
    fontSize: 70,
    fontWeight: "bold",
    left: -8,
  },
  upcomingDayName: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
    top: -14,
  },
  upcomingButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  upcomingButton: {
    height: 34,
    width: 140,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "1%",
  },
  upcomingText: {
    color: "#606BED",
    fontSize: 14,
    fontWeight: "600",
  },
  timeContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    marginLeft: 20,
  },
  timeSingleContainer: {
    marginTop: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  time: {
    color: "#F5EEFC",
    fontSize: 20,
    marginRight: "7%",
  },
  activity: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});
