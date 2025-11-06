import { View, Text, TextInput, Button } from "react-native";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const ProfileScreen = () => {
  const [userData, setUserData] = useState({});
  const [addingContact, setAddingContact] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", phone: "" });

  useEffect(() => {
    const fetchDataFromSecureStore = async () => {
      const cached = await SecureStore.getItemAsync("userData");
      if (cached) {
        setUserData(JSON.parse(cached));
      }
    };
    fetchDataFromSecureStore();
  }, []);

  const handleSaveContact = async () => {
    const updatedContacts = [
      ...(userData.trustedContacts || []),
      { name: newContact.name, phone: newContact.phone },
    ];

    const updatedUserData = { ...userData, trustedContacts: updatedContacts };
    setUserData(updatedUserData);
    await SecureStore.setItemAsync("userData", JSON.stringify(updatedUserData));
    await updateUserInDb(updatedUserData.email, updatedUserData);
    setNewContact({ name: "", phone: "" });
    setAddingContact(false);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Name: {userData?.name}</Text>
      <Text>Surname: {userData?.surname}</Text>
      <Text>Email: {userData?.email}</Text>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: "bold" }}>Your Trusted Contacts:</Text>
        {Array.isArray(userData?.trustedContacts) &&
        userData?.trustedContacts.length > 0 ? (
          userData.trustedContacts.map((contact, index) => (
            <View key={index} style={{ marginVertical: 5 }}>
              <Text>
                {contact.name} - {contact.phone}
              </Text>
            </View>
          ))
        ) : (
          <Text>No trusted contacts found.</Text>
        )}

        {!addingContact ? (
          <Button
            title="Add another contact"
            onPress={() => setAddingContact(true)}
          />
        ) : (
          <View style={{ marginTop: 10 }}>
            <TextInput
              placeholder="Name"
              value={newContact.name}
              onChangeText={(text) =>
                setNewContact({ ...newContact, name: text })
              }
              style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />
            <TextInput
              placeholder="Phone"
              value={newContact.phone}
              onChangeText={(text) =>
                setNewContact({ ...newContact, phone: text })
              }
              style={{ borderBottomWidth: 1, marginBottom: 10 }}
              keyboardType="phone-pad"
            />
            <Button title="Save Contact" onPress={handleSaveContact} />
          </View>
        )}
      </View>
    </View>
  );
};

export default ProfileScreen;
