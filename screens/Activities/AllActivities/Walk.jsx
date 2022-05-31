import React, { useState, useEffect } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  LogBox,
  Alert,
} from "react-native";
import Input from "../../../components/ui/Input/Input";
import { useIsFocused } from "@react-navigation/native";
import * as Location from "expo-location";
import Icons from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import walk from "../../../assets/activityImages/walk.png";
import cat3 from "../../../assets/activityImages/cat/cat--3.png";
import * as TaskManager from "expo-task-manager";
import { getDistance, getPreciseDistance } from "geolib";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";
import Button from "../../../components/ui/Button/Button";
import ClockPicker from "../../../components/ui/ClockPicker/ClockPicker";
import MultiLineInput from "../../../components/ui/MultilineInput/MultiLineInput";
import moment from "moment";
import { useSelector } from "react-redux";
import { addAnActivity } from "../../../database/tables/activities";
import { schedulePushNotification } from "../../../utils/notifications";

const LOCATION_TASK_NAME = "LOCATION_TASK_NAME";
let foregroundSubscription = null;

const Walk = ({ navigation }) => {
  const selectedDate = useSelector(
    (state) => state.myPet.calender.selectedDate
  );
  const currentPetId = useSelector((state) => state.myPet.currentPetId);
  const petName = useSelector((state) => state.myPet.currentPetInfo.name);
  const spicie = useSelector((state) => state.myPet.currentPetInfo.spicie);
  const isFocused = useIsFocused();
  const [isScheduled, setIsScheduled] = useState(false);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const [locationPermission, setLocationPermission] = useState(true);

  const [position, setPosition] = useState(null);
  const [initialPosition, setInitialPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [liveMeters, setLiveMeters] = useState({
    distance: 0,
  });

  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [meterInput, setMeterInput] = useState(0);

  const clockHandler = (time) => {
    setTime(`${time}:00`);
  };
  const noteHandler = (note) => {
    setNote(note);
  };

  const meterInputhandler = (meter) => {
    setMeterInput(+meter);
  };

  const calculatePreciseDistance = () => {
    var pdis = getPreciseDistance(
      {
        latitude: initialPosition.latitude,
        longitude: initialPosition.longitude,
      },
      { latitude: position?.latitude, longitude: position?.longitude }
    );
    setLiveMeters({
      distance: parseInt(pdis),
    });
  };

  useEffect(() => {
    const requestPermissions = async () => {
      const foreground = await Location.requestForegroundPermissionsAsync();

      if (foreground.granted !== "granted") {
        // setLocationPermission(false);
        // setIsScheduled(true);
        // setIsStopwatchStart(false);
        // setResetStopwatch(true);
        // setLiveMeters({
        //   distance: 0,
        // });
        return;
      }
      if (foreground.granted) {
        // setLocationPermission(true);
        // setIsScheduled(false);
        await Location.requestBackgroundPermissionsAsync();
      }
    };
    requestPermissions();
  }, []);

  const startForegroundUpdate = async () => {
    const { granted } = await Location.getForegroundPermissionsAsync();
    console.log("granted ===>>>>>>>>>>>>>  ", granted);
    if (!granted) {
      setLocationPermission(false);
      setIsScheduled(true);
      setIsStopwatchStart(false);
      setResetStopwatch(true);
      setLiveMeters({
        distance: 0,
      });
      console.log("location tracking denied");
      return;
    }

    const { coords } = await Location.getCurrentPositionAsync({});
    setInitialPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });

    // setLocationPermission(true);
    // setIsScheduled(false);
    foregroundSubscription?.remove();
    foregroundSubscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
      },
      (location) => {
        setPosition(location.coords);
      }
    );
  };

  const stopForegroundUpdate = () => {
    setLiveMeters({
      distance: 0,
    });
    calculatePreciseDistance();
    foregroundSubscription?.remove();
    setPosition(null);
  };

  useEffect(() => {
    // get todays date
    LogBox.ignoreLogs([
      "Animated: `useNativeDriver`",
      "componentWillReceiveProps",
    ]);
    const todayDate = moment(new Date()).format("YYYY-MM-DD");
    const selectedDateString = moment(selectedDate).format("YYYY-MM-DD");
    if (isFocused) {
      if (selectedDateString === todayDate) {
        setIsScheduled(false);
      } else {
        setIsScheduled(true);
      }
    }
  }, [isFocused, currentPetId]);

  const walkSubmitHandler = () => {
    if (liveMeters.distance === 0) {
      // if (meterInput === 0 && !locationPermission) {
      //   return Alert.alert("oops...", "Please enter a meter value");
      // }
      if (note.length === 0 || time.length === 0) {
        return Alert.alert("oops...", "Please fill all the fields");
      } else if (note.length > 100) {
        return Alert.alert(
          "oops...",
          "Please enter a note less than 100 characters"
        );
      }
      if (time === "00:00:00") {
        return Alert.alert(
          "oops...",
          "Please select a time is greater than 00:00:00"
        );
      }
    }
    const activityFormattedDate = selectedDate.split("T")[0];
    const timeFormattedForWalkIso = selectedDate.split("T")[1];
    const timeFormattedForWalk = new Date(selectedDate).toLocaleTimeString();
    // console.log(timeFormattedForWalk);
    const newActivityDate = `${activityFormattedDate}T${
      time ? time : timeFormattedForWalkIso
    }`;
    const datui = new Date(activityFormattedDate);
    const walkActivity = {
      petId: +currentPetId,
      activityType: "walk",
      date: newActivityDate,
      note:
        liveMeters.distance === 0
          ? note
          : `${liveMeters.distance} meters walked`,
      startTime: time ? time : timeFormattedForWalk,
      endTime: "",
      calorie: "",
      // meter: !locationPermission ? meterInput : liveMeters.distance,
      meter: liveMeters.distance,
    };

    addAnActivity(currentPetId, walkActivity)
      .then(() => {
        navigation.navigate("ActivitiesMain");
        schedulePushNotification(
          `${petName} has a Walk Activity`,
          `Pssttt ${petName} has a walk activity now...`,
          datui,
          time ? time : timeFormattedForWalk
        );
      })
      .catch((err) => {
        console.log(err);
      });

    setIsStopwatchStart(false);
    setResetStopwatch(true);
    setLiveMeters({
      distance: 0,
    });
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollContainer}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={[
              styles.image,
              {
                left: spicie === "cat" ? 25 : 47,
              },
            ]}
            source={spicie === "dog" ? walk : cat3}
          />
        </View>
        <View style={styles.circle}></View>
        {isScheduled ? (
          <View style={styles.meterCountContainer}>
            <MultiLineInput
              placeholder="What do you want to do in walk Activity?"
              type="default"
              label="Note"
              showLabel={false}
              onChange={noteHandler}
            />
            <ClockPicker
              onChange={clockHandler}
              placeHolder="Start Time"
              buttonPlaceHolder="Set Time"
            />
            {/* {!locationPermission && (
              <Input
                placeholder="Meter"
                type="numeric"
                label=""
                showLabel={false}
                onChange={meterInputhandler}
              />
            )} */}
            <View
              style={[
                styles.submitButtonContainer,
                {
                  marginTop: 35,
                },
              ]}
            >
              <Button onPress={walkSubmitHandler} text="Add Walk Schedule" />
              {/* <TouchableOpacity
                style={styles.scheduleButton}
                activeOpacity={0.8}
                onPress={() => {
                  // stopForegroundUpdate();
                  setIsScheduled(!isScheduled);
                }}
              >
                <Icons name="stopwatch-outline" size={28} color="#FFFFFF" />
                <Text style={styles.scheduleButtonText}>Go Walk Now</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        ) : (
          <View style={styles.meterCountContainer}>
            <View style={styles.meterContainer}>
              <Text style={styles.meterValue}>{liveMeters.distance}</Text>
              <Text style={styles.meterFix}>m</Text>
            </View>
            <View style={styles.sectionStyle}>
              <Stopwatch
                laps
                start={isStopwatchStart}
                reset={resetStopwatch}
                options={options}
                getTime={(time) => {
                  // console.log(time);
                }}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[
                    styles.startButton,
                    {
                      backgroundColor: isStopwatchStart ? "#C84B31" : "#4E9F3D",
                    },
                  ]}
                  onPress={() => {
                    // startForegroundUpdate();
                    // if (locationPermission) {
                    if (isStopwatchStart === false) {
                      startForegroundUpdate();
                    } else if (isStopwatchStart === true) {
                      stopForegroundUpdate();
                    }
                    setIsStopwatchStart(!isStopwatchStart);
                    setResetStopwatch(false);
                    // }
                  }}
                >
                  <Text style={styles.startButtonText}>
                    {!isStopwatchStart ? "START" : "STOP"}
                  </Text>
                </TouchableOpacity>

                {liveMeters.distance > 0 && !isStopwatchStart && (
                  <TouchableOpacity
                    style={styles.resetButton}
                    activeOpacity={0.8}
                    onPress={() => {
                      // stopForegroundUpdate();
                      setIsStopwatchStart(false);
                      setResetStopwatch(true);
                      setLiveMeters({
                        distance: 0,
                      });
                    }}
                  >
                    <Text style={styles.resetButtonText}>RESET</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={styles.submitButtonContainer}>
              {!isStopwatchStart && liveMeters.distance > 0 && (
                <Button
                  onPress={walkSubmitHandler}
                  text="Submit Walk Distance"
                />
              )}

              {/* <TouchableOpacity
                style={styles.scheduleButton}
                activeOpacity={0.8}
                onPress={() => {
                  // stopForegroundUpdate();
                  setIsScheduled(!isScheduled);
                }}
              >
                <Icons name="alarm-outline" size={26} color="#FFFFFF" />
                <Text style={styles.scheduleButtonText}>
                  Schedule to Later Time
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
        )}

        {/* <Text>Longitude: {position?.longitude}</Text>
        <Text>Latitude: {position?.latitude}</Text> */}
        {/* <View style={styles.separator} /> */}
        {/* <Button
          onPress={startForegroundUpdate}
          title="Start in foreground"
          color="green"
        />
        <View style={styles.separator} />
        <Button
          onPress={stopForegroundUpdate}
          title="Stop in foreground"
          color="red"
        /> */}
        {/* <View style={styles.separator} />
        <Button
          onPress={startBackgroundUpdate}
          title="Start in background"
          color="green"
        />
        <View style={styles.separator} />
        <Button
          onPress={stopBackgroundUpdate}
          title="Stop in background"
          color="red"
        /> */}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Walk;

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  circle: {
    width: 700,
    height: 700,
    borderRadius: 700 / 2,
    top: -460,
    // left: -15,
    backgroundColor: "#FEE8DC",
    position: "absolute",
    zIndex: -1,
  },
  imageContainer: {
    marginTop: 30,
    width: "100%",
    height: 220,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    // width: null,
    // height: null,
    resizeMode: "contain",
    left: 47,
  },

  meterCountContainer: {
    width: "100%",
  },

  sectionStyle: {
    flexDirection: "column",
    width: "100%",
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 14,
  },
  startButton: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4E9F3D",
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 8,
  },
  startButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  resetButton: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C84B31",
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 8,
  },
  resetButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  meterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  meterValue: {
    fontSize: 55,
    fontWeight: "bold",
    color: "#071C21",
  },
  meterFix: {
    fontSize: 15,
    color: "#071C21",
    fontWeight: "bold",
    alignSelf: "flex-end",
    top: -10,
  },
  submitButtonContainer: {
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  scheduleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#112B3C",
    borderRadius: 8,
    marginHorizontal: 45,
    paddingVertical: 8,
    marginTop: 15,
  },
  scheduleButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

const options = {
  container: {
    backgroundColor: "#FFF4EA",
    paddingVertical: 18,
    borderRadius: 8,
    marginTop: 15,
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  text: {
    fontSize: 35,
    color: "#27323A",
    marginLeft: 7,
    fontWeight: "bold",
  },
};
