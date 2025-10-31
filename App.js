
import { StyleSheet, Text, View } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
// import EmergencyScreen from './src/components/EmergencyScreen';
import { useEffect, useState } from 'react';
import { hasPIN } from './src/services/AuthService';
// import PinSetupScreen from './src/screens/PinSetupScreen';
import AuthScreen from './src/screens/AuthScreen';
import EmergencyScreen from './src/screens/EmergencyScreen.js';



export default function App() {
  const [hasPin, setHasPin] = useState(null)
  const [authenticated, setAuthenticated] = useState(false)  
  const [hasAccount, setHasAccount] = useState(true)
  useKeepAwake(); // Prevents screen from sleeping

  useEffect(()=>{
    const CheckPIN = async()=>{
      const exist = await hasPIN(
        setHasPin(exist)
      )
    }
    CheckPIN()
  },[])

  // if(hasPin===null) return null

  // if(!hasPin===null) return <PinSetupScreen onSetupComplete={()=>setHasPin(true)}/>

  // if(!authenticated){
  //   return <AuthScreen onAuthSuccess={()=>setAuthenticated(true)}/>
  // }

  return (
    <View style={styles.container}>
      
      {!authenticated &&
        <AuthScreen 
          onCreateAccount={()=>setHasAccount(false)}
          onAuthSuccess={()=>setAuthenticated(true) }/> }
      
      {authenticated && <EmergencyScreen />}

    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
width: '100%', padding:10
  },
});
