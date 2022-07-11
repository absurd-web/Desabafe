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
    ActivityIndicator,
} from 'react-native';
const RegistrosView = (props) =>{
  return(
    props.data.map((item,index)=>{
      return (
        <Pressable key={index} onPress={()=>props.navigation.navigate('AdminMensagens',{token: props.token, data: props.data, initialCategory: item.Categoria})}>
          <Text>{item.Categoria}</Text>
          <Text>{item.cnt}</Text>
        </Pressable>
      );
    })
  );
}
const Registros = (props) =>{
    const token = props.token;
    const [isLoaded,setIsLoaded] = useState(false);
    const [registros,setRegistros] = useState(<ActivityIndicator />);
    useEffect(() => {
        getRegistros().then((data) =>{
          if(typeof(data) != 'string'){
            setRegistros(<RegistrosView data={data.db.rows} navigation={props.navigation} token={token}/>);
          }else{
            setRegistros(
              <Text>{data}</Text>
            );
          }
        }).catch(data => {
            setRegistros(
              <Text>{data}</Text>
            );});  
    }, []);
    const getRegistros = async () =>{
            return fetch(`${Config.API_URL}/records`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(async res => {
                try {
                    const jsonRes = await res.json();
                    if (res.status === 200) {
                        setIsLoaded(true);
                        return jsonRes;
                      }else{
                        setIsLoaded(true);
                        return jsonRes.message;
                    }
                }
                catch (err) {
                    console.log(err);
                };
            })
    }
    return(
        registros
    );
}
const AdminScreen = ({route, navigation}) => {
    const {token} = route.params;
    return(
        <View>
            <Text>Registros</Text>
            <Text>Categorias</Text>
            <Registros token={token} navigation={navigation}/>
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
    backgroundColor: "white",
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
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
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
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
export default AdminScreen;