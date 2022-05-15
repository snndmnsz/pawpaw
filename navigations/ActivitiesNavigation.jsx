import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Activities from "../screens/Activities/Activities";
import { CustomMainHeaderLeft } from "../components/ui/CustomHeader/CustomMainHeader";
import IconButton from "../components/ui/IconButton/IconButton";

const StartingStack = createStackNavigator();

const ActivitiesNavigation = () => {
  return (
    <StartingStack.Navigator initialRouteName="ActivitiesMain">
      <StartingStack.Screen
        name="ActivitiesMain"
        component={Activities}
        options={{
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
            return (
              <IconButton
                text="New Activity"
                iconName="add-circle"
                onPress={() => alert("Add Activity")}
              />
            );
          },
        }}
      />
    </StartingStack.Navigator>
  );
};

export default ActivitiesNavigation;

const styles = StyleSheet.create({});
