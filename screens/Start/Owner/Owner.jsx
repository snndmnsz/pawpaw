import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import image from "../../../assets/images/owner.png";
import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { setId, setOwnerName } from "../../../redux/slice/myPetSlice";
import { useDispatch, useSelector } from "react-redux";

import { addAPet } from "../../../database/tables/myPet";

const Owner = ({ navigation }) => {
  const [owner, setOwner] = useState("");
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const currentPetInfo = useSelector((state) => state.myPet.currentPetInfo);

  const pressHandler = () => {
    if (owner === "") {
      return alert("Please enter your name");
    }
    if (owner.length > 20 || owner.length < 1) {
      return alert("Please enter your name(max 20 chracter and min 1)");
    }
    dispatch(setOwnerName(owner));

    const pet = {
      birthDate: currentPetInfo.birthDate,
      breed: currentPetInfo.breed,
      gender: currentPetInfo.gender,
      name: currentPetInfo.name,
      ownerName: owner,
      photoURL: "",
      spicie: currentPetInfo.spicie,
      weight: currentPetInfo.weight,
    };
    addAPet(pet)
      .then((res) => {
        dispatch(setId(res));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ownerHandler = (owner) => {
    setOwner(owner);
  };

  useEffect(() => {
    if (isFocused) {
      setOwner(currentPetInfo.ownerName);
    }
  }, [isFocused]);

  return (
    <KeyboardAwareScrollView
      style={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.circle}></View>
        <Text style={styles.headerText}>Please Fill Your Info</Text>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={image} />
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Your Name and Surname"
            type="default"
            label="Name Surname"
            onChange={ownerHandler}
            value={owner}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button text="Finish" onPress={pressHandler} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Owner;

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    color: "#7D7D7D",
    textAlign: "center",
    fontWeight: "500",
    marginTop: 20,
  },
  circle: {
    width: 700,
    height: 700,
    borderRadius: 700 / 2,
    top: -380,
    // left: -15,
    backgroundColor: "#FEE8DC",
    position: "absolute",
    zIndex: -1,
  },
  imageContainer: {
    marginTop: 15,
    width: "100%",
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    // width: null,
    // height: null,
    resizeMode: "contain",
    left: 5,
  },
  inputContainer: {
    width: "90%",
  },
  buttonContainer: {
    width: "90%",
    marginTop: 60,
  },
});
