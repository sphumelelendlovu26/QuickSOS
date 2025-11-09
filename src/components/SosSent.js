import { View, Text, TouchableOpacity } from "react-native";
const SosSent = ({ setSosSuccessful }) => {
  const closeConfirmation = () => {
    setSosSuccessful(false);
  };

  return (
    <View
      style={{
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        position: "absolute",
        zIndex: 10,
        bottom: "15%",
        padding: 5,
        width: "100%",
        flexDirection: "row",
      }}
    >
      <Text
        style={{
          fontSize: 16,
          color: "#32CD32",
        }}
      >
        SOS Sent To Your Contacts!
      </Text>
      <TouchableOpacity
        onPress={closeConfirmation}
        style={{
          backgroundColor: "#2196F3",
          paddingHorizontal: 0,
          paddingVertical: 0,
          height: 40,
          width: 40,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
        }}
      >
        <Text>OK</Text>
      </TouchableOpacity>
    </View>
  );
};
export default SosSent;
