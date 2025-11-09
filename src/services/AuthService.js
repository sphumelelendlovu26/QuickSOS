import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { getItem } from "expo-secure-store";

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

export const getDataFromDb = async (email) => {
  const userId = email.replace(/[^a-zA-Z0-9]/g, "");
  const docRef = doc(db, "users", userId);

  try {
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;

    const userData = snapshot.data();
    return {
      name: userData.name || "",
      surname: userData.surname || "",
      email: userData.email || "",
      pin: userData.pin || "",
      trustedContacts: userData.trustedContacts || [],
    };
  } catch (error) {
    console.error("Sync error", error);
  }
};

export const updateUserInDb = async (email, updatedData) => {
  try {
    const userId = email.replace(/[^a-zA-Z0-9]/g, "");
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, updatedData);

    return true;
  } catch (e) {
    console.error("Error updating user in Firestore:", error);
    return false;
  }
};

export const syncUserData = async () => {
  try {
    const email = await getItem("email");
    const localRaw = await getItem("userData");

    const cloudData = await getDataFromDb(email);

    if (localRaw && cloudData) {
      const localData = JSON.parse(localRaw);
      if (JSON.stringify(localData) !== JSON.stringify(cloudData)) {
        await updateUserInDb(email, localData);
        return true;
      }
    }
  } catch (e) {
    console.error(e);
    alert("cannot sync data");
    return false;
  }
};
