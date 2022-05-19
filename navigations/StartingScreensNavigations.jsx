import { StyleSheet } from "react-native";
import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Welcome from "../screens/Start/Welcome/Welcome";
import PetSpicie from "../screens/Start/PetSpicie/PetSpicie";
import PetInfoFirst from "../screens/Start/PetInfo/PetInfoFirst";
import PetInfoSecond from "../screens/Start/PetInfo/PetInfoSecond";
import Owner from "../screens/Start/Owner/Owner";
import IconButton from "../components/ui/IconButton/IconButton";

const StartingStack = createStackNavigator();

const StartingScreensNavigations = () => {
  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  return (
    <NavigationContainer>
      <StartingStack.Navigator initialRouteName="Welcome">
        <StartingStack.Screen
          name="Welcome"
          options={{
            headerShown: false,
          }}
          component={Welcome}
        />
        <StartingStack.Screen
          name="PetSpicie"
          options={{
            cardStyleInterpolator: forFade,
            headerStyle: {
              shadowColor: "transparent", // this covers iOS
              elevation: 0, // this covers Android
            },
            headerTitleAlign: "center",
            title: "Add Pet",
            headerBackTitleVisible: false,
            headerTintColor: "black",
          }}
          component={PetSpicie}
        />
        <StartingStack.Screen
          name="PetInfoFirst"
          options={{
            cardStyleInterpolator: forFade,
            headerStyle: {
              shadowColor: "transparent", // this covers iOS
              elevation: 0, // this covers Android
            },
            headerTitleAlign: "center",
            title: "Add Pet",
            headerBackTitleVisible: false,
            headerTintColor: "black",
          }}
          component={PetInfoFirst}
        />
        <StartingStack.Screen
          name="PetInfoSecond"
          options={{
            cardStyleInterpolator: forFade,
            headerStyle: {
              shadowColor: "transparent", // this covers iOS
              elevation: 0, // this covers Android
            },
            headerTitleAlign: "center",
            title: "Add Pet",
            headerBackTitleVisible: false,
            headerTintColor: "black",
          }}
          component={PetInfoSecond}
        />
        <StartingStack.Screen
          name="Owner"
          options={{
            headerStyle: {
              shadowColor: "transparent", // this covers iOS
              elevation: 0, // this covers Android
              backgroundColor: "#FEE8DC",
              borderBottomWidth: 0,
            },
            headerTitleAlign: "center",
            title: "Owner",
            headerBackTitleVisible: false,
            headerTintColor: "black",
          }}
          component={Owner}
        />
      </StartingStack.Navigator>
    </NavigationContainer>
  );
};

export default StartingScreensNavigations;

const styles = StyleSheet.create({});
