import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
// import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "errander",
  });
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  const handleInputChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };
  const handleLogin = async () => {
    setLoading(true);
    setServerMessage("");

    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      const { token, result: user } = data;
      const formattedResult = {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      };

      // await SecureStore.setItemAsync("authToken", token);

      await AsyncStorage.setItem("userInfo", JSON.stringify(formattedResult));
      try {
        await AsyncStorage.setItem("authToken", token);
        console.log("Token saved locally in AsyncStorage.");
      } catch (error) {
        console.error("Failed to save token locally:", error);
      }

      setServerMessage("Login successful.");
      router.push("/errand-booking");
    } catch (error: any) {
      setServerMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Errander Login</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        value={form.email}
        onChangeText={(value) => handleInputChange("email", value)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={form.password}
        onChangeText={(value) => handleInputChange("password", value)}
      />
      <TextInput
        style={styles.input}
        value={form.role}
        onChangeText={(value) => handleInputChange("role", value)}
      />

      <Button title="Log In" onPress={handleLogin} />
      <Text
        style={styles.link}
        onPress={() => router.push("/admin\\usregister")}
      >
        Don't have an account? Sign up
      </Text>
      <Text style={styles.link} onPress={() => router.push("/")}>
        Fogot Password?
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f3f4f6",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  link: {
    marginTop: 10,
    textAlign: "center",
    color: "#2196F3",
  },
});

export default Login;
