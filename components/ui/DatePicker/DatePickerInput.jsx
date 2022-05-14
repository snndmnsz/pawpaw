import { StyleSheet, Text, View } from "react-native";
import DatePicker from "react-native-date-picker";
import React, { useState } from "react";
import Button from "../Button/Button";

const DatePickerInput = () => {
  const [date, setDate] = useState(new Date());

  return <DatePicker date={date} onDateChange={setDate} />;
};

export default DatePickerInput;

const styles = StyleSheet.create({});
