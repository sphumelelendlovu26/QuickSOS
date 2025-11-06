import { handleSOS } from "../services/HandleSOS";
import EmergencyButton from "../components/EmergencyButton";
import { StyleSheet, Button, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { getDataFromDb } from "../services/AuthService";
import * as SecureStore from "expo-secure-store";
import { getItem } from "expo-secure-store";
import { syncUserData } from "../services/AuthService";

const EmergencyScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const cacheUserDataFromDb = async () => {
      const cached = await SecureStore.getItemAsync("userData");
      if (!cached) {
        const email = await getItem("email");
        const userData = await getDataFromDb(email);
        await SecureStore.setItemAsync("userData", JSON.stringify(userData));
        alert("user Data cached");
      }
    };

    cacheUserDataFromDb();
    syncUserData();
  }, []);

  return (
    <View style={styles.container}>
      <EmergencyButton onPress={handleSOS} />
      <View style={styles.accountBtnWrapper}>
        <Button
          title="Account"
          onPress={() => navigation.navigate("Profile")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  accountBtnWrapper: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default EmergencyScreen;
