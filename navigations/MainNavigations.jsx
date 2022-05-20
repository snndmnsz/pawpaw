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

import { myPetInit, getMyPets } from "../database/tables/myPet";
import { activitiesInit } from "../database/tables/activities";
import { weightInit } from "../database/tables/weight";
import { vetInit } from "../database/tables/vet";
import { vaccineInit } from "../database/tables/vaccine";
import { medicalInit } from "../database/tables/medical";

const MainNavigations = () => {
  const currentPetId = useSelector((state) => state.myPet.currentPetId);
  const dispatch = useDispatch();

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        myPetInit()
          .then(() => {
            getMyPets()
              .then((myPets) => {
                console.log(myPets);
                if (myPets.length > 0) {
                  activitiesInit()
                    .then(() => {})
                    .catch((err) => {
                      console.log(err);
                    });
                  weightInit()
                    .then(() => {})
                    .catch((err) => {
                      console.log(err);
                    });
                  vetInit()
                    .then(() => {})
                    .catch((err) => {
                      console.log(err);
                    });
                  vaccineInit()
                    .then(() => {})
                    .catch((err) => {
                      console.log(err);
                    });
                  medicalInit()
                    .then(() => {})
                    .catch((err) => {
                      console.log(err);
                    });
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
