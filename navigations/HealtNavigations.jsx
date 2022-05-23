import { StyleSheet, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
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

import WeightAddScreen from "../screens/Health/HealtScreens/internalsAddScreens/WeightAddScreen";
import MedicalAddScreen from "../screens/Health/HealtScreens/internalsAddScreens/MedicalAddScreen";
import VaccineAddScreen from "../screens/Health/HealtScreens/internalsAddScreens/VaccineAddScreen";
import VetAddScreen from "../screens/Health/HealtScreens/internalsAddScreens/VetAddScreen";

import weight from "../assets/healthImages/weight.png";
import medical from "../assets/healthImages/medical.png";
import vaccine from "../assets/healthImages/vaccine.png";
import vet from "../assets/healthImages/vet.png";

const StartingStack = createStackNavigator();

const HealtNavigations = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isAddButton, setIsAddButton] = useState(true);

  const [isVetEdit, setIsVetEdit] = useState(false);
  const [isVetAddButton, setIsVetAddButton] = useState(true);

  const [isVaccineEdit, setIsVaccineEdit] = useState(false);
  const [isVaccineAddButton, setIsVaccineAddButton] = useState(true);

  const [isMedicalEdit, setIsMedicalEdit] = useState(false);
  const [isMedicalAddButton, setIsMedicalAddButton] = useState(true);

  const focus = useIsFocused();

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
          headerRight: () => <CustomMainHeaderRight navigation={navigation} />,
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
              navigation.navigate("WeightAdd");
            };
            return (
              <IconButton
                text={"Add Weight"}
                imagePath={weight}
                onPress={pressHandler}
              />
            );
          },
        })}
      />
      <StartingStack.Screen
        name="MedicalHistory"
        component={MedicalHistory}
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
              navigation.navigate("MedicalAdd");
            };
            return (
              <IconButton
                text={"Add Medical R."}
                imagePath={medical}
                onPress={pressHandler}
              />
            );
          },
        })}
      />
      <StartingStack.Screen
        name="VaccineHistory"
        component={VaccineHistory}
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
              navigation.navigate("VaccineAdd");
            };
            return (
              <IconButton
                text={"Add Vaccine"}
                imagePath={vaccine}
                onPress={pressHandler}
              />
            );
          },
        })}
      />
      <StartingStack.Screen
        name="VetAppoitments"
        component={VetAppoitments}
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
              navigation.navigate("VetAddScreen");
            };
            return (
              <IconButton
                text={"Add Vet Ap."}
                imagePath={vet}
                onPress={pressHandler}
              />
            );
          },
        })}
      />
      <StartingStack.Screen
        name="WeightAdd"
        component={WeightAddScreen}
        options={{
          headerStyle: {
            shadowColor: "transparent", // this covers iOS
            elevation: 0, // this covers Android
            backgroundColor: "#FFFFFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          title: "Add Weight",
          headerTintColor: "black",
        }}
      />

      <StartingStack.Screen
        name="MedicalAdd"
        component={MedicalAddScreen}
        options={{
          headerStyle: {
            shadowColor: "transparent", // this covers iOS
            elevation: 0, // this covers Android
            backgroundColor: "#FFFFFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          title: "Add Medical Record",
          headerTintColor: "black",
        }}
      />

      <StartingStack.Screen
        name="VaccineAdd"
        component={VaccineAddScreen}
        options={{
          headerStyle: {
            shadowColor: "transparent", // this covers iOS
            elevation: 0, // this covers Android
            backgroundColor: "#FFFFFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          title: "Add Vaccine Date",
          headerTintColor: "black",
        }}
      />

      <StartingStack.Screen
        name="VetAddScreen"
        component={VetAddScreen}
        options={{
          headerStyle: {
            shadowColor: "transparent", // this covers iOS
            elevation: 0, // this covers Android
            backgroundColor: "#FFFFFF",
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          title: "Add Vet Appoitment",
          headerTintColor: "black",
        }}
      />
    </StartingStack.Navigator>
  );
};

export default HealtNavigations;

const styles = StyleSheet.create({});
