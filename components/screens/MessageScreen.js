import React,{ useState, useEffect } from 'react';
import Config from "react-native-config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet,
    Pressable,
    Text,
    TextInput,
    Modal,
    Switch,
    View,
    Image,
} from 'react-native';
const MessageScreen = ({route, navigation}) => {
    const {token} = route.params;
    const id = token.id;
    const [rascunho,setRascunho] = useState(`Nesse espaço você irá escrever o seu desabafo! 
    Quando terminar, você pode enviar, mas também pode mudar de idéia.`);
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
            return value;
        }else{
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
                      navigation.navigate('Chat');
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
          navigation.navigate('Chat');
        }
    }
    return(
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  {/* A imagem de salvar fica nas duas telas, de enviar e salvar, resolver isso! */}
                  <View>
                    <Image
                      style={styles.saveIcon}
                      source={require('./images/icons/save_icon.png')}
                    />
                  </View>
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
            <TextInput style={styles.input} onChangeText={(value)=>setConteudo(value)} multiline defaultValue={rascunho}
          placeholderTextColor={'black'}/>
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
      backgroundColor: '#ecf0f1',
    },
    divisor: {
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      minWidth: 280,
      marginVertical: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: 'black',
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
    marginTop: 22
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
      height: 2
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
});

export default MessageScreen;