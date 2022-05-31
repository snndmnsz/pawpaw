import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import Icons from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";
import Button from "../Button/Button";
import DatePicker ,{ getFormatedDate } from "react-native-modern-datepicker";

const DatePickerInput = ({
  showLabel = true,
  buttonText,
  customLabel,
  onChange,
  isStartingScreenBirthDate,
  title,
  selectedDateForUpdate,
}) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [time, setTime] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {isStartingScreenBirthDate && (
          <Text style={styles.labelText}>Birth Date</Text>
        )}
        <Pressable style={styles.input} onPress={() => setModalVisible(true)}>
          <Text style={styles.inputText}>
            {selectedDate ? selectedDate : title}
          </Text>
          <Icons name="calendar-outline" size={24} color="#7D7D7D" />
        </Pressable>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
        style={styles.centeredView}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <DatePicker
              minuteInterval={1}
              style={styles.datepicker}
              selected={getFormatedDate(new Date(selectedDateForUpdate), 'jYYYY/jMM/jDD')}
              onSelectedChange={(date) => {
                setSelectedDate(date);
              }}
              onTimeChange={(selectedTime) => {
                setTime(selectedTime);
                onChange(selectedTime);
                // setModalVisible(!modalVisible);
              }}
              options={{
                backgroundColor: "#FFFFFF",
                textHeaderColor: "#000000",
                textDefaultColor: "#000000",
                selectedTextColor: "#FFFFFF",
                mainColor: "#707BFB",
                textSecondaryColor: "#8D94F4",
              }}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                onChange(selectedDate);
              }}
            >
              <Text style={styles.textStyle}>
                {buttonText ? buttonText : "Pick Birth Date"}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DatePickerInput;

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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  datepicker: {
    borderRadius: 10,
  },
  inputText: {
    color: "#7D7D7D",
    fontSize: 15,
  },
  labelText: {
    fontSize: 20,
    color: "#555555",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: "72%",
    height: 350,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#707BFB",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
