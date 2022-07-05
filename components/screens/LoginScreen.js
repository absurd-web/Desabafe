import React,{ useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    Image,
} from 'react-native';
//const API_URL = 'http://192.168.0.4:5000';
//const API_URL = 'http://10.99.30.61:5000';
const API_URL = 'http://10.0.0.104:5000';
const LoginScreen = ({navigation}) =>{
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const [hasValue,setHasValue] = useState(false);
    const [hasValue1,setHasValue1] = useState(false);
    const [hasValue2,setHasValue2] = useState(false);
    const [hasValue3,setHasValue3] = useState(false);
    const inputValues = [hasValue,hasValue1,hasValue2,hasValue3];
    const onChangeHandler = () =>{
      setIsLogin(!isLogin);
      setMessage('');
    }
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
                navigation.navigate('Chat');
              }
          } catch (err) {
              console.log(err);
          };
      })
      .catch(err => {
          console.log(err);
      });
    }
    const inputValidated = () => {
      if(isLogin){
        if(hasValue1 != hasValue2){
          setIsError(true);
          setMessage('Preencha todos os campos ou apague todos para entrar anonimamente');
          return false;
        }else{
          return true;
        }
      }else{
        if(!(inputValues.every(value=>value==true))){
          setIsError(true);
          setMessage('Preencha todos os campos');
          return false;
        }else{
          if(password != confirmPassword){
            setIsError(true);
            setMessage('Senhas não batem');
            return false;
          }else{
            return true;
          }
        }
      }
    }
    const onSubmitHandler = () => {
      if(inputValidated()){
        if(!(email == '')){
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
                      if(isLogin){
                        await AsyncStorage.setItem('@token', jsonRes.token);
                        onLoggedIn(jsonRes.token);
                        setIsError(false);
                        setMessage(jsonRes.message);
                      }else{
                        setIsLogin(true);
                        setIsError(false);
                        setMessage(jsonRes.message);
                      }
                  }
              } catch (err) {
                  console.log(err);
              };
          })
          .catch(err => {
              console.log(err);
          });
        }else{
          fetch(`${API_URL}/loginAnon`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
          })
          .then(async res => {
              try {
                  const jsonRes = await res.json();
                  if (res.status !== 200) {
                      setIsError(true);
                      setMessage(jsonRes.message);
                  } else {
                      await AsyncStorage.setItem('@token', jsonRes.token);
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
        }
      };
    }
    const getMessage = () => {
        const status = isError ? `Erro: ` : `Sucesso: `;
        return status + message;
    }
    
    //Imagem do ícone
    const displayImage = () => {
      return (
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require('./images/desabafe_logo.png')}
          />
        </View>
      );
    }

    return(
        <View style={styles.container}>
        <Text style={styles.title}>Desabafe</Text>
        {!isLogin &&
        <TextInput
          placeholder={'Nome'}
          placeholderTextColor={'black'}
          textAlign={'center'}
          onChangeText={(value)=>{value == "" ? setHasValue(false) : setHasValue(true);setName(value);}}
          style={styles.input}
        />}
        <TextInput
          placeholder={'E-mail'}
          placeholderTextColor={'black'}
          textAlign={'center'}
          onChangeText={(value)=>{value == "" ? setHasValue1(false) : setHasValue1(true);setEmail(value);}}
          style={styles.input}
        />
        <TextInput
          secureTextEntry={true}
          placeholder={'Senha'}
          placeholderTextColor={'black'}
          textAlign={'center'}
          onChangeText={(value)=>{value == "" ? setHasValue2(false) : setHasValue2(true); setPassword(value);}}
          style={styles.input}
        />
        {!isLogin &&
        <TextInput
          secureTextEntry={true}
          placeholder={'Confirmar senha'}
          placeholderTextColor={'black'}
          textAlign={'center'}
          onChangeText={(value)=>{value == "" ? setHasValue3(false) : setHasValue3(true); setConfirmPassword(value);}}
          style={styles.input}
        />}
        <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
        <View style={styles.divisor}/>
        <View style={styles.sectorButtons}>
          <Pressable style={styles.buttonFilled} onPress={onSubmitHandler}>
            <Text style={styles.buttonText}>{isLogin ? hasValue1 || hasValue2 ? "Entrar" : 'Entrar anonimamente' : 'Criar conta'}</Text>
          </Pressable>
          <Pressable>
            <Text style={styles.buttonUnfilledText}>Esqueceu a senha?</Text>
          </Pressable>
        </View>
        <Pressable  onPress={onChangeHandler}>
            <Text style={styles.buttonUnfilledText}>{isLogin ? "Cadastre-se" : 'Voltar ao Log-in'}</Text>
          </Pressable>
    </View>
  );
};


//Styles

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    divisor: {
      borderBottomColor: '#181D27',
      borderBottomWidth: 1,
      minWidth: 280,
      marginVertical: 25,
      marginBottom: 35,
      marginTop:10,
    },
    title: {
      fontFamily:'AmaticSC-Regular',
      fontSize: 50,
      marginBottom: 30,
      color: 'black',
    },
    input: {
      fontFamily:'Roboto-Regular',
      fontSize:17,
      minWidth: 280,
      padding: 8,
      backgroundColor: '#D2D7DF',
      borderRadius: 30,
      marginBottom: 8,
    },
    sectorButtons: {
      marginBottom: 50,
    },
    buttonText: {
      fontFamily:'Roboto-Bold',
      fontSize:15,
      color: 'black',
      textAlign: 'center',
    },
    buttonFilled: {
      backgroundColor: '#FFBB00',
      fontFamily:'Roboto-Light',
      padding: 20,
      marginBottom: 20,
      borderRadius: 30,
      minWidth: 280,
    },
    buttonUnfilledText: {
      fontFamily:'Roboto-Light',
      color: 'black',
      textAlign: 'center',
    },
    logo: {
      width: 100,
      height: 100,
    }
});

export default LoginScreen;
