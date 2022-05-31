import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import image from "../../../assets/images/welcome-1.png";
import { useFonts } from "expo-font";
import Button from "../../../components/ui/Button/Button";
import { useSelector } from "react-redux";

const Welcome = ({ navigation }) => {
  const isFocused = useIsFocused();
  const myPets = useSelector((state) => state.myPet.myPets);
  let [fontsLoaded] = useFonts({
    "Nunito-Bold": require("../../../assets/fonts/Nunito-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (isFocused && myPets.length === 1) {
      return navigation.navigate("bottomNavStack", {
        screen: "Menu",
      });
    }
  }, [isFocused]);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const handlePress = () => {
    navigation.navigate("PetSpicie");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>
          Easly Manage
          {"\n"}Your P
        </Text>
        <Text style={styles.subText}>et</Text>
        <View style={styles.smallCircle}></View>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={handlePress} text="Get Started" />
      </View>
      <View style={styles.circle}></View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 25,
    paddingTop: 60,
    backgroundColor: "#FFFFFF",
  },
  circle: {
    width: 700,
    height: 700,
    borderRadius: 700 / 2,
    top: -340,
    // left: -15,
    backgroundColor: "#8D94F4",
    position: "absolute",
    zIndex: -1,
  },
  imageContainer: {
    marginTop: 30,
    width: "100%",
    height: 380,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    // width: null,
    // height: null,
    resizeMode: "contain",
    left: 36,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  mainText: {
    fontSize: 41,
    fontWeight: "bold",
    marginTop: 10,
    fontFamily: "Nunito-Bold",
    textAlign: "right",
    lineHeight: 65,
    marginRight: 40,
    letterSpacing: 1.3,
  },
  subText: {
    fontSize: 43,
    fontSize: 43,
    fontWeight: "bold",
    fontFamily: "Nunito-Bold",
    position: "absolute",
    right: Platform.OS === "android" ? 8 : 4,
    bottom: 0,
    color: "white",
  },
  smallCircle: {
    width: 75,
    height: 75,
    borderRadius: 100 / 2,
    backgroundColor: "rgba(251, 124, 72, 0.8)",
    position: "absolute",
    right: -18,
    bottom: -10,
    zIndex: -1,
  },
  buttonContainer: {
    paddingVertical: 55,
    paddingHorizontal: 10,
    width: "100%",
  },
});
