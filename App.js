import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as NavigationBar from "expo-navigation-bar";

import { Provider } from "react-redux";
import { store } from "./redux/store";

import MainNavigations from "./navigations/MainNavigations";

export default function App() {
  //TODO: loading fecth data from database

  if (Platform.OS === "android") {
    NavigationBar.setBackgroundColorAsync("white");
    NavigationBar.setButtonStyleAsync("dark");
  }

  return (
    <Provider store={store}>
      <MainNavigations />
    </Provider>
  );
}

const styles = StyleSheet.create({});
