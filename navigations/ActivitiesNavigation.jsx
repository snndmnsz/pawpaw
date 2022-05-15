import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Activities from "../screens/Activities/Activities";
import { CustomMainHeaderLeft } from "../components/ui/CustomHeader/CustomMainHeader";
import IconButton from "../components/ui/IconButton/IconButton";

import NewActivity from "../screens/Activities/NewActivity";
import Food from "../screens/Activities/AllActivities/Food";

const StartingStack = createStackNavigator();

const ActivitiesNavigation = () => {
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
          headerLeft: () => <CustomMainHeaderLeft isNameVisible={false} />,
          headerRight: () => {
            const newActivityScreenHandler = () => {
              navigation.navigate("NewActivity");
            };

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
          headerBackTitleVisible: false,
          headerTintColor: "black",
        }}
      />
    </StartingStack.Navigator>
  );
};

export default ActivitiesNavigation;

const styles = StyleSheet.create({});
