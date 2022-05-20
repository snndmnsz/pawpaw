import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import DetailListItem from "./DetailListItem";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { getActivitiesForADate } from "../../../database/tables/activities";
import Icons from "react-native-vector-icons/Ionicons";

const dummyData = [
  {
    id: 1,
    activity: "sleep",
    time: "20:00:00 - 08:00:00",
    note: "Maxi went to sleep finally",
  },
  {
    id: 2,
    activity: "walk",
    time: "20:00:00 - 08:00:00",
    note: "We take a walk with maxi today :)",
  },
  {
    id: 3,
    activity: "food",
    time: "20:00:00 - 08:00:00",
    note: "Maxi ate some food",
  },
  {
    id: 4,
    activity: "vet",
    time: "20:00:00 - 08:00:00",
    note: "Maxi took care of some stuff",
  },
  {
    id: 5,
    activity: "toilet",
    time: "20:00:00 - 08:00:00",
    note: "Maxi took a shit",
  },
];

const DetailListContainer = () => {
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  const selectedDate = useSelector(
    (state) => state.myPet.calender.selectedDate
  );
  const currentPetId = useSelector((state) => state.myPet.currentPetId);

  useEffect(() => {
    if (isFocused) {
      getActivitiesForADate(currentPetId, selectedDate).then((activities) => {
        const sortedData = activities.sort((a, b) => {
          return a.startTime?.localeCompare(b?.startTime);
        });
        const formattedArray = sortedData.map((activity) => {
          return {
            id: activity.id,
            activity: activity.activityType,
            time:
              activity.endTime !== ""
                ? activity.startTime + " - " + activity.endTime
                : activity.startTime,
            note: activity.note,
          };
        });
        setData(formattedArray);
      });
    }
  }, [selectedDate]);

  return (
    <View style={styles.itemListContainer}>
      {data.length > 0 ? (
        <FlatList
          style={styles.flatList}
          data={data}
          renderItem={(item) => {
            return <DetailListItem item={item.item} />;
          }}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <View style={styles.empty}>
          <Icons name="sad-outline" size={40} color="#A2AEBE" />
          <Text style={styles.emptyText}>No activities for this day</Text>
        </View>
      )}
    </View>
  );
};

export default DetailListContainer;

const styles = StyleSheet.create({
  itemListContainer: {
    width: "90%",
    // height: "100%",
    alignSelf: "center",
    marginTop: 10,
    flex: 1,
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    flexDirection: "column",
  },
  emptyText: {
    fontSize: 15,
    color: "#A2AEBE",
    marginTop: 10,
    fontWeight: "600",
  },
});
