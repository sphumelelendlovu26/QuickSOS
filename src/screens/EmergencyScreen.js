import { handleSOS } from "../services/HandleSOS";
import EmergencyButton from "../components/EmergencyButton";
import { StyleSheet, View } from "react-native";

const EmergencyScreen = () => {
  return (
    <View style={styles.container}>
      <EmergencyButton onPress={handleSOS} />;
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EmergencyScreen;
