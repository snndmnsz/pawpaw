import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

const MyPet = ({ navigation }) => {
  return (
    <View style={styles.myPetContainer}>
      <Text>MyPet</Text>
    </View>
  );
};

export default MyPet;

const styles = StyleSheet.create({
  myPetContainer: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
});
