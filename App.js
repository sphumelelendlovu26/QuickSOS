import { StyleSheet, Text, View } from "react-native";
import { useKeepAwake } from "expo-keep-awake";
import { Platform } from "react-native";
import { useState } from "react";

import AuthScreen from "./src/screens/AuthScreen";
import EmergencyScreen from "./src/screens/EmergencyScreen.js";
import SignupScreen from "./src/screens/SignupScreen";
import ProfileScreen from "./src/screens/ProfileScreen.js";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  const [authenticated, setAuthenticated] = useState(true);

  if (Platform.OS !== "web") {
    useKeepAwake();
  }

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
            <>
              <Stack.Screen name="Emergency" component={EmergencyScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
            </>
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
