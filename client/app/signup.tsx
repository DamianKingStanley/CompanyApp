import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

const SignUp = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "user",
    secretKey: "",
  });

  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  const handleInputChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSignUp = async () => {
    setLoading(true);
    setServerMessage("");

    try {
      const response = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      Alert.alert("Registration successful.");
      router.push("/login");
    } catch (error: any) {
      setServerMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up to Get Started</Text>

      <TextInput
        placeholder="Full Name"
        style={styles.input}
        value={form.fullname}
        onChangeText={(value) => handleInputChange("fullname", value)}
      />
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={form.username}
        onChangeText={(value) => handleInputChange("username", value)}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        value={form.email}
        onChangeText={(value) => handleInputChange("email", value)}
      />
      <TextInput
        placeholder="Phone Number"
        style={styles.input}
        keyboardType="phone-pad"
        value={form.phoneNumber}
        onChangeText={(value) => handleInputChange("phoneNumber", value)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={form.password}
        onChangeText={(value) => handleInputChange("password", value)}
      />
      <TextInput
        placeholder="Role (e.g., user, admin, errander)"
        style={styles.role}
        value={form.role}
        onChangeText={(value) => handleInputChange("role", value)}
      />
      {form.role !== "user" && (
        <TextInput
          placeholder="Secret Key (For Admin/Errander)"
          style={styles.input}
          secureTextEntry
          value={form.secretKey}
          onChangeText={(value) => handleInputChange("secretKey", value)}
        />
      )}

      {loading ? (
        <ActivityIndicator size="small" color="#2196F3" />
      ) : (
        <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      )}

      {serverMessage ? (
        <Text style={styles.serverMessage}>{serverMessage}</Text>
      ) : null}

      {/* <Button title="Sign Up" onPress={handleSignUp} /> */}
      <Text style={styles.link} onPress={() => router.push("/login")}>
        Already have an account? Log in
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  role: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    display: "none",
  },
  link: {
    marginTop: 10,
    textAlign: "center",
    color: "#2196F3",
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
  serverMessage: {
    textAlign: "center",
    color: "red",
    marginTop: 10,
  },
});

export default SignUp;
