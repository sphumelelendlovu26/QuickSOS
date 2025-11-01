import { getCurrentLocation } from "./LocationService";
import { Linking } from "react-native";
export const handleSOS = async()=>{
    try{
        const location = await getCurrentLocation()
        console.log("Location :", location)
         
        const message = ` QuickSOS! I need help! my location:  https://maps.google.com/?q=${location.latitude},${location.longitude}`
        
        const phoneNumber = "0623548715s" 
        const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
        Linking.openURL(url)
    }
    catch (error){
        console.error("Location error:", error.message)
    }
}