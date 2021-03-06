import React,{ useState, useEffect } from 'react';
import Config from "react-native-config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet,
    Pressable,
    Text,
    TextInput,
    Switch,
    View,
    Image,
    Modal,
} from 'react-native';

const MessageScreen = ({route, navigation}) => {
    const {token, categoria} = route.params;
    const id = token.id;
    const [rascunho,setRascunho] = useState(`Nesse espaço você irá escrever o seu desabafo!
Quando terminar, você pode enviar, mas também pode mudar de idéia.`);
    const [isDefault, setIsDefault] = useState(false);
    const [conteudo, setConteudo] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [isEnviar, setIsEnviar] = useState(true);
    const [isUrgente, setIsUrgente] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const getMessage = () => {
        const status = isError ? `Erro: ` : `Sucesso: `;
        return status + message;
    }
    const getRascunho = async () =>{
        const value = await AsyncStorage.getItem(token.name);
        if(value != null){
            setIsDefault(false);
            return value;
        }else{
            setIsDefault(true);
            return `Nesse espaço você irá escrever o seu desabafo!
Quando terminar, você pode enviar, mas também pode mudar de idéia.`;
        }
    }
    //Pega o rascunho da memoria uma vez logo após renderização
    useEffect(() => {
      getRascunho().then(data => setRascunho(data));
    }, [])
    const salvarRascunho = async () =>{
        await AsyncStorage.setItem(token.name, conteudo);
    }
    const onSubmitHandler = () =>{
        if(isEnviar){
          const payload = {
            conteudo,
            categoria,
            id,
            isUrgente,
          };
          fetch(`${Config.API_URL}/send`, {
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
                      setIsError(false);
                      setMessage(jsonRes.message);
                      await AsyncStorage.removeItem(token.name);
                      navigation.navigate('Sent');
                  }
              } catch (err) {
                  console.log(err);
              };
          })
          .catch(err => {
              console.log(err);
          });
        }else{
          salvarRascunho();
          navigation.navigate('Splash',{goal:'Login'});
        }
    }
    return(
        <View style={styles.container}>
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
                  {/* A imagem de salvar fica nas duas telas, de enviar e salvar, resolver isso! */}
                  {!isEnviar && <View>
                    <Image
                      style={styles.saveIcon}
                      source={require('./images/icons/save_icon.png')}
                    />
                  </View>}
                  {isEnviar && <View>
                    <Image
                      style={styles.sendIcon}
                      source={require('./images/icons/message_icon.png')}
                    />
                  </View>}
                    <Text style={styles.modalText}>{isEnviar ? `Deseja finalizar e enviar
o relato?` : `Deseja salvar seu
texto para enviar depois?`}</Text>
                    {isEnviar && <Text style={styles.urgente}>Urgente?</Text>}
                    {isEnviar && <Switch onValueChange={()=>setIsUrgente(!isUrgente)} value={isUrgente}/>}
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={onSubmitHandler}
                    >
                    <Text style={styles.textStyle}>{isEnviar ? 'Enviar' : 'Salvar'}</Text>
                    </Pressable>
                    <Pressable
                    onPress={() => setModalVisible(!modalVisible)}
                    >
                    <Text style={styles.naoSalvar}>{isEnviar ? 'Ainda não' : 'Não salvar'}</Text>
                    </Pressable>
                </View>
                </View>
            </Modal>
            <TextInput style={styles.input} onChangeText={(value)=>setConteudo(value)} multiline placeholder={isDefault ? rascunho : ''} defaultValue={isDefault ? '' : rascunho}
          placeholderTextColor={'gray'}/>
            <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
            <Pressable style={styles.button} onPress={()=>{setModalVisible(!modalVisible);setIsEnviar(true);}}>
                <Text style={styles.textButton}>Enviar</Text>
            </Pressable>
            <Pressable style={styles.button2} onPress={()=>{setModalVisible(!modalVisible);setIsEnviar(false);}}>
                <Text style={styles.textButton}>Não Enviar</Text>
            </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white',
    },
    divisor: {
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      minWidth: 280,
      marginVertical: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#D2D7DF',
      marginTop: '9%',
      marginHorizontal: '9%',
      marginBottom: '4%',
      borderRadius: 20,
      backgroundColor: '#D2D7DF',
      fontFamily: 'Roboto-Regular',
      fontSize: 16,
      minHeight: '67%',
      minWidth: '82.2%',
      textAlignVertical: 'top',
      paddingHorizontal: 30,
      paddingTop: 40,
    },
    info: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 30,
    },
    button: {
      marginBottom: 10,
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
  button: {
    backgroundColor: '#FFBB00',
    borderRadius: 30,
    padding: 10,
    minWidth: '70%',
    minHeight: 55,
    marginBottom: '2%',
    marginTop: 10,
  },
  button2: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
    minWidth: '70%',
    minHeight: 55,
    marginBottom: '2%',
  },
  textButton: {
    color: 'black',
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 5,
  },
  buttonOpen: {
    backgroundColor: "black",
  },
  buttonClose: {
    borderRadius: 10,
    minHeight: '7%',
    backgroundColor: "black",
  },
  textStyle: {
    color: "white",
    fontFamily: 'Roboto-Bold',
    textAlign: "center",
    marginTop: 5,
  },
  modalText: {
    color: 'black',
    fontFamily: 'Roboto-Light',
    marginBottom: 15,
    textAlign: "center"
  },
  naoSalvar: {
    color: 'black',
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
  },
  urgente: {
    color: 'black',
    fontFamily: 'Roboto-Light',
    marginBottom: 5,
    textAlign: "center"
  },
  saveIcon: {
    width: 50,
    height: 50,
  },
  sendIcon: {
    width: 84,
    height: 50,
    marginBottom: 10,
  },
});

export default MessageScreen;