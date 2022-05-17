import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import profile from "../../assets/images/profile.png";
import petImage from "../../assets/images/dog-ex.png";
import Icon from "react-native-vector-icons/Ionicons";
import driveImage from "../../assets/images/drive.png";

const Menu = () => {
  return (
    <ScrollView style={styles.menuContainer}>
      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <Image source={profile} style={styles.profile} />
        </View>
        <Text style={styles.profileText}>Sinan Dumansiz</Text>
      </View>
      <View style={styles.petControlContainer}>
        <View style={styles.pet}>
          <View style={styles.petImageContainer}>
            <Image source={petImage} style={styles.petImage} />
          </View>
          <View style={styles.petInfoContainer}>
            <Text style={styles.petName}>Maximus</Text>
            <Text style={styles.petAge}>1 year old</Text>
            <Text style={styles.petBreed}>German Shephard</Text>
          </View>
          {/* <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.deleteButton}
              onPress={() => {}}
            >
              <Text style={styles.buttonText}>DELETE</Text>
            </TouchableOpacity>
          </View> */}
        </View>
        <View style={styles.pet}>
          <View style={styles.petImageContainer}>
            <View style={styles.emptypetImage}>
              <Icon name={"add-circle-outline"} size={55} color={"#EAEFF5"} />
            </View>
          </View>
          <View style={styles.petInfoContainer}>
            <Text style={styles.petAge}>Add New Pet</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomButtonContainers}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.sync}
          onPress={() => {}}
        >
          <View style={styles.driveImageContainer}>
            <Image source={driveImage} style={styles.driveImage} />
          </View>
          <Text style={styles.syncText}>Sync with Google Drive</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.deleteData}
          onPress={() => {}}
        >
          <Icon
            style={styles.deleteImageContainer}
            name={"trash-outline"}
            size={28}
            color={"#FFFFFF"}
          />
          <Text style={styles.deleteText}>Delete Everything</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          activeOpacity={0.8}
          style={styles.aboutButton}
          onPress={() => {}}
        >
          <Icon
            style={styles.aboutImageContainer}
            name={"information-circle-outline"}
            size={28}
            color={"#FFFFFF"}
          />
          <Text style={styles.aboutText}>About Us</Text>
        </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  profileContainer: {
    paddingHorizontal: 12,
    marginTop: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    padding: 20,
  },
  profileText: {
    fontSize: 22,
    color: "black",
    fontWeight: "500",
    textAlign: "center",
    marginTop: 6,
  },
  profileImageContainer: {
    height: 130,
    width: 130,
    borderRadius: 130 / 2,
    borderWidth: 3.1,
    borderColor: "#FFD9C4",
    backgroundColor: "#FEE8DC",
  },
  profile: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "contain",
    borderRadius: 130 / 2,
  },
  petControlContainer: {
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  pet: {
    height: 200,
    width: "45%",
    borderColor: "#EAEFF5",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  petImageContainer: {
    height: 80,
    width: 80,
    borderRadius: 10,
    marginBottom: 5,
  },
  petImage: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "contain",
    borderRadius: 15,
  },
  petInfoContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  petName: {
    fontSize: 20,
    color: "#434343",
    fontWeight: "600",
  },
  petAge: {
    fontSize: 13,
    color: "#7D7D7D",
    fontWeight: "400",
  },
  petBreed: {
    fontSize: 13,
    color: "#4F4F4F",
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  deleteButton: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#FF8271",
  },
  buttonText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  emptypetImage: {
    height: 80,
    width: 80,
    borderStyle: "dashed",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#D6DCE3",
    alignItems: "center",
    justifyContent: "center",
    top: -13,
  },
  bottomButtonContainers: {
    paddingHorizontal: 12,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  sync: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#171717",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  driveImageContainer: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  driveImage: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "contain",
  },
  syncText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  deleteData: {
    marginTop: 20,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F05454",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  deleteImageContainer: {
    marginRight: 10,
  },
  deleteText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  aboutButton: {
    marginTop: 20,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#707BFB",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 20,
  },
  aboutImageContainer: {
    marginRight: 10,
  },
  aboutText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
