import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";

const Input = ({
  placeholder,
  type,
  label,
  showLabel = true,
  onChange,
  value,
  ...props
}) => {

  return (
    <View style={styles.inputContainer}>
      {showLabel && <Text style={styles.inputText}>{label}</Text>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#7D7D7D"
        underlineColorAndroid="transparent"
        keyboardType={type}
        {...props}
        onChangeText={(text) => onChange(text)}
        value={value}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 15,
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
