import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Errand App</Text>
      <Button title="Book an Errand" onPress={() => navigation.navigate('ErrandBooking')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
