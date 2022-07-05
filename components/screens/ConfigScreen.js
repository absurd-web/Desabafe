import React,{ useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet,
    Pressable,
    Text,
    View,
} from 'react-native';
const API_URL = 'http://192.168.100.5:5000';
const ConfigScreen = ({route, navigation}) =>{
  const {token} = route.params;
  const [isAnon, setIsAnon] = useState(token.email == '' ? true : false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const switchToAnon = () =>{
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
                setIsError(false);
                setMessage('Mudando para anônimo...');
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
  const deleteAccount = () =>{
    fetch(`${API_URL}/user`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(token),
    })
    .then(async res => {
        try {
            const jsonRes = await res.json();
            if (res.status !== 200) {
                setIsError(true);
                setMessage(jsonRes.message);
            } else {
                setIsError(false);
                setMessage(jsonRes.message);
                endSession();
            }
        } catch (err) {
            console.log(err);
        };
    })
    .catch(err => {
        console.log(err);
    });
  }
  const endSession = async () => {
    try {
      await AsyncStorage.removeItem('@token');
      navigation.replace('Login');
    } catch(e) {
      console.log(e);
    }
  }
  const getMessage = () => {
    const status = isError ? `Erro: ` : `Sucesso: `;
    return status + message;
  }
  return(
      <View style={styles.container}>
          <Text style={styles.info}>{token.name}</Text>
          <Text style={styles.info}>{token.email}</Text>
          <View style={styles.divisor}></View>
          <Pressable style={styles.button}>
              <Text>Sobre</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={switchToAnon}>
              {!isAnon && <Text>Trocar para anônimo</Text>}
          </Pressable>
          <Pressable style={styles.button} onPress={deleteAccount}>
              {!isAnon && <Text>Excluir Conta</Text>}
          </Pressable>
          <Pressable style={styles.button} onPress={endSession}>
              <Text>Encerrar Sessão</Text>
          </Pressable>
          <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
      </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#ecf0f1',
    },
    divisor: {
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      minWidth: 280,
      marginVertical: 20,
    },
    info: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 30,
    },
    button: {
      marginBottom: 10,
    },
});
export default ConfigScreen;