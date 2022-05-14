import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

const Input = ({ placeholder, type, label }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputText}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#7D7D7D"
        underlineColorAndroid="transparent"
        keyboardType={type}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 30,
    marginHorizontal: 20,
    flexDirection: "column",
  },
  input: {
    height: 50,
    borderColor: "#E7ECF3",
    borderWidth: 1,
    marginTop: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#F8FAFD",
  },
  inputText: {
    fontSize: 20,
    color: "#555555",
  },
});
