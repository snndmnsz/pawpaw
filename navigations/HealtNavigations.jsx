import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Activities from "../screens/Activities/Activities";
import {
  CustomMainHeaderLeft,
  CustomMainHeaderRight,
} from "../components/ui/CustomHeader/CustomMainHeader";
import IconButton from "../components/ui/IconButton/IconButton";

import Health from "../screens/Health/Health";

import WeightHistory from "../screens/Health/HealtScreens/WeightHistory";
import MedicalHistory from "../screens/Health/HealtScreens/MedicalHistory";
import VaccineHistory from "../screens/Health/HealtScreens/VaccineHistory";
import VetAppoitments from "../screens/Health/HealtScreens/VetAppoitments";

import weight from "../assets/healthImages/weight.png";

const StartingStack = createStackNavigator();

const HealtNavigations = () => {
  const [isEdit, setIsEdit] = useState(false);

  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  return (
    <StartingStack.Navigator
      initialRouteName="HealthMain"
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}
    >
      <StartingStack.Screen
        name="HealthMain"
        component={Health}
        options={({ navigation }) => ({
          headerStyle: {
            shadowColor: "transparent", // this covers iOS
            elevation: 0, // this covers Android
            height: 120,
          },
          headerTitleStyle: {
            display: "none",
          },
          headerLeft: () => <CustomMainHeaderLeft isNameVisible={true} />,
          headerRight: () => <CustomMainHeaderRight />,
        })}
      />
      <StartingStack.Screen
        name="WeightHistory"
        component={WeightHistory}
        options={({ navigation }) => ({
          headerStyle: {
            shadowColor: "transparent", // this covers iOS
            elevation: 0, // this covers Android
            height: 120,
          },
          headerTitleStyle: {
            display: "none",
          },
          headerBackTitleVisible: false,
          headerTintColor: "black",
          // headerLeft: () => <CustomMainHeaderLeft isNameVisible={false} />,
          headerRight: () => {
            const pressHandler = () => {
              setIsEdit(!isEdit);
              navigation.setParams({
                edit: isEdit,
              });
            };

            return (
              <IconButton
                text="Add Weight"
                imagePath={weight}
                onPress={pressHandler}
              />
            );
          },
        })}
      />
    </StartingStack.Navigator>
  );
};

export default HealtNavigations;

const styles = StyleSheet.create({});
