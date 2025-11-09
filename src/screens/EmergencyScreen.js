import { handleSOS } from "../services/HandleSOS";
import EmergencyButton from "../components/EmergencyButton";
import {
  StyleSheet,
  Button,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, lazy, Suspense } from "react";
import { getDataFromDb } from "../services/AuthService";
import * as SecureStore from "expo-secure-store";
import { getItem } from "expo-secure-store";
import { syncUserData } from "../services/AuthService";
import SosSent from "../components/SosSent";

const EmergencyScreen = () => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [sosSuccessful, setSosSuccessful] = useState(true);

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
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" color="red" />
          <Text
            style={{
              color: "red",
            }}
          >
            Alerting Your Contacts...
          </Text>
        </View>
      ) : (
        <>
          {sosSuccessful && <SosSent setSosSuccessful={setSosSuccessful} />}
          <EmergencyButton
            onPress={() => handleSOS(setIsLoading, setSosSuccessful)}
          />
        </>
      )}
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
