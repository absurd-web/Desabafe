import React,{ useState } from 'react';
import type {Node} from 'react';
import LoginScreen from './components/screens/LoginScreen';
import ChatScreen from './components/screens/ChatScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Chat" component={ChatScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );  
};
export default App;
