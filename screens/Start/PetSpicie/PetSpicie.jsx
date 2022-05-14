import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import Level from "../../../components/level/Level";
import Button from "../../../components/ui/Button/Button";
const PetSpicie = ({ navigation }) => {
  const petInfoFirstHandler = () => {
    navigation.navigate("PetInfoFirst");
  };

  return (
    <View style={styles.spicieContainer}>
      <Level level="1" />
      <Text style={styles.headerText}>Choose Your Pet Specie</Text>
      <View style={styles.spicies}>
        <Pressable style={[styles.spicie, styles.cat]}>
          <View style={[styles.spiciePhoto, styles.spiciePhotoCat]}>
            <Image
              style={styles.spicieImage}
              source={require("../../../assets/images/cat-1.png")}
            />
          </View>
          <Text style={[styles.spicieText, styles.spicieTextCat]}>Cat</Text>
        </Pressable>
        <Pressable style={[styles.spicie, styles.dog]}>
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
