
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";


export const savePIN= async (pin)=>{
    await AsyncStorage.setItem("userPIN", pin)
}

export const saveEmail= async (email)=>{
    await AsyncStorage.setItem("userEmail", email)
}

export const verifyDetailsFromDB=async(emailInput, pinInput)=>{
    const userId = emailInput.replace(/[^a-zA-Z0-9]/g, '');
    const docRef = doc(db, "users", userId);
     try {
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return false;

    const userData = snapshot.data();
    return userData.pin === pinInput;
  } catch (error) {
    console.error("Error verifying user from Firestore:", error);
    return false;
  }
}

export const verifyDetailsFromAsyncStorage = async (emailInput, pinInput) => {
  const storedPIN = await AsyncStorage.getItem("userPIN");
  const storedEmail = await AsyncStorage.getItem("userEmail");
  if (storedPIN === pinInput && storedEmail === emailInput) {
    return "valid";
  } else {
    return "invalid";
  }
};

export const hasPIN = async ()=>{
    const pin = await AsyncStorage.getItem("userPIN");
    return pin !== null
}

export const VerifyEmail = async(input)=>{
    const storedEmail = await AsyncStorage.getItem("userEmail")
    return storedEmail === input
}