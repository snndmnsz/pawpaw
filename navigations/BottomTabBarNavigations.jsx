import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Mypet from "../screens/MyPet/MyPet";
import ActivitiesNavigation from "./ActivitiesNavigation";
import HealtNavigations from "./HealtNavigations";
import Menu from "../screens/Menu/Menu";
import { useSelector } from "react-redux";
import {
  CustomMainHeaderLeft,
  CustomMainHeaderRight,
} from "../components/ui/CustomHeader/CustomMainHeader";

import CustomTabBar from "../components/ui/CustomTabBar/CustomTabBar";

const Tab = createBottomTabNavigator();

const BottomTabBarNavigations = ({ navigation }) => {
  // const currentPetId = useSelector((state) => state.myPet.currentPetId);

  // if(currentPetId === null) {
  //   navigation.navigate("startStack");
  // }else{
  //   navigation.navigate("bottomNavStack");
  // }

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarHideOnKeyboard: false,
        style: {
          position: "absolute",
          elevation: 0,
        },
      }}

    >
      <Tab.Screen
        name="My Pet"
        component={Mypet}
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
      <Tab.Screen
        name="Activities"
        options={{
          headerShown: false,
        }}
        component={ActivitiesNavigation}
      />
      <Tab.Screen
        name="Health"
        options={{
          headerShown: false,
        }}
        component={HealtNavigations}
      />
      <Tab.Screen
        name="Menu"
        component={Menu}
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
    </Tab.Navigator>
  );
};

export default BottomTabBarNavigations;

const styles = StyleSheet.create({});
