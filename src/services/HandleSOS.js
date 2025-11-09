import { getCurrentLocation } from "./LocationService";
import { Linking } from "react-native";
import { getItem } from "./secureStore";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";

export const handleSOS = async (setIsLoading, setSosSuccessful) => {
  try {
    setIsLoading(true);
    setSosSuccessful(false);
    const location = await getCurrentLocation();
    const email = await getItem("email");

    if (!email) {
      console.error("Email not found in Secure Store");
      setIsLoading(false);
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

    const backendResponse = await fetch("http://192.168.0.196:3000/emergency", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: email,
        location: `${location.latitude}, ${location.longitude}`,
      }),
    });

    const result = await backendResponse.json();

    console.log("Backend response:", result);

    setIsLoading(false);
    setSosSuccessful(true);
  } catch (error) {
    console.error("SOS error:", error.message);
    alert(
      "Unable to send SOS. Please check your location and contact settings."
    );
  }
};
