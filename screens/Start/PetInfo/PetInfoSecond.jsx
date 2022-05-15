import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import React from "react";
import Level from "../../../components/level/Level";
import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";
import Photo from "../../../components/ui/ImagePhoto/Photo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const PetInfoSecond = ({ navigation }) => {
  const ownerPageHandler = () => {
    navigation.navigate("Owner");
  };

  return (
    <KeyboardAwareScrollView
      style={styles.petInfoSecondContainer}
      showsVerticalScrollIndicator={false}
    >
      <Level level="3" />
      <Text style={styles.headerText}>Fill Your Pet Info</Text>
      <View style={styles.genderContainer}>
        <Pressable style={styles.male}>
          <Text style={styles.maleText}>Male</Text>
        </Pressable>
        <Pressable style={styles.female}>
          <Text style={styles.femaleText}>Female</Text>
        </Pressable>
      </View>
      <Input placeholder="Breed" type="default" label="Breed" />
      <Input placeholder="Weight  (kg)" type="numeric" label="Weight  (kg)" />
      <View style={styles.buttonContainer}>
        <Button text="Next" onPress={ownerPageHandler} />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default PetInfoSecond;

const styles = StyleSheet.create({
  petInfoSecondContainer: {
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
  genderContainer: {
    marginTop: 20,
    widht: "100%",
    height: 70,
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
  },
  male: {
    backgroundColor: "#E6EAF2",
    width: "40%",
    height: "100%",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  maleText: {
    color: "#8BA7CD",
    fontWeight: "bold",
    fontSize: 17,
  },
  femaleText: {
    color: "#E08888",
    fontWeight: "bold",
    fontSize: 17,
  },
  female: {
    backgroundColor: "rgba(247, 143, 143, 0.25)",
    width: "40%",
    height: "100%",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
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
