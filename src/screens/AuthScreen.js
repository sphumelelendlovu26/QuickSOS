import { useState } from "react"
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { verifyPIN } from "../services/AuthService";
import { VerifyEmail } from "../services/AuthService";

const AuthScreen = ({onAuthSuccess, onCreateAccount})=>{

    const [pin, setPin] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] =useState("")
    
    const handleLogin= async()=>{
        const validPin = await verifyPIN(pin)
        const validEmail = await VerifyEmail(email)
        if(validPin && validEmail){
            onAuthSuccess()
        }
        else{
            setError("Incorrect Email/PIN")
        }
    }

    const handleCreateAccount = ()=>{
        onCreateAccount()
    }

    return(
        <View style={styles.container}>
            <Text style={styles.text}>Enter Email:</Text>
            <TextInput 
                autoComplete="email"
                textContentType="emailAddress"
                value={email}
                onChange={setEmail}
                secureTextEntrys
                placeholder="Enter Email"
            ></TextInput>
            <Text style={styles.text}>Enter PIN:</Text>
            <TextInput 
                value={pin}
                onChange={setPin}
                keyboardType="numeric"
                secureTextEntry
                placeholder="Enter Pin"
            ></TextInput>
            <Button title="Unlock" onPress={handleLogin}></Button>
            {error && <Text style={{color:"red"}}>{error}</Text>}

            <Text>New To QuickSOS ?
                <Text onPress={handleCreateAccount}>
                    Create An Account Here
                </Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        display: "flex",
        justifyContent: "center",
        borderWidth: 0,
        width: '100%',
        flexDirection: "column"
    },
    text:{
        textAlign:"starts",
        marginVertical: 3
    }
})

export default AuthScreen