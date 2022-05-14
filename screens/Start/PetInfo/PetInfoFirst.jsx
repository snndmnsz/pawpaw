import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import Level from "../../../components/level/Level";
import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";
import Photo from "../../../components/ui/ImagePhoto/Photo";
import DatePickerInput from "../../../components/ui/DatePicker/DatePickerInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const PetInfoFirst = ({ navigation }) => {
  const petInfoSecondHandler = () => {
    navigation.navigate("PetInfoSecond");
  };
  return (
    <KeyboardAwareScrollView
      style={styles.petInfoFirstContainer}
      showsVerticalScrollIndicator={false}
    >
      <Level level="2" />
      <Text style={styles.headerText}>Fill Your Pet Info</Text>
      <Photo />
      <Input placeholder="Pet Name" type="default" label="Pet Name" />
      <Input placeholder="Birth Date" type="numeric" label="Birth Date" />
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
  buttonContainer: {
    widht: "100%",
    marginTop: 80,
    marginBottom: 25,
    paddingRight: 25,
    paddingHorizontal: 180,
    flexDirection: "column",
  },
});
