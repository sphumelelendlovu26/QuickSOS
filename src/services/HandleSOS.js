import { getCurrentLocation } from "./LocationService";
import { Linking } from "react-native";
import { getItem } from "./secureStore";

export const handleSOS = async () => {
  try {
    const location = await getCurrentLocation();
    const email = await getItem("email");
    alert(email);
    if (!email) {
      console.error("Email not found in Secure Store");
      return;
    }
    const userId = email.replace(/[^a-zA-Z0-9]/g, "");
    const docRef = doc(db, "users", userId);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      return;
    }

    const userData = snapshot.data();

    userData.trustedContacts?.forEach((contact) => {
      const message = `QuickSOS! Hey ${contact.name}, I need help! My location: https://maps.google.com/?q=${location.latitude},${location.longitude}`;
      const url = `whatsapp://send?phone=${
        contact.phone
      }&text=${encodeURIComponent(message)}`;
      Linking.openURL(url);
    });
  } catch (error) {
    console.error("Location error:", error.message);
  }
};
