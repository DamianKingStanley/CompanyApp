import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SideNavbar from "@/src/components/SideNavbar";
import { useRouter } from "expo-router";

const errands = [
  {
    id: 1,
    name: "Grocery Shopping",
    description: "Let us shop for your daily needs.",
    icon: "cart-outline",
  },
  {
    id: 2,
    name: "Send/Pick Up Packages",
    description: "We’ll pick up and deliver your packages.",
    icon: "cube-outline",
  },
  {
    id: 3,
    name: "School Runs",
    description: "Let's help pick up your kids from school safely.",
    icon: "school-outline",
  },
  {
    id: 4,
    name: "Laundry Services",
    description: "We’ll take care of your laundry errands.",
    icon: "shirt-outline",
  },
  {
    id: 5,
    name: "Pay Bills",
    description: "Let us pay your utility bills hassle-free.",
    icon: "card-outline",
  },
  {
    id: 6,
    name: "House Cleaning",
    description: "We’ll help you clean your home.",
    icon: "home-outline",
  },
  {
    id: 7,
    name: "Pet Care",
    description: "We’ll take care of your pets.",
    icon: "paw-outline",
  },
  {
    id: 8,
    name: "Car Wash",
    description: "We’ll clean your vehicle professionally.",
    icon: "car-outline",
  },
  {
    id: 9,
    name: "Gardening",
    description: "We’ll maintain your garden beautifully.",
    icon: "leaf-outline",
  },
  {
    id: 10,
    name: "Tech Repairs",
    description: "We’ll fix your gadgets.",
    icon: "laptop-outline",
  },
  {
    id: 11,
    name: "Event Setup",
    description: "Let us handle your event setup.",
    icon: "calendar-outline",
  },
  {
    id: 12,
    name: "Cooking",
    description: "We’ll prepare delicious meals.",
    icon: "fast-food-outline",
  },
  {
    id: 13,
    name: "Shopping Assistance",
    description: "We’ll help you find what you need.",
    icon: "bag-outline",
  },
  {
    id: 14,
    name: "Medicine Pickup",
    description: "We’ll deliver your medications.",
    icon: "medkit-outline",
  },
  {
    id: 15,
    name: "Document Delivery",
    description: "We’ll safely deliver your documents.",
    icon: "document-outline",
  },
  {
    id: 16,
    name: "Something Else?",
    description:
      "Is there something not listed above you'd want us to do for you?",
    icon: "hand-outline",
  },
];

const ErrandBooking = () => {
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View style={styles.container}>
      <SideNavbar />
      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalMessage}>
              Hello there, you have nothing to worry about, all our employees
              are well accounted for, and we promise to deliver an excellent job
            </Text>
            <Pressable
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Okay</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Image
        source={require("../assets/images/banner.jpg")}
        style={styles.banner}
        resizeMode="cover"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>How can we serve you today?</Text>
        {errands.map((errand) => (
          <View key={errand.id} style={styles.errandCard}>
            <Ionicons
              name={errand.icon}
              size={30}
              color="#2196F3"
              style={styles.errandIcon}
            />
            <View>
              <Text style={styles.errandTitle}>{errand.name}</Text>
              <Text style={styles.errandDescription}>{errand.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.tabBar}>
        <Pressable
          style={styles.tabItem}
          onPress={() => router.push("/Users\\userprofile")}
        >
          <Ionicons name="person-circle-outline" size={24} color="#2196F3" />
          <Text style={styles.tabText}>Profile</Text>
        </Pressable>
        <Pressable style={styles.tabItem}>
          <Ionicons name="location-outline" size={24} color="#2196F3" />
          <Text style={styles.tabText}>Track</Text>
        </Pressable>
        <Pressable style={styles.tabItem}>
          <Ionicons name="mail-outline" size={24} color="#2196F3" />
          <Text style={styles.tabText}>Contact Us</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  banner: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  heading: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  errandCard: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  errandIcon: {
    marginRight: 13,
  },
  errandTitle: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
  errandDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f3f4f6",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  tabItem: {
    alignItems: "center",
  },
  tabText: {
    fontSize: 12,
    color: "#333",
    marginTop: 5,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalMessage: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ErrandBooking;
