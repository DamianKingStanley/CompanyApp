import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import LogoutButton from "./LogoutButton";

const SideNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current; // Persistent Animated.Value

  const toggleNavbar = () => {
    if (isOpen) {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsOpen(false));
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsOpen(true));
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuIcon} onPress={toggleNavbar}>
        <Ionicons name="menu" size={20} color="#fff" />
      </TouchableOpacity>

      <Animated.View
        style={[styles.navbar, { transform: [{ translateX: slideAnim }] }]}
      >
        <Text style={styles.navTitle}>Options</Text>

        <Link href="/" style={styles.navLink}>
          <Ionicons name="time-outline" size={20} color="#2196F3" />
          <Text style={styles.navText}>My Errand History</Text>
        </Link>
        <Link href="/" style={styles.navLink}>
          <Ionicons name="people-outline" size={20} color="#2196F3" />
          <Text style={styles.navText}>Errand Runners</Text>
        </Link>
        <Link href="/" style={styles.navLink}>
          <Ionicons name="help-circle-outline" size={20} color="#2196F3" />
          <Text style={styles.navText}>FAQ</Text>
        </Link>
        <Link href="/" style={styles.navLink}>
          <Ionicons name="notifications-outline" size={20} color="#2196F3" />
          <Text style={styles.navText}>Notification</Text>
        </Link>
        <Link href="/" style={styles.navLink}>
          <Ionicons name="star-outline" size={20} color="#2196F3" />
          <Text style={styles.navText}>Review</Text>
        </Link>
        <Link href="/" style={styles.navLink}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color="#2196F3"
          />
          <Text style={styles.navText}>About Us</Text>
        </Link>

        <LogoutButton />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    zIndex: 10,
  },
  menuIcon: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
    backgroundColor: "#2196F3",
    borderRadius: 25,
    padding: 10,
  },
  navbar: {
    position: "absolute",
    top: 0,
    left: 0,
    height: Dimensions.get("window").height,
    width: 250,
    backgroundColor: "#f9f9f9",
    padding: 20,
    zIndex: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  navTitle: {
    marginTop: 70,
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  navLink: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  navText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 15,
  },
});

export default SideNavbar;
