import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const LogoutButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userInfo");
    await AsyncStorage.removeItem("authToken");

    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Button title="Log Out" onPress={() => setModalVisible(true)} />

      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Do you want to log out?</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.noButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.yesButton]}
                onPress={handleLogout}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 250,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#ddd",
    borderRadius: 5,
    margin: 5,
  },
  yesButton: {
    backgroundColor: "#ff4d4d", // Red color for the 'Yes' button
  },
  noButton: {
    backgroundColor: "#2196F3", // Red color for the 'Yes' button
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
  loggingOut: {
    cursor: "pointer",
  },
});

export default LogoutButton;
