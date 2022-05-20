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
import DatePicker from "react-native-modern-datepicker";

const ClockPicker = ({ placeHolder, buttonPlaceHolder, onChange }) => {
  const [time, setTime] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Pressable style={styles.input} onPress={() => setModalVisible(true)}>
          <Text style={styles.inputText}>
            {time === "" ? placeHolder : time}
          </Text>
          <Icons name="time-outline" size={24} color="#7D7D7D" />
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
            <View style={styles.datePickerContainer}>
              <DatePicker
                mode="time"
                minuteInterval={3}
                onTimeChange={(selectedTime) => {
                  setTime(selectedTime);
                  setModalVisible(!modalVisible);
                  onChange(selectedTime);
                }}
                options={{
                  textDefaultColor: "#000000",
                  selectedTextColor: "#FFFFFF",
                  mainColor: "#707BFB",
                }}
                style={{ borderRadius: 10 }}
              />
            </View>

            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>{buttonPlaceHolder}</Text>
            </Pressable> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ClockPicker;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 10,
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
    width: 270,
    height: 275,
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
  datePickerContainer: {
    width: 230,
    height: 230,
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
