import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Activities from "../screens/Activities/Activities";
import { CustomMainHeaderLeft } from "../components/ui/CustomHeader/CustomMainHeader";
import IconButton from "../components/ui/IconButton/IconButton";
import moment from "moment";
import NewActivity from "../screens/Activities/NewActivity";
import Food from "../screens/Activities/AllActivities/Food";
import Play from "../screens/Activities/AllActivities/Play";
import Sleep from "../screens/Activities/AllActivities/Sleep";
import Toilet from "../screens/Activities/AllActivities/Toilet";
import Walk from "../screens/Activities/AllActivities/Walk";
import { useSelector } from "react-redux";
const StartingStack = createStackNavigator();

const ActivitiesNavigation = () => {
  const selectedDate = useSelector(
    (state) => state.myPet.calender.selectedDate
  );
  const momentTime = moment(`${selectedDate.split("T")[0]}`).format(
    "YYYY-MM-DD"
  );
  const currentMoment = moment().format("YYYY-MM-DD");
  const isPastTime = momentTime < currentMoment;

  return (
    <StartingStack.Navigator
      initialRouteName="ActivitiesMain"
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}
    >
      <StartingStack.Screen
        name="ActivitiesMain"
        component={Activities}
        options={({ navigation }) => ({
          headerStyle: {
            shadowColor: "transparent", // this covers iOS
            elevation: 0, // this covers Android
            height: 120,
          },
          headerTitleStyle: {
            display: "none",
          },
          headerLeft: () => (
            <CustomMainHeaderLeft isNameVisible={isPastTime ? true : false} />
          ),
          headerRight: () => {
            const newActivityScreenHandler = () => {
              navigation.navigate("NewActivity");
            };

            if (isPastTime) {
              return <View></View>;
            }

            return (
              <IconButton
                text="New Activity"
                iconName="add-circle"
                onPress={newActivityScreenHandler}
              />
            );
          },
        })}
      />
      <StartingStack.Screen
        name="NewActivity"
        component={NewActivity}
        options={{
          headerStyle: {
            shadowColor: "transparent", // this covers iOS
            elevation: 0, // this covers Android
          },
          headerTitleAlign: "center",
          title: "Add  Activity",
          headerBackTitleVisible: false,
          headerTintColor: "black",
        }}
      />
      <StartingStack.Screen
        name="Food"
        component={Food}
        options={{
          headerStyle: {
            shadowColor: "transparent", // this covers iOS
            elevation: 0, // this covers Android
            backgroundColor: "#FFEFF1",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          title: "Add Food Activity",
          headerTintColor: "black",
        }}
      />
      <StartingStack.Screen
        name="Play"
        component={Play}
        options={{
          headerStyle: {
            shadowColor: "transparent", // this covers iOS
            elevation: 0, // this covers Android
            backgroundColor: "#E6FCF4",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          title: "Add Play Activity",
          headerBackTitleVisible: false,
          headerTintColor: "black",
        }}
      />
      <StartingStack.Screen
        name="Sleep"
        component={Sleep}
        options={{
          headerStyle: {
            shadowColor: "transparent", // this covers iOS
            elevation: 0, // this covers Android
            backgroundColor: "#E6EDFA",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          title: "Add Sleep Activity",
          headerBackTitleVisible: false,
          headerTintColor: "black",
        }}
      />
      <StartingStack.Screen
        name="Toilet"
        component={Toilet}
        options={{
          headerStyle: {
            shadowColor: "transparent", // this covers iOS
            elevation: 0, // this covers Android
            backgroundColor: "#F5EEFC",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          title: "Add Toilet Activity",
          headerBackTitleVisible: false,
          headerTintColor: "black",
        }}
      />
      <StartingStack.Screen
        name="Walk"
        component={Walk}
        options={{
          headerStyle: {
            shadowColor: "transparent", // this covers iOS
            elevation: 0, // this covers Android
            backgroundColor: "#FEE8DC",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          title: "Add Walk Activity",
          headerBackTitleVisible: false,
          headerTintColor: "black",
        }}
      />
    </StartingStack.Navigator>
  );
};

export default ActivitiesNavigation;

const styles = StyleSheet.create({});
