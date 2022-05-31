import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.bottomBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={isFocused ? styles.activeButton : styles.button}
          >
            <View style={styles.icon}>
              {label === "My Pet" ? (
                <Icon
                  name={isFocused ? "paw" : "paw-outline"}
                  size={25}
                  color={isFocused ? "#EE7942" : "#222"}
                />
              ) : label === "Activities" ? (
                <Icon
                  name={isFocused ? "time" : "time-outline"}
                  size={25}
                  color={isFocused ? "#EE7942" : "#222"}
                />
              ) : label === "Health" ? (
                <Icon
                  name={isFocused ? "fitness" : "fitness-outline"}
                  size={25}
                  color={isFocused ? "#EE7942" : "#222"}
                />
              ) : label === "Menu" ? (
                <Icon
                  name={isFocused ? "grid" : "grid-outline"}
                  size={25}
                  color={isFocused ? "#EE7942" : "#222"}
                />
              ) : null}
            </View>
            {isFocused && (
              <Text
                style={{
                  color: isFocused ? "#EE7942" : "#222",
                  fontWeight: "bold",
                }}
              >
                {label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === "android" ? 10 : 11,
    paddingBottom: Platform.OS === "android" ? 1 : 21,
  },
  button: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 55,
  },
  activeButton: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 55,
    borderRadius: 10,
    backgroundColor: "#FEE8DC",
  },
});

export default CustomTabBar;
