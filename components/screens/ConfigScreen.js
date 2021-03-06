import React,{ useState } from 'react';
import Config from "react-native-config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet,
    Pressable,
    Text,
    View,
    Modal,
    Image,
} from 'react-native';
const ConfigScreen = ({route, navigation}) =>{
  const {token} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(token.level == 0 ? true : false);
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
                navigation.navigate('Splash',{goal: 'Login'});
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
      navigation.navigate('Splash',{goal:'Login'});
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
            <View>
              <Image
                style={styles.profilePic}
                source={require('./images/icons/profile_icon.png')}
              />
            </View>

            <View>
              <Text style={styles.info1}>{token.name}</Text>
            </View>

            <View>
              <Text style={styles.info2}>{token.email}</Text>
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

            <Pressable style={styles.button} onPress={()=>navigation.navigate('About')}>
                <Text style={styles.buttonText}>Sobre</Text>
            </Pressable>
          </View>

          {/* Anônimo */}
          {!isAnon && <View style={styles.row}>
            <View>
            <Image
                style={styles.icons}
                source={require('./images/icons/anon.png')}
              />
            </View>
            <Pressable style={styles.button} onPress={switchToAnon}>
                {!isAnon && <Text style={styles.buttonText}>Trocar para anônimo</Text>}
            </Pressable>
          </View>}

          {/* Modal de excluir conta */}
          <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                      <Text style={styles.modalText}>Você tem certeza que deseja apagar sua conta?</Text>
                      <Pressable
                      style={styles.deleteButton}
                      onPress={deleteAccount}
                      >
                        <Text style={styles.buttonText2}>Apagar minha conta</Text>
                      </Pressable>
                      <Pressable
                      style={styles.cancelButton}
                      onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Text style={styles.buttonText3}>Cancelar</Text>
                      </Pressable>
                  </View>
                </View>
          </Modal>

          {/* Excluir conta */}
          {(!isAnon && !isAdmin) && <View style={styles.row}>
            <View>
              <Image
                style={styles.icons}
                source={require('./images/icons/delete_account.png')}
              />
            </View>

            <Pressable style={styles.button} onPress={()=>setModalVisible(!modalVisible)}>
                {(!isAnon && !isAdmin) && <Text style={styles.buttonText}>Excluir conta</Text>}
            </Pressable>
          </View>}

          {/* Encerrar sessão */}
          <View style={styles.row}>
            <View>
              <Image
                style={styles.icons}
                source={require('./images/icons/logoff.png')}
              />
            </View>

          <Pressable style={styles.button} onPress={endSession}>
              <Text style={styles.buttonText}>Encerrar sessão</Text>
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
    info1: {
      fontFamily: 'Roboto-Bold',
      fontSize: 20,
      marginBottom: 15,
      marginTop: '11%',
      color: 'black',
      left: '37%',
    },
    info2: {
      fontFamily: 'Roboto-Bold',
      fontSize: 20,
      marginBottom: '4%',
      color: 'black',
      left: '37%',
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
      marginTop: 30,
      marginLeft: 30,
      position: 'absolute',
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
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalView: {
      margin: 20,
      backgroundColor: "#FFBB00",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    modalText: {
      color: 'black',
      fontFamily: 'Roboto-Bold',
      marginBottom: 15,
      textAlign: "center",
      fontSize: 19,
    },
    deleteButton: {
      backgroundColor: 'black',
      borderRadius: 10,
      padding: 10,
      minWidth: '70%',
      minHeight: 55,
      marginBottom: '5%',
    },
    cancelButton: {
      backgroundColor: '#FFBB00',
      borderRadius: 10,
      padding: 10,
      minWidth: '70%',
      minHeight: 55,
      marginBottom: 0,
    },
    buttonText2: {
      fontFamily: 'Roboto-Bold',
      color: 'white',
      fontSize: 17,
      alignSelf: 'center',
      marginTop: 3,
    },
    buttonText3: {
      fontFamily: 'Roboto-Bold',
      color: 'black',
      fontSize: 17,
      alignSelf: 'center',
      marginTop: 0,
    },
});
export default ConfigScreen;
