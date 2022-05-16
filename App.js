import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import * as NavigationBar from "expo-navigation-bar";
import {
  createStackNavigator,
  StackViewTransitionConfigs,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import CustomTabBar from "./components/ui/CustomTabBar/CustomTabBar";
import "react-native-gesture-handler";
import Mypet from "./screens/MyPet/MyPet";
import Health from "./screens/Health/Health";
import Menu from "./screens/Menu/Menu";

import {
  CustomMainHeaderLeft,
  CustomMainHeaderRight,
} from "./components/ui/CustomHeader/CustomMainHeader";

import Welcome from "./screens/Start/Welcome/Welcome";
import PetSpicie from "./screens/Start/PetSpicie/PetSpicie";
import PetInfoFirst from "./screens/Start/PetInfo/PetInfoFirst";
import PetInfoSecond from "./screens/Start/PetInfo/PetInfoSecond";
import Owner from "./screens/Start/Owner/Owner";
import IconButton from "./components/ui/IconButton/IconButton";

const Tab = createBottomTabNavigator();
const StartingStack = createStackNavigator();

import ActivitiesNavigation from "./navigations/ActivitiesNavigation";
import HealtNavigations from "./navigations/HealtNavigations";

export default function App() {
  if (Platform.OS === "android") {
    NavigationBar.setBackgroundColorAsync("#FFFFFF");
  }

  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  // return (
  //   <SafeAreaProvider>
  //     <NavigationContainer>
  //       <StartingStack.Navigator initialRouteName="Welcome">
  //         <StartingStack.Screen
  //           name="Welcome"
  //           options={{
  //             headerShown: false,
  //           }}
  //           component={Welcome}
  //         />
  //         <StartingStack.Screen
  //           name="PetSpicie"
  //           options={{
  //             cardStyleInterpolator: forFade,
  //             headerStyle: {
  //               shadowColor: "transparent", // this covers iOS
  //               elevation: 0, // this covers Android
  //             },
  //             headerTitleAlign: "center",
  //             title: "Add Pet",
  //             headerBackTitleVisible: false,
  //             headerTintColor: "black",
  //           }}
  //           component={PetSpicie}
  //         />
  //         <StartingStack.Screen
  //           name="PetInfoFirst"
  //           options={{
  //             cardStyleInterpolator: forFade,
  //             headerStyle: {
  //               shadowColor: "transparent", // this covers iOS
  //               elevation: 0, // this covers Android
  //             },
  //             headerTitleAlign: "center",
  //             title: "Add Pet",
  //             headerBackTitleVisible: false,
  //             headerTintColor: "black",
  //           }}
  //           component={PetInfoFirst}
  //         />
  //         <StartingStack.Screen
  //           name="PetInfoSecond"
  //           options={{
  //             cardStyleInterpolator: forFade,
  //             headerStyle: {
  //               shadowColor: "transparent", // this covers iOS
  //               elevation: 0, // this covers Android
  //             },
  //             headerTitleAlign: "center",
  //             title: "Add Pet",
  //             headerBackTitleVisible: false,
  //             headerTintColor: "black",
  //           }}
  //           component={PetInfoSecond}
  //         />
  //         <StartingStack.Screen
  //           name="Owner"
  //           options={{
  //             headerStyle: {
  //               shadowColor: "transparent", // this covers iOS
  //               elevation: 0, // this covers Android
  //               backgroundColor: "#FEE8DC",
  //               borderBottomWidth: 0,
  //             },
  //             headerTitleAlign: "center",
  //             title: "Owner",
  //             headerBackTitleVisible: false,
  //             headerTintColor: "black",
  //           }}
  //           component={Owner}
  //         />
  //       </StartingStack.Navigator>
  //     </NavigationContainer>
  //   </SafeAreaProvider>
  // );

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Tab.Navigator
          tabBar={(props) => <CustomTabBar {...props} />}
          screenOptions={{
            tabBarHideOnKeyboard: false,
            style: {
              position: "absolute",
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
          <Tab.Screen name="Menu" component={Menu} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "start",
  },
  input: {
    height: 40,
    margin: 12,
    width: "90%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
