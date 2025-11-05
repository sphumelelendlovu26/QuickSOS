import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";



export const verifyDetailsFromDB = async (emailInput, pinInput) => {
  const userId = emailInput.replace(/[^a-zA-Z0-9]/g, "");
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
};

export const getDetailsFromDb = async (email, pin) => {
  const userId = email.replace(/[^a-zA-Z0-9]/g, "");
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return data.email.toLowerCase() === email.toLowerCase() && data.pin === pin;
  } else {
    return false;
  }
};
