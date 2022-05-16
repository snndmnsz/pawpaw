import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import food from "../../assets/activityImages/food.png";
import care from "../../assets/activityImages/care.png";
import play from "../../assets/activityImages/play.png";
import sleep from "../../assets/activityImages/sleep.png";
import toilet from "../../assets/activityImages/toilet.png";
import walk from "../../assets/activityImages/walk.png";

const NewActivity = ({ navigation }) => {
  const playPressHandler = () => {
    navigation.navigate("Play");
  };
  const walkPressHandler = () => {
    navigation.navigate("Walk");
  };
  const foodPressHandler = () => {
    navigation.navigate("Food");
  };
  const sleepPressHandler = () => {
    navigation.navigate("Sleep");
  };
  const toiletPressHandler = () => {
    navigation.navigate("Toilet");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Please Select an Activity to Add</Text>
      <ScrollView
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={walkPressHandler}
          activeOpacity={0.8}
          style={[
            styles.activityContainer,
            {
              backgroundColor: "#FEE8DC",
            },
          ]}
        >
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.activityText,
                {
                  color: "#EE7942",
                },
              ]}
            >
              Walk
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={walk} style={styles.activityImage} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={foodPressHandler}
          activeOpacity={0.8}
          style={[
            styles.activityContainer,
            {
              flexDirection: "row-reverse",
              backgroundColor: "#FFEFF1",
            },
          ]}
        >
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.activityText,
                {
                  color: "#FD5B71",
                },
              ]}
            >
              Food
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={food}
              style={[
                styles.activityImage,
                {
                  left: 30,
                },
              ]}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={playPressHandler}
          style={[
            styles.activityContainer,
            {
              backgroundColor: "#E6FCF4",
            },
          ]}
        >
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.activityText,
                {
                  color: "#1DA8B1",
                },
              ]}
            >
              Play
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={care} style={styles.activityImage} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={sleepPressHandler}
          activeOpacity={0.8}
          style={[
            styles.activityContainer,
            {
              flexDirection: "row-reverse",
              backgroundColor: "#E6EDFA",
            },
          ]}
        >
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.activityText,
                {
                  color: "#2871C8",
                },
              ]}
            >
              Sleep
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={sleep}
              style={[
                styles.activityImage,
                {
                  left: 30,
                },
              ]}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={toiletPressHandler}
          style={[
            styles.activityContainer,
            {
              backgroundColor: "#F5EEFC",
            },
          ]}
        >
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.activityText,
                {
                  color: "#9B51E0",
                },
              ]}
            >
              Toilet
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={toilet} style={styles.activityImage} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default NewActivity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    color: "#7D7D7D",
    textAlign: "center",
    fontWeight: "500",
    marginTop: 20,
  },
  scrollView: {
    height: "100%",
    marginTop: 15,
    // marginBottom: 20,
  },
  activityContainer: {
    marginBottom: 10,
    width: "100%",
    height: 160,
    paddingVertical: 10,
    paddingHorizontal: 0,
    backgroundColor: "#FFEFF1",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  activityImage: {
    flex: 1,
    // width: null,
    // height: null,
    resizeMode: "contain",
  },
  textContainer: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  activityText: {
    fontSize: 40,
    color: "#FD5B71",
    fontWeight: "600",
  },
});
