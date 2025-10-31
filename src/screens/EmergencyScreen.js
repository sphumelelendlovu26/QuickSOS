import { handleSOS } from "../services/HandleSOS";
import EmergencyButton from"../components/EmergencyButton"

const EmergencyScreen = ()=>{
    return(
        <EmergencyButton onPress={handleSOS} >
        </EmergencyButton>
    )
}

export default EmergencyScreen