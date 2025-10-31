import AsyncStorage from "@react-native-async-storage/async-storage";

export const savePIN= async (pin)=>{
    await AsyncStorage.setItem("userPIN", pin)
}

export const verifyPIN =async (input)=>{
    const storedPIN = await AsyncStorage.getItem("userPIN")
    return storedPIN === input
}

export const hasPIN = async ()=>{
    const pin = await AsyncStorage.getItem("userPIN");
    return pin !== null
}

export const VerifyEmail = async(input)=>{
    const storedEmail = await AsyncStorage.getItem("userEmail")
    return storedEmail === input
}