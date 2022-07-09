import React,{ useState } from 'react';
import Config from "react-native-config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet,
    Pressable,
    Text,
    View,
    Image,
} from 'react-native';
const ConfigScreen = ({route, navigation}) =>{
  const {token} = route.params;
  const [isAnon, setIsAnon] = useState(token.email == '' ? true : false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const switchToAnon = () =>{
    fetch(`${Config.API_URL}/loginAnon`, {
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
    fetch(`${Config.API_URL}/user`, {
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
        {/* Deixar ícone de perfil, nome e email lado a lado */}
          <View style={styles.row}>
            <View>
              <Image
                style={styles.profilePic}
                source={require('./images/icons/profile_icon.png')}
              />
            </View>

            <View>
              <Text style={styles.info}>{token.name}</Text>
            </View>

            <View>
              <Text style={styles.info}>{token.email}</Text>
            </View>

          </View>

            <View style={styles.divisor}></View>

          {/* Sobre */}
          <View style={styles.row}>
            <View>
              <Image
                style={styles.icons}
                source={require('./images/icons/about.png')}
              />
            </View>

            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Sobre</Text>
            </Pressable>
          </View>

          {/* Anônimo */}
          <View style={styles.row}>
            <View>
            {!isAnon && <Image
                style={styles.icons}
                source={require('./images/icons/anon.png')}
              />}
            </View>
            <Pressable style={styles.button} onPress={switchToAnon}>
                {!isAnon && <Text style={styles.buttonText}>Trocar para anônimo</Text>}
            </Pressable>
          </View>

          {/* Excluir conta */}
          <View style={styles.row}>
            <View>
              {!isAnon && <Image
                style={styles.icons}
                source={require('./images/icons/delete_account.png')}
              />}
            </View>

            <Pressable style={styles.button} onPress={deleteAccount}>
                {!isAnon && <Text style={styles.buttonText}>Excluir Conta</Text>}
            </Pressable>
          </View>

          {/* Encerrar sessão */}
          <View style={styles.row}>
            <View>
              <Image
                style={styles.icons}
                source={require('./images/icons/logoff.png')}
              />
            </View>

          <Pressable style={styles.button} onPress={endSession}>
              <Text style={styles.buttonText}>Encerrar Sessão</Text>
          </Pressable>
          </View>

          <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
      </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
      backgroundColor: 'white',
    },
    divisor: {
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      minWidth: '100%',
      marginVertical: '9%',
    },
    info: {
      fontFamily: 'Roboto-Bold',
      fontSize: 20,
      marginVertical: 30,
      color: 'black',
    },
    button: {
      marginBottom: 35,
      marginLeft: 20,
    },
    buttonText: {
      fontFamily: 'Roboto-Bold',
      fontSize: 20,
      color: 'black',
    },
    profilePic: {
      width: 100,
      height: 100,
      marginTop: 20,
      marginLeft: 30,
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: '4%',
    },
    icons: {
      width: 30,
      height: 30,
      marginLeft: 30,
    },
});
export default ConfigScreen;
