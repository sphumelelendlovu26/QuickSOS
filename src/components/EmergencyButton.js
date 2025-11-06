import { TouchableOpacity, Text, StyleSheet } from "react-native";

const EmergencyButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.Button}>
      <Text style={styles.Text}>SEND SOS</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Button: {
    backgroundColor: "#e53935",
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 150,
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  Text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default EmergencyButton;
