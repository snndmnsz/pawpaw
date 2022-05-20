import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import DetailListItem from "./DetailListItem";

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
  return (
    <View style={styles.itemListContainer}>
      <FlatList
        style={styles.flatList}
        data={dummyData}
        renderItem={(item) => {
          return <DetailListItem item={item.item} />;
        }}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default DetailListContainer;

const styles = StyleSheet.create({
  itemListContainer: {
    width: "90%",
    height: "100%",
    alignSelf: "center",
    marginTop: 10,
  },
});
