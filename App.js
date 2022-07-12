import React,{ useState } from 'react';
import { Button } from 'react-native';
import type {Node} from 'react';
import SplashScreen from './components/screens/SplashScreen';
import LoginScreen from './components/screens/LoginScreen';
import ChatScreen from './components/screens/ChatScreen';
import AdminScreen from './components/screens/AdminScreen';
import MensagensScreen from './components/screens/MensagensScreen';
import MessageScreen from './components/screens/MessageScreen';
import SentScreen from './components/screens/SentScreen';
import ConfigScreen from './components/screens/ConfigScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConfigButton from './components/ConfigButton';
import ReturnButton from './components/ReturnButton';
import AboutScreen from './components/screens/AboutScreen';

const Stack = createNativeStackNavigator();
const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle:{ backgroundColor: '#FFBB00',},
        headerTitleStyle:{ fontFamily:'Roboto-Bold', fontSize: 23, },
      }} initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} initialParams={{ goal: 'Chat' }} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen 
          name="Chat" 
          component={ChatScreen} 
          options={({navigation}) =>({headerTitle: '',headerRight: ()=> <ConfigButton onPress={()=>navigation.navigate('Splash',{goal: 'Config'})} />,
            headerBackImage: ()=> <ReturnButton />,})}/>
        <Stack.Screen name="Admin" component={AdminScreen} options={({navigation}) =>({headerTitle: '',headerRight: ()=> <ConfigButton onPress={()=>navigation.navigate('Splash',{goal: 'Config'})} />,})}/>
        <Stack.Screen name="AdminMensagens" component={MensagensScreen} options={({navigation}) =>({headerTitle: '',headerRight: ()=> <ConfigButton onPress={()=>navigation.navigate('Splash',{goal: 'Config'})} />,})}/>
        <Stack.Screen 
          name="Mensagem" 
          component={MessageScreen} 
          options={({navigation}) =>({headerTitle: 'Escreva seu relato',headerRight: ()=> <ConfigButton onPress={()=>navigation.navigate('Splash',{goal: 'Config'})} />,})}/>
        <Stack.Screen
          name="Sent" 
          component={SentScreen}
          options={{headerShown: false}}/>
        <Stack.Screen 
          name="Config" 
          component={ConfigScreen} 
          options={{headerTitle: 'Configurações'}}/>
        <Stack.Screen
          name="About"
          component={AboutScreen}
  options={({navigation}) =>({headerTitle: 'Sobre'})}/>
      </Stack.Navigator>
    </NavigationContainer>
  );  
};
export default App;
