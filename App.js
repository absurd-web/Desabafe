import React,{ useState } from 'react';
import { Button } from 'react-native';
import type {Node} from 'react';
import SplashScreen from './components/screens/SplashScreen';
import LoginScreen from './components/screens/LoginScreen';
import ChatScreen from './components/screens/ChatScreen';
import MessageScreen from './components/screens/MessageScreen';
import ConfigScreen from './components/screens/ConfigScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConfigButton from './components/ConfigButton';

const Stack = createNativeStackNavigator();
const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} initialParams={{ goal: 'Chat' }} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Chat" component={ChatScreen} options={({navigation}) =>({headerTitle: '',headerRight: ()=> <ConfigButton onPress={()=>navigation.navigate('Splash',{goal: 'Config'})} />,})}/>
        <Stack.Screen name="Mensagem" component={MessageScreen} options={({navigation}) =>({headerTitle: 'Escreva seu relato',headerRight: ()=> <ConfigButton onPress={()=>navigation.navigate('Splash',{goal: 'Config'})} />,})}/>
        <Stack.Screen name="Config" component={ConfigScreen} options={{headerTitle: 'Configurações'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );  
};
export default App;
