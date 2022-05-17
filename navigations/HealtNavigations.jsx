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
          headerRight: () => {
            const pressHandler = () => {
              navigation.navigate("Activities", {
                screen: "NewActivity",
                // params: { date: new Date() },
              });
            };
            return (
              <CustomMainHeaderRight dateIconpressHandler={pressHandler} />
            );
          },
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
              const editChanger = isEdit ? false : true;
              // console.log("editChanger ===", editChanger);
              setIsAddButton(!editChanger);
              setIsEdit(editChanger);
              navigation.setParams({
                edit: editChanger,
                addButton: isAddButton,
              });
            };
            return (
              <IconButton
                text={isAddButton ? "Add Weight" : "Cancel"}
                imagePath={isAddButton && weight}
                iconName={!isAddButton && "close-outline"}
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
              const editChanger = isMedicalEdit ? false : true;
              // console.log("editChanger ===", editChanger);
              setIsMedicalAddButton(!editChanger);
              setIsMedicalEdit(editChanger);
              navigation.setParams({
                edit: editChanger,
                addButton: isMedicalAddButton,
              });
            };
            return (
              <IconButton
                text={isMedicalAddButton ? "Add Medical R." : "Cancel"}
                imagePath={isMedicalAddButton && medical}
                iconName={!isMedicalAddButton && "close-outline"}
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
              const editChanger = isVaccineEdit ? false : true;
              // console.log("editChanger ===", editChanger);
              setIsVaccineAddButton(!editChanger);
              setIsVaccineEdit(editChanger);
              navigation.setParams({
                edit: editChanger,
                addButton: isVaccineAddButton,
              });
            };
            return (
              <IconButton
                text={isVaccineAddButton ? "Add Vaccine" : "Cancel"}
                imagePath={isVaccineAddButton && vaccine}
                iconName={!isVaccineAddButton && "close-outline"}
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
              const editChanger = isVetEdit ? false : true;
              // console.log("editChanger ===", editChanger);
              setIsVetAddButton(!editChanger);
              setIsVetEdit(editChanger);
              navigation.setParams({
                edit: editChanger,
                addButton: isVetAddButton,
              });
            };
            return (
              <IconButton
                text={isVetAddButton ? "Add Vet Ap." : "Cancel"}
                imagePath={isVetAddButton && vet}
                iconName={!isVetAddButton && "close-outline"}
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
