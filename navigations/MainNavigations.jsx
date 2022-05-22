import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import StartingScreensNavigations from "./StartingScreensNavigations";
import BottomTabBarNavigations from "./BottomTabBarNavigations";

import { useSelector, useDispatch } from "react-redux";
import { setPetData } from "../redux/slice/myPetSlice";
import * as SplashScreen from "expo-splash-screen";

import { getMyPets } from "../database/tables/myPet";

import { dbInit } from "../database/database";


const MainNavigations = () => {
  const currentPetId = useSelector((state) => state.myPet.currentPetId);
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
                if (myPets.length > 0) {
                  dispatch(setPetData(myPets[0]));
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
      {currentPetId ? (
        <BottomTabBarNavigations />
      ) : (
        <StartingScreensNavigations />
      )}
    </SafeAreaProvider>
  );
};

export default MainNavigations;

const styles = StyleSheet.create({});
