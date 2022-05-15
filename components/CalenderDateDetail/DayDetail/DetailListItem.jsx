import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import care from "../../../assets/IconImages/care.png";
import food from "../../../assets/IconImages/food.png";
import play from "../../../assets/IconImages/play.png";
import sleep from "../../../assets/IconImages/sleep.png";
import toilet from "../../../assets/IconImages/toilet.png";
import walk from "../../../assets/IconImages/walk.png";

const backgroundColorConverter = (activity) => {
  switch (activity) {
    case "food":
      return "#FD5B71";
    case "care":
      return "#1DA8B1";
    case "toilet":
      return "#FFA500";
    case "play":
      return "#00BFFF";
    case "walk":
      return "#FC3090";
    case "sleep":
      return "#2871C8";
    default:
      return "#FFFFFF";
  }
};

const DetailListItem = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.foodImageContainer}>
        <View
          style={[
            styles.foodImageinner,
            {
              backgroundColor: backgroundColorConverter(item.activity),
            },
          ]}
        >
          <Image
            source={
              item.activity === "food"
                ? food
                : item.activity === "care"
                ? care
                : item.activity === "toilet"
                ? toilet
                : item.activity === "play"
                ? play
                : item.activity === "walk"
                ? walk
                : item.activity === "sleep"
                ? sleep
                : null
            }
            style={styles.foodImage}
          />
        </View>
      </View>
      <View style={styles.itemTextContainer}>
        <View style={styles.itemTextUpper}>
          <Text style={styles.activityName}>{item.activity}</Text>
          <Text style={styles.activityTime}>{item.time}</Text>
        </View>
        <View style={styles.itemTextLower}>
          <Text style={styles.activityNote}>{item.note}</Text>
        </View>
      </View>
    </View>
  );
};

export default DetailListItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#EAEFF5",
    marginBottom: 10,
  },
  foodImageContainer: {
    width: "20%",
  },
  foodImageinner: {
    backgroundColor: "#FD5B71",
    borderRadius: 60 / 2,
    height: 45,
    width: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  foodImage: {
    height: 20,
    width: 20,
  },
  itemTextContainer: {
    width: "80%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  itemTextUpper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activityName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activityTime: {
    fontSize: 13,
    color: "#4F4F4F",
  },
  itemTextLower: {
    width: "100%",
    flexDirection: "row",
    marginTop: 5,
  },
  activityNote: {
    fontSize: 13,
    color: "#828282",
  },
});
