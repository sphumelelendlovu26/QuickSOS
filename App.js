import { StyleSheet, Text, View } from "react-native";
import { useKeepAwake } from "expo-keep-awake";
import { Platform } from "react-native";
import { useEffect, useState } from "react";

import AuthScreen from "./src/screens/AuthScreen";
import EmergencyScreen from "./src/screens/EmergencyScreen.js";
import SignupScreen from "./src/screens/SignupScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { loadSecureData } from "./src/services/secureStore.js";

const Stack = createNativeStackNavigator();

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  if (Platform.OS !== "web") {
    useKeepAwake();
  }

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const { email, pin } = await loadSecureData();
  //     if (email && pin) {
  //       setAuthenticated(true);
  //     }
  //   };
  //   checkAuth();
  // }, []);
  useEffect(() => {
    const clearDetails = async () => {
      await SecureStore.deleteItemAsync("email");
      await SecureStore.deleteItemAsync("pin");
      alert("cleared");
    };
    clearDetails();
  }, []);

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          {!authenticated ? (
            <>
              <Stack.Screen name="Auth">
                {() => (
                  <AuthScreen onAuthSuccess={() => setAuthenticated(true)} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Signup">
                {() => (
                  <SignupScreen
                    onSetupComplete={() => setAuthenticated(true)}
                  />
                )}
              </Stack.Screen>
            </>
          ) : (
            <Stack.Screen name="Emergency" component={EmergencyScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    width: "100%",
    padding: 10,
  },
});
