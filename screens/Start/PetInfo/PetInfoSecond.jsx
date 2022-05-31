import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import Level from "../../../components/level/Level";
import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";
import Photo from "../../../components/ui/ImagePhoto/Photo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import { setGenderBreedWeight } from "../../../redux/slice/myPetSlice";

const PetInfoSecond = ({ navigation }) => {
  const [gender, setGender] = useState("");
  const [breed, setBreed] = useState("");
  const [weight, setWeight] = useState("");
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const currentPetInfo = useSelector((state) => state.myPet.currentPetInfo);

  const ownerPageHandler = () => {
    if (gender === "") {
      return Alert.alert("oops...", "Please pick your pet's gender");
    } else if (breed.length > 20 || breed.length < 1) {
      return Alert.alert(
        "oops...",
        "Please pick enter pet's breed(max 20 chracter and min 1)"
      );
    } else if (parseInt(weight) < 0 || parseInt(weight) > 30 || weight === "") {
      return Alert.alert(
        "oops...",
        "Please enter your pet's weight(max 30kg and min 0kg)"
      );
    }
    if (isNaN(weight)) {
      return Alert.alert(
        "oops...",
        "Please enter your pet's weight(max 30kg and min 0kg)"
      );
    }
    dispatch(setGenderBreedWeight({ gender, breed, weight }));
    navigation.navigate("Owner");
  };

  useEffect(() => {
    if (isFocused) {
      setGender(currentPetInfo.gender);
      setBreed(currentPetInfo.breed);
      setWeight(currentPetInfo.weight);
    }
  }, [isFocused]);

  const breedHandler = (breed) => {
    setBreed(breed);
  };

  const weightHandler = (weight) => {
    setWeight(weight);
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={styles.petInfoSecondContainer}
    >
      <Level level="3" />
      <Text style={styles.headerText}>Fill Your Pet Info</Text>
      <View style={styles.genderContainer}>
        <Pressable
          onPress={() => {
            setGender("male");
          }}
          style={[
            styles.male,
            {
              borderStyle: gender === "male" ? "dotted" : "solid",
              borderWidth: gender === "male" ? 2 : 0,
              borderColor: gender === "male" ? "#8BA7CD" : "#FFFFFF",
            },
          ]}
        >
          <Text style={styles.maleText}>Male</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setGender("female");
          }}
          style={[
            styles.female,
            {
              borderStyle: gender === "female" ? "dotted" : "solid",
              borderWidth: gender === "female" ? 2 : 0,
              borderColor: gender === "female" ? "#E08888" : "#FFFFFF",
            },
          ]}
        >
          <Text style={styles.femaleText}>Female</Text>
        </Pressable>
      </View>
      <Input
        placeholder="Breed"
        type="default"
        label="Breed"
        onChange={breedHandler}
        value={breed}
      />
      <Input
        placeholder="Weight  (kg)"
        type="numeric"
        label="Weight  (kg)"
        onChange={weightHandler}
        value={weight}
      />
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
