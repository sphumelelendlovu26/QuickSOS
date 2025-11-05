import * as SecureStore from "expo-secure-store";

export const saveItem = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
};

export const getItem = async (key) => {
  return SecureStore.getItemAsync(key);
};

export const deleteItem = async (key) => {
  SecureStore.deleteItemAsync(key);
};

export const loadSecureData = async () => {
  try {
    const email = await SecureStore.getItemAsync("email");
    const pin = await SecureStore.getItemAsync("pin");
    return { email, pin };
  } catch (error) {
    console.error("Failed to load secure data:", error);
    return { email: null, pin: null };
  }
};
