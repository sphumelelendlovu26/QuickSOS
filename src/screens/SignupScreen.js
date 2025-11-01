import {View, Button,Text, TextInput, StyleSheet} from "react-native"
import { useState } from "react"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../firebase/firebaseConfig"
import { savePIN } from "../services/AuthService"


const SignupScreen=({onSetupComplete})=>{

        const [name, setName] = useState("")
        const [surname,setSurname] = useState("")
        const [email, setEmail]= useState("")
        const [pin, setPIN] = useState("")
        const [confirmPin, setConfirmPin] = useState('');
        const [error, setError] = useState('');


         const saveUserDetails = async ()=>{
        const userId = email.replace(/[^a-zA-Z0-9]/g, '')
        const userData = {
            name, surname, email,pin, trustedContacts:[]
        }
        try{
            await setDoc(doc(db, "users", userId), userData)
            alert("user Saved to Firestore")

        } 
        catch(error){
             console.error('Error saving user:', error);
            setError('Failed to save user');
        }
      }
    
        const handleSave = async () => {
            if (pin.length < 4) {
                setError('PIN must be at least 4 digits');
            } else if (pin !== confirmPin) {
             setError('PINs do not match');
                } else {
                await savePIN(pin);
                 onSetupComplete();
                 saveUserDetails()
        }
      };

     
    
    return ( 
     <View>
        <View>
            <Text>Enter Your Details</Text>
            <TextInput value={name} onChangeText={setName} placeholder="Name" 
            style={styles.TextInput}
            />
            <TextInput  style={styles.TextInput} value={surname} onChangeText={setSurname} placeholder="Surname"/>
            <TextInput  style={styles.TextInput} placeholder="Email" value={email} onChangeText={setEmail } />
        </View>
        <View>
            <Text>Create a PIN</Text>
            <TextInput     
                    
             style={styles.TextInput}
            value={pin}
            onChangeText={setPIN}
            secureTextEntry
            keyboardType="numeric"
            placeholder="Enter PIN"
            />
            <TextInput  style={styles.TextInput}
            value={confirmPin}
            onChangeText={setConfirmPin}
            secureTextEntry
            keyboardType="numeric"
            placeholder="Confirm PIN"
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            
        </View>
        <View style={styles.BtnContainer}>
            <Button title="Signup" onPress={handleSave} />
            </View>
    </View>)
}

const styles=StyleSheet.create({
    container:{
        flex:1, display: "flex", flexDirection: "column", alignItems:"center", height:"100%", 
    },
    TextInput:{
        marginLeft: 5,
        borderBottomWidth:1
    },
    BtnContainer:{
        marginTop:10,
        gap:3
    }
})

export default SignupScreen