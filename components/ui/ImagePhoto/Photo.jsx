import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import dog from "../../../assets/images/photoDog.png";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { setPetImage } from "../../../redux/slice/myPetSlice";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

const Photo = () => {
  const currentPetId = useSelector((state) => state.myPet.currentPetId);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const myPetPhoto = useSelector(
    (state) => state.myPet.currentPetInfo.photoURL
  );
  const isFocused = useIsFocused();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );
      return false;
    }
    return true;
  }

  const pickImage = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    dispatch(setPetImage(image.uri));
    setImage(image.uri);
  };

  useEffect(() => {
    if (isFocused) {
      setImage(myPetPhoto);
    }
  }, [isFocused,currentPetId]);

  return (
    <Pressable style={styles.photoContainer} onPress={pickImage}>
      <View style={styles.boxContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imageTaken} />
        ) : (
          <Image source={dog} style={styles.image} />
        )}
        {!image && <Text style={styles.photoText}>Take a Photo</Text>}
      </View>
    </Pressable>
  );
};

export default Photo;

const styles = StyleSheet.create({
  photoContainer: {
    width: "100%",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  boxContainer: {
    backgroundColor: "#F8FAFD",
    borderWidth: 2,
    borderColor: "#F7F7F7",
    width: 120,
    height: 120,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  imageTaken: {
    width: 115,
    height: 115,
    borderRadius: 12,
  },
  photoText: {
    paddingTop: 10,
    fontSize: 14,
    color: "#A7B0C0",
    textAlign: "center",
    fontWeight: "600",
  },
});
