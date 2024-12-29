import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Screens
import HomeScreen from "../screens/HomeScreen";
import ErrandBookingScreen from "../screens/ErrandBookingScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ErrandBooking" component={ErrandBookingScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
