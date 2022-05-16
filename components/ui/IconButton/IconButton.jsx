import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

const IconButton = ({ onPress, text, iconName, imagePath }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.buttonContainer}
    >
      <Text style={styles.text}>{text}</Text>
      {iconName && <Icon name={iconName} size={26} color="#FFFFFF" />}
      {imagePath && (
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={imagePath} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#707BFB",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    paddingVertical: 10,
    textAlign: "center",
    paddingHorizontal: 18,
    right: Platform.OS === "android" ? 15 : 12,
    borderWidth: 1,
    borderColor: "#EAEFF5",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 8,
  },
  imageContainer: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 24,
    height: 24,
  },
});
