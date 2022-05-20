import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";

const StatsBox = ({ backgroundC, textC, activity, data, small }) => {
  return (
    <View
      style={[
        styles.boxContainer,
        {
          backgroundColor: backgroundC.trim(),
        },
      ]}
    >
      <Text
        style={[
          styles.boxTextName,
          {
            color: textC.trim(),
          },
        ]}
      >
        {activity}
      </Text>
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.boxText,
            {
              color: textC.trim(),
            },
          ]}
        >
          {data}
        </Text>
        <Text
          style={[
            styles.textSmall,
            {
              color: textC.trim(),
            },
          ]}
        >
          {small}
        </Text>
      </View>
    </View>
  );
};

export default StatsBox;

const styles = StyleSheet.create({
  boxContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    width: Dimensions.get("window").width / 2.2,
    height: 75,
    margin: "1%",
    padding: 10,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  boxText: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
  },
  textSmall: {
    height: "100%",
    fontSize: 13,
    marginLeft:2,
    top:26,
  },
  boxTextName: {
    left: "-20%",
    fontSize: 15,
  },
});
