import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import StartingScreensNavigations from "./StartingScreensNavigations";
import BottomTabBarNavigations from "./BottomTabBarNavigations";

import { useSelector } from "react-redux";

const MainNavigations = () => {
  const currentPetId = useSelector((state) => state.myPet.currentPetId);

  return (
    <SafeAreaProvider>
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
