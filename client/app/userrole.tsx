import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";

const userrole = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/deliv.avif")} // Replace with your image
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Get Started</Text>

          <Pressable
            style={[styles.button, styles.customerButton]}
            onPress={() => router.push("/login")} // Replace with your route
          >
            <Text style={styles.buttonText}>Continue as Customer</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.employeeButton]}
            onPress={() => router.push("/admin\\uslogin")} // Replace with your route
          >
            <Text style={styles.buttonText}>Continue as Employee</Text>
          </Pressable>
          <Text
            style={styles.backText}
            onPress={() => router.push("/")} // Replace with your route
          >
            Go Back
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    width: "80%",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  customerButton: {
    backgroundColor: "#2196F3",
  },
  employeeButton: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backText: {
    color: "white",
    marginTop: 30,
  },
});

export default userrole;
