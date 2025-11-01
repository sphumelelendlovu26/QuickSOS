
import { StyleSheet, Text, View } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import { Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { hasPIN } from './src/services/AuthService';

import AuthScreen from './src/screens/AuthScreen';
import EmergencyScreen from './src/screens/EmergencyScreen.js';
import SignupScreen from "./src/screens/SignupScreen"

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack= createNativeStackNavigator()

export default function App() {
  const [hasPin, setHasPin] = useState(null)
  const [authenticated, setAuthenticated] = useState(false)  
  const [hasAccount, setHasAccount] = useState(true)
  

  if (Platform.OS !== 'web') {
  useKeepAwake();
}

  useEffect(()=>{
    const CheckPIN = async()=>{
      const exist = await hasPIN()
        setHasPin(exist)
    }
    CheckPIN()
    console.log(AsyncStorage)
  },[])

  // if(hasPin===null) return null

  // if(!hasPin===null) return <PinSetupScreen onSetupComplete={()=>setHasPin(true)}/>

  // if(!authenticated){
  //   return <AuthScreen onAuthSuccess={()=>setAuthenticated(true)}/>
  // }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          {!authenticated ? <>
            <Stack.Screen name='Auth'>
                {() => (
                  <AuthScreen
                    onAuthSuccess={() => setAuthenticated(true)}
                  />
                )}
            </Stack.Screen>
              <Stack.Screen name="Signup">
                {() => (
                  <SignupScreen onSetupComplete={() => setAuthenticated(true)} />
                )}
              </Stack.Screen>
          </> : <Stack.Screen name='Emergency' component={EmergencyScreen}/>}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}    



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    width: '100%', 
    padding:10,
  },
});
