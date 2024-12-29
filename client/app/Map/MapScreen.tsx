// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, PermissionsAndroid, Platform } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import * as Location from "expo-location";

// const MapScreen: React.FC = () => {
//   const [location, setLocation] = useState<any>(null);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);

//   useEffect(() => {
//     (async () => {
//       if (Platform.OS === "android") {
//         const { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== "granted") {
//           setErrorMsg("Permission to access location was denied");
//           return;
//         }
//       }

//       const loc = await Location.getCurrentPositionAsync({});
//       setLocation({
//         latitude: loc.coords.latitude,
//         longitude: loc.coords.longitude,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//       });
//     })();
//   }, []);

//   if (!location) {
//     return null; // Or a loading spinner
//   }

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={location}
//         showsUserLocation={true}
//         showsMyLocationButton={true}
//       >
//         <Marker
//           coordinate={{
//             latitude: location.latitude,
//             longitude: location.longitude,
//           }}
//           title="You are here"
//         />
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
// });

// export default MapScreen;
