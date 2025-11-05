import { View, Button, Text, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { saveItem } from "../services/secureStore";

console.log("Firebase db:", db);

const SignupScreen = ({ onSetupComplete }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPIN] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [trustedContacts, setTrustedContacts] = useState([]);

  const saveContactToDB = async () => {
    const userId = email.replace(/[^a-zA-Z0-9]/g, "");
    const docRef = doc(db, "users", userId);

    try {
      await updateDoc(docRef, {
        trustedContacts: [
          ...trustedContacts,
          { name: contactName, phone: contactPhone },
        ],
      });
      alert("Contact saved to Firestore");
    } catch (error) {
      alert("Error saving contact:", error);
    }
  };

  const saveContact = () => {
    if (!contactName || !contactPhone) return;

    const newContact = {
      name: contactName,
      phone: contactPhone,
    };

    setTrustedContacts((prev) => [...prev, newContact]);
    saveContactToDB();
    setContactName("");
    setContactPhone("");
  };

  const saveUserDetailsToDB = async () => {
    const userId = email.replace(/[^a-zA-Z0-9]/g, "");
    const userData = {
      name,
      surname,
      email,
      pin,
      trustedContacts,
    };
    try {
      await setDoc(doc(db, "users", userId), userData);
      alert("Account Created");
      // console.log('Saving user:', userData);
    } catch (error) {
      console.error("Error saving user:", error.message);
      setError("Failed To Create Account");
    }
  };

  const handleSave = async () => {
    if (pin.length < 4) {
      setError("PIN must be at least 4 digits");
    } else if (pin !== confirmPin) {
      setError("PINs do not match");
    } else {
      await saveUserDetailsToDB();
      await saveItem("email", email);
      await saveItem("pin", pin);
      onSetupComplete();
    }
  };

  return (
    <View>
      <View style={styles.detailsContainer}>
        <Text>Enter Your Details</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Name"
          style={styles.TextInput}
        />
        <TextInput
          style={styles.TextInput}
          value={surname}
          onChangeText={setSurname}
          placeholder="Surname"
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View>
        <Text>Create a PIN</Text>
        <TextInput
          style={styles.TextInput}
          value={pin}
          onChangeText={setPIN}
          secureTextEntry
          keyboardType="numeric"
          placeholder="Enter PIN"
        />
        <TextInput
          style={styles.TextInput}
          value={confirmPin}
          onChangeText={setConfirmPin}
          secureTextEntry
          keyboardType="numeric"
          placeholder="Confirm PIN"
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
      <View>
        <Text>Add Trusted Number To Send SOS TO</Text>
        <TextInput
          placeholder="name"
          value={contactName}
          onChangeText={setContactName}
        />
        <TextInput
          placeholder="Contact Number"
          keyboardType="numeric"
          value={contactPhone}
          onChangeText={setContactPhone}
        />
        <Button title="Add Contact" onPress={saveContact} />
      </View>
      <View style={styles.BtnContainer}>
        <Button title="Signup" onPress={handleSave} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    gap: 10,
  },
  TextInput: {
    marginLeft: 5,
    borderBottomWidth: 1,
  },
  BtnContainer: {
    marginTop: 10,
    gap: 3,
  },
  detailsContainer: {},
});

export default SignupScreen;
