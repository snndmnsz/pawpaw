import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Level = ({ level }) => {
  //#5BB188
  //#F8FAFD
  const [levels, setLevels] = React.useState({
    level1: "#F8FAFD",
    level2: "#F8FAFD",
    level3: "#F8FAFD",
  });
  React.useEffect(() => {
    if (level === "1") {
      setLevels({
        level1: "#5BB188",
        level2: "#F8FAFD",
        level3: "#F8FAFD",
      });
    } else if (level === "2") {
      setLevels({
        level1: "#5BB188",
        level2: "#5BB188",
        level3: "#F8FAFD",
      });
    } else if (level === "3") {
      setLevels({
        level1: "#5BB188",
        level2: "#5BB188",
        level3: "#5BB188",
      });
    }
  }, []);

  return (
    <View style={styles.levelContainer}>
      <View
        style={[
          styles.level,
          {
            backgroundColor: levels.level1,
          },
        ]}
      ></View>
      <View
        style={[
          styles.level,
          {
            backgroundColor: levels.level2,
          },
        ]}
      ></View>
      <View
        style={[
          styles.level,
          {
            backgroundColor: levels.level3,
          },
        ]}
      ></View>
    </View>
  );
};

export default Level;

const styles = StyleSheet.create({
  levelContainer: {
    marginTop: 10,
    widht: "100%",
    height: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  level: {
    width: "30%",
    height: "18%",
    backgroundColor: "#F8FAFD",
    borderRadius: 10,
  },
});
