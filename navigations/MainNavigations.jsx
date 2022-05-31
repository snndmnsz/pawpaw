import { StyleSheet, Text, View, StatusBar as Sb } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import StartingScreensNavigations from "./StartingScreensNavigations";
import BottomTabBarNavigations from "./BottomTabBarNavigations";

import { useSelector, useDispatch } from "react-redux";
import * as SplashScreen from "expo-splash-screen";

import { getMyPets } from "../database/tables/myPet";
import {
  setSelectedDate,
  fillPetInfo,
  setPetData,
} from "../redux/slice/myPetSlice";
import { dbInit } from "../database/database";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();

const MainNavigations = () => {
  const currentPetId = useSelector((state) => state.myPet.currentPetId);
  const [initialRouteName, setInitialRouteName] = useState("");
  const dispatch = useDispatch();

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        dbInit()
          .then(() => {
            getMyPets()
              .then((myPets) => {
                console.log(myPets);
                dispatch(fillPetInfo(myPets));
                if (myPets.length > 0) {
                  dispatch(setPetData(myPets[0]));
                  const date = new Date().toISOString();
                  dispatch(setSelectedDate(date));
                  setInitialRouteName("bottomNavStack");
                } else {
                  setInitialRouteName("startStack");
                }
                setAppIsReady(true);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <StatusBar style="dark" />
      <Sb animated={true} barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRouteName}>
          <Stack.Screen
            name="bottomNavStack"
            options={{
              headerShown: false,
              headerMode: "none",
            }}
            component={BottomTabBarNavigations}
          />
          <Stack.Screen
            name="startStack"
            options={{
              headerShown: false,
              headerMode: "none",
            }}
            component={StartingScreensNavigations}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default MainNavigations;

const styles = StyleSheet.create({});
