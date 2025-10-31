import { useState } from "react"
import { StyleSheet, Text, TextInput, View, Button} from "react-native"

const PinSetupScreen= ({onSetupComplete})=>{
    
    const [pin, setPIN] = useState("")
    const [confirmPin, setConfirmPin] = useState('');
    const [error, setError] = useState('');

      const handleSave = async () => {
    if (pin.length < 4) {
      setError('PIN must be at least 4 digits');
    } else if (pin !== confirmPin) {
      setError('PINs do not match');
    } else {
      await savePIN(pin);
      onSetupComplete();
    }
  };

    return(
    <View>
        <Text>Create a PIN</Text>
        <TextInput>
            style={styles.input}
            value={pin}
            onChangeText={setPIN}
            secureTextEntry
            keyboardType="numeric"
            placeholder="Enter PIN"
        </TextInput>
          <TextInput>
            style={styles.input}
            value={confirmPin}
            onChangeText={setConfirmPin}
            secureTextEntry
            keyboardType="numeric"
            placeholder="Confirm PIN"
        </TextInput>
         {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Save PIN" onPress={handleSave} />
    </View>)
}

const styles = StyleSheet.create({
     container: { padding: 20 },
  label: { fontSize: 18, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 10,
    borderRadius: 5,
  },
  error: { color: 'red', marginBottom: 10 },
})
export default PinSetupScreen