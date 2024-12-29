import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
// import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "user",
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
      <Text style={styles.header}>Welcome, our esteemed client!</Text>
      <Text style={styles.para}>Please log in</Text>

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
        style={styles.role}
        value={form.role}
        onChangeText={(value) => handleInputChange("role", value)}
      />

      {loading ? (
        <ActivityIndicator size="small" color="#2196F3" />
      ) : (
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      )}

      {serverMessage ? (
        <Text
          style={[
            styles.serverMessage,
            { color: serverMessage.includes("successful") ? "green" : "red" },
          ]}
        >
          {serverMessage}
        </Text>
      ) : null}

      <Text style={styles.link} onPress={() => router.push("/signup")}>
        Don't have an account? Sign up
      </Text>
      <Text style={styles.link} onPress={() => router.push("/")}>
        Forgot Password?
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
    color: "#2196F3",
  },
  para: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  role: {
    display: "none",
  },
  loginButton: {
    backgroundColor: "#2196F3",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    marginTop: 10,
    textAlign: "center",
    color: "#2196F3",
  },
  serverMessage: {
    textAlign: "center",
    marginTop: 10,
  },
});

export default Login;
