import React,{ useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Pressable,
    Alert,
    Text,
    TextInput,
    useColorScheme,
    View,
} from 'react-native';
const LoginScreen = ({navigation}) =>{
    const [hasValue,setHasValue] = useState(false);
    const [hasValue2,setHasValue2] = useState(false);
    return(
        <View style={styles.container}>
        <Text style={styles.title}>Desabafe</Text>
        <TextInput
          placeholder={'e-mail'}
          placeholderTextColor={'black'}
          textAlign={'center'}
          onChangeText={(value)=>value == "" ? setHasValue(false) : setHasValue(true)}
          style={styles.input}
        />
        <TextInput
          placeholder={'senha'}
          placeholderTextColor={'black'}
          textAlign={'center'}
          onChangeText={(value)=>value == "" ? setHasValue2(false) : setHasValue2(true)}
          style={styles.input}
        />
        <View style={styles.divisor}/>
        <View style={styles.sectorButtons}>
          <Pressable style={styles.buttonFilled} onPress={()=>navigation.navigate('Chat')}>
            <Text style={styles.buttonText}>{hasValue || hasValue2 ? "Entrar" : 'Entrar Anonimamente'}</Text>
          </Pressable>
          <Pressable>
            <Text style={styles.buttonUnfilledText}>Esqueceu a senha?</Text>
          </Pressable>
        </View>
        <Pressable>
            <Text style={styles.buttonUnfilledText}>Cadastre-se</Text>
          </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
    divisor: {
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      minWidth: 280,
      marginVertical: 20,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 30,
    },
    input: {
      minWidth: 280,
      padding: 6,
      backgroundColor: 'grey',
      borderRadius: 30,
      marginBottom: 15,
    },
    sectorButtons: {
      marginBottom: 50,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
    },
    buttonFilled: {
      backgroundColor: 'black',
      padding: 15,
      marginBottom: 10,
      borderRadius: 30,
      minWidth: 280,
    },
    buttonUnfilledText: {
      color: 'black',
      textAlign: 'center',
    }
});
export default LoginScreen;