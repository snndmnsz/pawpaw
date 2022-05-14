import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const Button = ({ onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#707BFB",
    borderRadius: 12,
    padding: 10,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    paddingVertical: 5,
    textAlign: "center",
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
});
