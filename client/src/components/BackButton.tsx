import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the back icon
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook from react-navigation

const BackButton = () => {
  const navigation = useNavigation(); // Hook to access navigation

  // Function to go back to the previous screen
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handleBackPress} style={styles.button}>
      <Ionicons name="arrow-back" size={30} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    position: "absolute", // To position the button at the top-left corner
    top: 10,
    left: 10,
  },
});

export default BackButton;
