import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

import { Ionicons } from "@expo/vector-icons";
import BackButton from "@/src/components/BackButton";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      const userInfo = await AsyncStorage.getItem("userInfo");
      if (userInfo) {
        const parsedUser = JSON.parse(userInfo);

        try {
          const response = await fetch(
            `http://localhost:5000/user/profile/${parsedUser.id}`
          );
          if (response.ok) {
            const data = await response.json();
            setUser(data);
            setLoading(false);
          } else {
            console.error("Failed to fetch user data", response.status);
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching user data", error);
          setLoading(false);
        }
      }
    };

    getUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>User not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackButton />
      {user.profilePicture ? (
        <Image
          source={{ uri: `http://localhost:5000/${user.profilePicture}` }}
          style={styles.profileImage}
        />
      ) : (
        <Ionicons name="person-circle" size={100} color="gray" />
      )}
      <Text style={styles.text}>{user.fullname}</Text>
      <Text style={styles.text}> {user.username}</Text>
      <Text style={styles.text}> {user.email}</Text>
      <Text style={styles.text}>{user.phoneNumber}</Text>
      <Button
        title="Edit Profile"
        onPress={() => router.push("/Users\\editprofile")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 75,
    marginBottom: 20,
  },

  text: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  notFound: {
    justifyContent: "center",
    alignItems: "center",
    top: "50%",
    color: "red",
    fontSize: 20,
  },
});

export default UserProfile;
