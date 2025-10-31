import { useState } from "react"
import { TextInput, View } from "react-native"
import { VerifyEmail } from "../services/AuthService"


const NameSetup=()=>{
    const [name, setName] = useState("")
    const [surname,setSurname] = useState("")
    const [email, setEmail]= useState("")


    return(
        <View>
            <TextInput value={name} onChangeText={setName} placeholder="Name" />
            <TextInput value={surname} onChangeText={setSurname} placeholder="Surname"/>
            <TextInput value={email} onChangeText={setEmail } />
        </View>
    )
}

export default NameSetup