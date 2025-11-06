import { getCurrentLocation } from "./LocationService";
import { Linking } from "react-native";
import { getItem } from "./secureStore";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import * as SecureStore from "expo-secure-store";

export const handleSOS = async () => {
  try {
    const location = await getCurrentLocation();
    const email = await getItem("email");

    if (!email) {
      console.error("Email not found in Secure Store");
      return;
    }

    // 1. Try local first
    let userData;
    const cached = await SecureStore.getItemAsync("userData");
    if (cached) {
      userData = JSON.parse(cached);
    }

    // 2. If no local data, fetch from Firestore
    if (!userData) {
      const userId = email.replace(/[^a-zA-Z0-9]/g, "");
      const docRef = doc(db, "users", userId);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        userData = snapshot.data();
      } else {
        console.error("User not found in Firestore");
        return;
      }
    }

    // 3. Send SOS to trusted contacts
    for (const contact of userData.trustedContacts) {
      const message = `QuickSOS! Hey ${contact.name}, I am in danger! My location: https://maps.google.com/?q=${location.latitude},${location.longitude}`;
      const formattedPhone = contact.phone.startsWith("+")
        ? contact.phone
        : `+27${contact.phone.replace(/^0/, "")}`;

      const url = `whatsapp://send?phone=${formattedPhone}&text=${encodeURIComponent(
        message
      )}`;
      await Linking.openURL(url); // Wait for user to return before continuing
    }
  } catch (error) {
    console.error("SOS error:", error.message);
    alert(
      "Unable to send SOS. Please check your location and contact settings."
    );
  }
};
