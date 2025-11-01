import { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { verifyDetailsFromDB } from "../services/AuthService";

const AuthScreen = ({ onAuthSuccess }) => {
  const [pin, setPin] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigation();

const handleLogin = async () => {
  try {
    const isValid = await verifyDetailsFromDB(email, pin);

    if (isValid) {
      onAuthSuccess();
    } else {
      setError("Incorrect Email or PIN");
    }
  } catch (err) {
    console.error(err);
    setError("An error occurred while logging in");
  }
};
  const handleCreateAccount = () => {
    navigation.navigate("Signup"); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>QuickSOS Login</Text>

      <Text style={styles.label}>Enter Email:</Text>
      <TextInput
        autoComplete="email"
        textContentType="emailAddress"
        value={email}
        onChangeText={setEmail} 
        placeholder="Email"
        style={styles.input}
      />

      <Text style={styles.label}>Enter PIN:</Text>
      <TextInput
        value={pin}
        onChangeText={setPin} 
        keyboardType="numeric"
        secureTextEntry
        placeholder="PIN"
        style={styles.input}
      />

      <Button title="Unlock" onPress={handleLogin} />

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
    gap:5,
    justifyContent: "center",
    padding: 20,
    width: '100%',
  },
  signupLink:{
  color:"blue"
}

})
 

export default AuthScreen;
