import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";

const SignUp = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "errander",
    secretKey: "",
  });

  const handleInputChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSignUp = async () => {
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

      Alert.alert("Welcome Onboard", "Registration successful.");
      router.push("/login");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Errander Sign Up</Text>

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
          placeholder="Enter your Secret Key"
          style={styles.input}
          secureTextEntry
          value={form.secretKey}
          onChangeText={(value) => handleInputChange("secretKey", value)}
        />
      )}

      <Button title="Sign Up" onPress={handleSignUp} />
      <Text style={styles.link} onPress={() => router.push("/admin\\uslogin")}>
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
  },
  link: {
    marginTop: 10,
    textAlign: "center",
    color: "#2196F3",
  },
});

export default SignUp;
