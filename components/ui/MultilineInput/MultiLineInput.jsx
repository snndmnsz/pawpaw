import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

const MultiLineInput = ({
  placeholder,
  type,
  label,
  showLabel = true,
  onChange,
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
        multiline={true}
        textAlignVertical={"top"}
        onChangeText={(text)=> onChange(text)}
        {...props}
      />
    </View>
  );
};

export default MultiLineInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 10,
    marginHorizontal: 20,
    flexDirection: "column",
  },
  input: {
    height: 80,
    borderColor: "#E7ECF3",
    borderWidth: 1,
    marginTop: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#F8FAFD",
  },
  inputText: {
    fontSize: 20,
    color: "#555555",
  },
});
