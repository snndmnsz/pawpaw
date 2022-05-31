import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import Level from "../../../components/level/Level";
import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";
import Photo from "../../../components/ui/ImagePhoto/Photo";
import DatePickerInput from "../../../components/ui/DatePicker/DatePickerInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import moment from "moment";
import { setpetNameAndBirthDate } from "../../../redux/slice/myPetSlice";
import { useDispatch, useSelector } from "react-redux";

const PetInfoFirst = ({ navigation }) => {
  const isFocused = useIsFocused();
  const currentPetInfo = useSelector((state) => state.myPet.currentPetInfo);
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      setName(currentPetInfo.name);
      setBirthDate(currentPetInfo.birthDate);
    }
  }, [isFocused]);

  const petInfoSecondHandler = () => {
    if (name === "") {
      return Alert.alert("oops...", "Please enter your pet's name");
    } else if (name.length > 12 || name.length < 1) {
      return Alert.alert(
        "oops...",
        "Please enter your pet's name(max 12 chracter and min 1)"
      );
    } else if (birthDate === "") {
      return Alert.alert("oops...", "Please enter your pet's birth date");
    }

    const onlyDate = birthDate.split(" ");
    const time = onlyDate[1] + ":00";
    // if (time === "00:00:00") {
    //   return Alert.alert("oops...", "Please select a timeother than 00:00:00");
    // }
    const datui = new Date(onlyDate[0]);
    const dates = moment(datui).format("YYYY-MM-DD");
    const formattedDateString = dates + "T" + time;
    const today = new Date().toISOString().split("T")[0];
    if (dates > today) {
      return Alert.alert(
        "oops...",
        "Please enter a birthDate that is not in the future"
      );
    }

    dispatch(setpetNameAndBirthDate({ name, birthDate }));
    navigation.navigate("PetInfoSecond");
  };

  const birthDateHandler = (date) => {
    setBirthDate(date);
  };

  const nameChangeHandler = (text) => {
    setName(text);
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={styles.petInfoFirstContainer}
    >
      <Level level="2" />
      <Text style={styles.headerText}>Fill Your Pet Info</Text>
      <Photo />
      <Input
        placeholder="Pet Name"
        type="default"
        label="Pet Name"
        onChange={nameChangeHandler}
        value={name}
      />
      {/* <Input placeholder="Birth Date" type="numeric" label="Birth Date" /> */}
      <DatePickerInput
        selectedDateForUpdate={birthDate}
        onChange={birthDateHandler}
        title="Birth Date"
        isStartingScreenBirthDate={true}
      />
      <View style={styles.buttonContainer}>
        <Button text="Next" onPress={petInfoSecondHandler} />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default PetInfoFirst;

const styles = StyleSheet.create({
  petInfoFirstContainer: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    color: "#7D7D7D",
    textAlign: "center",
    fontWeight: "500",
    marginTop: 20,
  },
  buttonDateContainer: {
    widht: "80%",
    paddingHorizontal: 20,
  },
  buttonContainer: {
    widht: "100%",
    marginTop: 80,
    marginBottom: 25,
    paddingRight: 25,
    paddingHorizontal: 180,
    flexDirection: "column",
  },
});
