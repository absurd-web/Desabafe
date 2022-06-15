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
const API_URL = 'http://10.99.30.61:5000';
const LoginScreen = ({navigation}) =>{
    
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const [hasValue,setHasValue] = useState(false);
    const [hasValue2,setHasValue2] = useState(false);

    const onLoggedIn = token => {
      fetch(`${API_URL}/private`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, 
          },
      })
      .then(async res => { 
          try {
              const jsonRes = await res.json();
              if (res.status === 200) {
                  setMessage(jsonRes.message);
              }
          } catch (err) {
              console.log(err);
          };
      })
      .catch(err => {
          console.log(err);
      });
    }
    const onSubmitHandler = () => {
      const payload = {
          email,
          name,
          password,
      };
      fetch(`${API_URL}/${isLogin ? 'login' : 'signup'}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
      })
      .then(async res => {
          try {
              const jsonRes = await res.json();
              if (res.status !== 200) {
                  setIsError(true);
                  setMessage(jsonRes.message);
              } else {
                  onLoggedIn(jsonRes.token);
                  setIsError(false);
                  setMessage(jsonRes.message);
              }
          } catch (err) {
              console.log(err);
          };
      })
      .catch(err => {
          console.log(err);
      });
    };

    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
    }

    return(
        <View style={styles.container}>
        <Text style={styles.title}>Desabafe</Text>
        <TextInput
          placeholder={'e-mail'}
          placeholderTextColor={'black'}
          textAlign={'center'}
          onChangeText={(value)=>{value == "" ? setHasValue(false) : setHasValue(true);setEmail(value);}}
          style={styles.input}
        />
        <TextInput
          placeholder={'senha'}
          placeholderTextColor={'black'}
          textAlign={'center'}
          onChangeText={(value)=>{value == "" ? setHasValue2(false) : setHasValue2(true); setPassword(value);}}
          style={styles.input}
        />
        <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
        <View style={styles.divisor}/>
        <View style={styles.sectorButtons}>
          <Pressable style={styles.buttonFilled} onPress={onSubmitHandler}>
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