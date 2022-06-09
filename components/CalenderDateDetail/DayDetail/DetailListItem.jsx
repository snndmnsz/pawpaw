import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Alert,
} from "react-native";
import React from "react";
// import care from "../../../assets/IconImages/care.png";
import care from "../../../assets/healthImages/vet.png";
import food from "../../../assets/IconImages/food.png";
import play from "../../../assets/IconImages/play.png";
import sleep from "../../../assets/IconImages/sleep.png";
import toilet from "../../../assets/IconImages/toilet.png";
import walk from "../../../assets/IconImages/walk.png";
import vaccine from "../../../assets/healthImages/vaccine.png";
import { deleteAActivity } from "../../../database/tables/activities";

import { useDispatch, useSelector } from "react-redux";
import {
  loadingChanger,
  dateRefreshLoadingChanger,
} from "../../../redux/slice/myPetSlice";
import moment from "moment";

const backgroundColorConverter = (activity) => {
  switch (activity) {
    case "food":
      return "#FC3090";
    case "vet":
      return "#00BFFF";
    case "toilet":
      return "#9B51E0";
    case "play":
      return "#1DA8B1";
    case "walk":
      return "#FFA500";
    case "sleep":
      return "#2871C8";
    case "vaccine":
      return "#8D8DAA";
    default:
      return "#FFFFFF";
  }
};

const DetailListItem = ({ item }) => {
  const dispatch = useDispatch();
  const { activity, id } = item;
  const selectedDate = useSelector(
    (state) => state.myPet.calender.selectedDate
  );

  const activityDeleteHandler = () => {
    deleteAActivity(id)
      .then(() => {
        dispatch(dateRefreshLoadingChanger(false));
        dispatch(loadingChanger());
        dispatch(dateRefreshLoadingChanger(true));
      })
      .catch((err) => {
        console.log(err);
      });

    if (activity === "food") {
      console.log("food", id);
    } else if (activity === "vet") {
      // delete from both
      console.log("vet ", id);
    } else if (activity === "toilet") {
      console.log("toilet ", id);
    } else if (activity === "play") {
      console.log("play ", id);
    } else if (activity === "walk") {
      console.log("walk ", id);
    } else if (activity === "sleep") {
      console.log("sleep ", id);
    } else if (activity === "vaccine") {
      // delete from both
      console.log("vaccine ", id);
    }
  };

  const onPressHandler = () => {
    const foodCalorie = `\n\n Calorie: ${item.cal}`;
    const meter = `\n\n Meter: ${item.meter}`;
    const time = `\n Time: ${item.time}`;
    const name = `\n\n Activity: ${item.activity}`;
    const note = `\n\n Note: ${item.note}`;

    Alert.alert(
      "Activity Detail",
      `${time} ${name} ${
        item.activity === "food"
          ? foodCalorie
          : item.activity === "walk"
          ? meter
          : ""
      }  ${note}`,
      [{ text: "OK", style: "cancel" }],
      { cancelable: false }
    );
  };

  const momentTime = moment(
    `${selectedDate.split("T")[0]} ${item.time.split(" ")[0]}`
  ).format("YYYY-MM-DD HH:mm:ss");
  const currentMoment = moment().format("YYYY-MM-DD HH:mm:ss");
  const isPastTime = momentTime < currentMoment;

  const onLongPressButton = () => {
    Alert.alert(
      "Delete Activity",
      "Are you sure you want to delete this activity?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => activityDeleteHandler() },
      ]
    );
  };
  return (
    <TouchableHighlight
      onPress={onPressHandler}
      onLongPress={onLongPressButton}
      underlayColor="#FAFAFA"
    >
      <View
        style={[
          styles.itemContainer,
          {
            borderLeftColor: backgroundColorConverter(activity),
            borderRightColor: backgroundColorConverter(activity),
            borderTopWidth: 2,
            borderRightWidth: 3,
            borderBottomWidth: 2,
            borderLeftWidth: 3,
            backgroundColor: isPastTime ? "#F2F2F2" : "#FFFFFF",
          },
        ]}
      >
        {isPastTime && (
          <View style={styles.itemPastDate}>
            <Text style={styles.itemPastDateText}>Time Passed</Text>
          </View>
        )}
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
                  : item.activity === "vet"
                  ? care
                  : item.activity === "toilet"
                  ? toilet
                  : item.activity === "play"
                  ? play
                  : item.activity === "walk"
                  ? walk
                  : item.activity === "sleep"
                  ? sleep
                  : item.activity === "vaccine"
                  ? vaccine
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
            <Text style={styles.activityNote}>
              {item.note.length > 30
                ? item.note.slice(0, 30) + "..."
                : item.note}
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default DetailListItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 3,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 2,
    // borderColor: "#F8F8F8",
    borderBottomColor: "#F8F8F8",
    borderTopColor: "#F8F8F8",
    borderRightColor: "#F8F8F8",
    marginBottom: 6,
  },
  foodImageContainer: {
    width: "17%",
  },
  foodImageinner: {
    backgroundColor: "#FD5B71",
    borderRadius: 8,
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  foodImage: {
    height: 20,
    width: 20,
  },
  itemTextContainer: {
    width: "83%",
    flexDirection: "column",
    justifyContent: "space-around",
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
    fontSize: 12,
    color: "#4F4F4F",
  },
  itemTextLower: {
    width: "100%",
    flexDirection: "row",
    marginTop: 2,
  },
  activityNote: {
    fontSize: 13,
    color: "#828282",
  },
  itemPastDate: {
    position: "absolute",
    top: 0,
    right: "35%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6363",
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    zIndex: 1,
  },
  itemPastDateText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
});
