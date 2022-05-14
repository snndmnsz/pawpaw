import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import image from "../../../assets/images/welcome-1.png";
import { useFonts } from "expo-font";
import Button from "../../../components/ui/Button/Button";

const Welcome = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    "Nunito-Bold": require("../../../assets/fonts/Nunito-ExtraBold.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const handlePress = () => {
    navigation.navigate("PetSpicie");
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image} />
      <View style={styles.circle}></View>
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>
          Easly Manage
          {"\n"}Your Pet
        </Text>
        <View style={styles.smallCircle}></View>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={handlePress} text="Get Started" />
      </View>
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
  image: {
    marginTop: 30,
    left: 30,
    width: 230,
    height: 380,
  },
  circle: {
    width: 700,
    height: 700,
    borderRadius: 700 / 2,
    backgroundColor: "#8D94F4",
    position: "absolute",
    top: -320,
    margin: "auto",
    zIndex: -1,
  },
  mainText: {
    fontSize: 45,
    fontWeight: "bold",
    marginTop: 10,
    fontFamily: "Nunito-Bold",
    textAlign: "right",
    lineHeight: 65,
    marginRight: 20,
    letterSpacing: 1.3,
  },
  smallCircle: {
    width: 75,
    height: 75,
    borderRadius: 100 / 2,
    backgroundColor: "rgba(251, 124, 72, 0.8)",
    position: "absolute",
    right: -5,
    bottom: -12,
    zIndex: -1,
  },
  buttonContainer: {
    paddingVertical: 75,
    paddingHorizontal: 10,
    width: "100%",
  },
});
