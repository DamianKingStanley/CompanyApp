import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackButton from "@/src/components/BackButton";

const EditProfile = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const userInfo = await AsyncStorage.getItem("userInfo");
      if (userInfo) {
        const user = JSON.parse(userInfo);
        setUser(user);
        setFullname(user.fullname);
        setUsername(user.username);
        setEmail(user.email);
        setPhone(user.phoneNumber);
      }
    };

    getUserData();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem("authToken"); // Retrieve the auth token
    if (!token) {
      console.error("No authentication token found");
      return;
    }
    const updatedUser = {
      fullname,
      username,
      email,
      phone,
      profilePicture: image,
    };

    await AsyncStorage.setItem("userInfo", JSON.stringify(updatedUser));

    // Update on the server
    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("phone", phone);
    if (image) {
      formData.append("profilePicture", {
        uri: image,
        name: "profilePicture.jpg",
        type: "image/jpeg",
      });
    }

    fetch(`http://localhost:5000/user/profile/${user.id}/update`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          navigation.goBack();
        }
      })
      .catch((error) => console.error("Error updating profile", error));
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackButton />

      <Image
        source={{
          uri: image || `http://localhost:5000/${user.profilePicture}`,
        }}
        style={styles.profileImage}
      />

      <Button title="Change Profile Picture" onPress={pickImage} />
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullname}
        onChangeText={setFullname}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
      />
      <Button title="Save Changes" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 75,
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 60,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default EditProfile;
