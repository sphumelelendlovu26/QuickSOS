import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
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

  const saveUserData = async (updatedUserData) => {
    setUserData(updatedUserData);
    await SecureStore.setItemAsync("userData", JSON.stringify(updatedUserData));
    await updateUserInDb(updatedUserData.email, updatedUserData);
  };

  const handleSaveContact = async () => {
    if (!newContact.name.trim() || !newContact.phone.trim()) {
      alert("Please enter both name and phone.");
      return;
    }

    const updatedContacts = [
      ...(userData.trustedContacts || []),
      { name: newContact.name.trim(), phone: newContact.phone.trim() },
    ];

    const updatedUserData = { ...userData, trustedContacts: updatedContacts };
    await saveUserData(updatedUserData);

    setNewContact({ name: "", phone: "" });
    setAddingContact(false);
  };

  const handleDeleteContact = async (index) => {
    const updatedContacts = userData.trustedContacts.filter(
      (_, i) => i !== index
    );
    const updatedUserData = { ...userData, trustedContacts: updatedContacts };
    await saveUserData(updatedUserData);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={styles.text}>{userData?.name}</Text>
      <Text style={styles.text}>{userData?.surname}</Text>
      <Text style={styles.text}>{userData?.email}</Text>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: "bold" }}>Your Trusted Contacts:</Text>
        {Array.isArray(userData?.trustedContacts) &&
        userData?.trustedContacts.length > 0 ? (
          userData.trustedContacts.map((contact, index) => (
            <View
              key={index}
              style={{
                marginVertical: 5,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>
                {contact.name} - {contact.phone}
              </Text>
              <TouchableOpacity
                onPress={() => handleDeleteContact(index)}
                activeOpacity={0.7}
                style={styles.deleteBtn}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text>No trusted contacts found.</Text>
        )}

        {!addingContact ? (
          <TouchableOpacity
            onPress={() => setAddingContact(true)}
            activeOpacity={0.7}
            style={styles.addBtn}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Add another contact
            </Text>
          </TouchableOpacity>
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
            <TouchableOpacity
              onPress={handleSaveContact}
              activeOpacity={0.7}
              style={styles.saveBtn}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Save Contact
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginBottom: 5,
    fontSize: 16,
  },
  deleteBtn: {
    backgroundColor: "red",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 4,
  },
  addBtn: {
    backgroundColor: "blue",
    padding: 10,
    marginTop: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  saveBtn: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
});

export default ProfileScreen;
