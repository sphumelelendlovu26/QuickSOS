import { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import { verifyDetailsFromDB } from "../services/AuthService";
import { getItem } from "../services/secureStore";
import { getDetailsFromDb } from "../services/AuthService";
import * as LocalAuthentication from "expo-local-authentication";
import { saveItem } from "../services/secureStore";

const AuthScreen = ({ onAuthSuccess }) => {
  const [pin, setPin] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigation();

  
  const handleLogin = async () => {
    try {
      const secureEmail = await getItem("email");
      const securePin = await getItem("pin");

      if (secureEmail && securePin) {
        if (email === secureEmail && pin === securePin) {
          alert("logging in from secure store");
          onAuthSuccess();
          return;
        }
      }

      const isValidFromDb = await getDetailsFromDb(email, pin);
      if (isValidFromDb) {
        alert("logging from db");
        onAuthSuccess();
        saveItem("email", email);
        saveItem("pin", pin);
        return;
      }
      setError("Incorrect Email or PIN");
    } catch (err) {
      console.error(err);
      setError("An error occurred while logging in");
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate("Signup");
  };

  useEffect(() => {
    const autoBiometricLogin = async () => {
      try {
        const secureEmail = await getItem("email");
        const securePin = await getItem("pin");

        if (!secureEmail || !securePin) return;

        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (hasHardware && isEnrolled) {
          const result = await LocalAuthentication.authenticateAsync({
            promptMessage: "Authenticate to log in",
            fallbackLabel: "Use PIN instead",
          });

          if (result.success) {
            alert("Authenticated via biometrics");
            onAuthSuccess();
          }
        }
      } catch (err) {
        console.error("Biometric auto-login failed:", err);
      }
    };

    autoBiometricLogin();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>QuickSOS Login</Text>
      </View>

      <View>
        <Text style={styles.label}>Enter Email:</Text>
        <TextInput
          autoComplete="email"
          textContentType="emailAddress"
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.input}
        />
      </View>
      <View>
        <Text style={styles.label}>Enter PIN:</Text>
        <TextInput
          value={pin}
          onChangeText={setPin}
          keyboardType="numeric"
          secureTextEntry
          placeholder="PIN"
          style={styles.input}
        />
      </View>

      <Button title="Login" onPress={handleLogin} />

      {/* <Button title="Login with biometric" onPress={handleBiometricLogin} /> */}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.signupContainer}>
        <Text>New to QuickSOS?</Text>
        <Text style={styles.signupLink} onPress={handleCreateAccount}>
          Create An Account Here
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    gap: 10,
    justifyContent: "center",
    padding: 20,
    width: "100%",
    // borderWidth: 3,
    borderRadius: 10,
  },
  signupLink: {
    color: "blue",
  },
  heading: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 15,
  },
  input: {
    borderBottomWidth: 1,
    borderRadius: 5,

    borderColor: "lightgray",
  },
  error: {
    color: "red",
  },
  signupContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
});

export default AuthScreen;
