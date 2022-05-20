import { StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import Level from "../../../components/level/Level";
import Button from "../../../components/ui/Button/Button";
import { setPetSpicie } from "../../../redux/slice/myPetSlice";
import { useDispatch, useSelector } from "react-redux";

const PetSpicie = ({ navigation }) => {
  const [spicie, setSpice] = React.useState("");
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const currentPetInfo = useSelector((state) => state.myPet.currentPetInfo);

  useEffect(() => {
    if (isFocused) {
      setSpice(currentPetInfo.spicie);
    }
  }, [isFocused]);

  const petInfoFirstHandler = () => {
    if (spicie === "") {
      return Alert.alert("oops...", "Please select a spicie");
    }
    dispatch(setPetSpicie(spicie));
    navigation.navigate("PetInfoFirst");
  };

  return (
    <View style={styles.spicieContainer}>
      <Level level="1" />
      <Text style={styles.headerText}>Choose Your Pet Specie</Text>
      <View style={styles.spicies}>
        <Pressable
          onPress={() => {
            setSpice("cat");
          }}
          style={[
            styles.spicie,
            styles.cat,
            {
              borderStyle: spicie === "cat" ? "dotted" : "solid",
              borderWidth: spicie === "cat" ? 3 : 0,
              borderColor: spicie === "cat" ? "#8D94F4" : "#FFFFFF",
            },
          ]}
        >
          <View style={[styles.spiciePhoto, styles.spiciePhotoCat]}>
            <Image
              style={styles.spicieImage}
              source={require("../../../assets/images/cat-1.png")}
            />
          </View>
          <Text style={[styles.spicieText, styles.spicieTextCat]}>Cat</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setSpice("dog");
          }}
          style={[
            styles.spicie,
            styles.dog,
            {
              borderStyle: spicie === "dog" ? "dotted" : "solid",
              borderWidth: spicie === "dog" ? 3 : 0,
              borderColor: spicie === "dog" ? "#EE7942" : "#FFFFFF",
            },
          ]}
        >
          <View style={[styles.spiciePhoto, styles.spiciePhotoDog]}>
            <Image
              style={styles.spicieImage}
              source={require("../../../assets/images/dog-1.png")}
            />
          </View>
          <Text style={[styles.spicieText, styles.spicieTextDog]}>Dog</Text>
        </Pressable>
        {/* <Text style={styles.spicieText}>Bird</Text>
        <Text style={styles.spicieText}>Fish</Text>
        <Text style={styles.spicieText}>Reptile</Text> */}
      </View>
      <View style={styles.buttonContainer}>
        <Button text="Next" onPress={petInfoFirstHandler} />
      </View>
    </View>
  );
};

export default PetSpicie;

const styles = StyleSheet.create({
  spicieContainer: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  buttonContainer: {
    widht: "100%",
    marginTop: 50,
    paddingRight: 25,
    paddingHorizontal: 180,
    flexDirection: "column",
  },
  headerText: {
    fontSize: 20,
    color: "#7D7D7D",
    textAlign: "center",
    fontWeight: "500",
    marginTop: 20,
  },
  spicies: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    width: "100%",
  },
  spicie: {
    marginTop: 20,
    paddingHorizontal: 20,
    width: "90%",
    height: 189,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#E6EAF2",
    border: 1,
    borderRadius: 12,
    borderStyle: "solid",
    borderWidth: 0,
    borderColor: "#FFFFFF",
  },
  spiciePhoto: {
    width: "60%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  spicieImage: {
    width: 160,
    height: 160,
  },
  spicieText: {
    fontSize: 45,
    color: "#7D7D7D",
    fontWeight: "bold",
  },
  dog: {
    backgroundColor: "#FEE8DC",
  },
  spicieTextDog: {
    color: "#EE7942",
  },
  spicieTextCat: {
    color: "#606BED",
  },
  cat: {
    flexDirection: "row-reverse",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  spiciePhotoCat: {
    left: -30,
  },
  spiciePhotoDog: {
    right: 15,
  },
});
