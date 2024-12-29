import React, { useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  Pressable,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const router = useRouter();

  const logoScale = useRef(new Animated.Value(0)).current;
  const textFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(logoScale, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();

    Animated.timing(textFade, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleGetStarted = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        router.push("/errand-booking");
      } else {
        router.push("/userrole");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to verify login status. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.Image
          source={require("../assets/images/errnadlogo.png")}
          style={[styles.logo, { transform: [{ scale: logoScale }] }]}
        />

        <Animated.Text style={[styles.text, { opacity: textFade }]}>
          SendUs
        </Animated.Text>
        <Animated.Text style={[styles.text2, { opacity: textFade }]}>
          Relax, Let's do the job for you! Just send us!
        </Animated.Text>
      </View>

      <Pressable style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingTop: 40,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  content: {
    alignItems: "center",
    flexGrow: 1,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#2196F3",
    marginBottom: 10,
    textAlign: "center",
  },
  text2: {
    fontSize: 15,
    marginBottom: 30,
    color: "#555",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 14,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
    alignSelf: "stretch",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
