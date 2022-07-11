import React,{ useState, useEffect } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
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

const EnviosView = (props) =>{
    return(
      props.data.map((item,index)=>{
        return (
          <View style={styles.box} key={index}>
            <Text style={styles.textUser}>{item.usuario === null ? 'Anônimo' : item.usuario.NomeUsuario}</Text>
            <Text style={styles.textContent}>{item.Conteudo}</Text>
          </View>
        );
      })
    );
}
const Envios = (props) =>{
    const {token, initialCategory} = props;
    const [isLoaded,setIsLoaded] = useState(false);
    const [envios,setEnvios] = useState(<ActivityIndicator />);
    useEffect(() => {
        getMessageData().then((data) =>{
            if(typeof(data) != 'string'){
              setEnvios(<EnviosView data={data}/>);
            }else{
              setEnvios(
                <Text>{data}</Text>
              );
            }
        }).catch(data => {
            setEnvios(
            <Text>{data}</Text>
            );});
    }, [initialCategory]);
    const getMessageData = async () =>{
        const payload = {
            categoria:initialCategory,
        }
        return fetch(`${Config.API_URL}/records/data`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        })
        .then(async res => {
            try {
                const jsonRes = await res.json();
                if (res.status === 200) {
                    return jsonRes.dbMessages;
                  }else{
                    return jsonRes.message;
                }
            }
            catch (err) {
                console.log(err);
            };
        })
      }
    return(
        envios
    );
}
const MensagensScreen = ({route,navigation}) =>{
    const { token, data, initialCategory } = route.params;
    const formattedData = data.map(x=>x.Categoria);
    const [categoria, setCategoria] = useState(initialCategory);
    return(
        <View style={styles.container}>
            <Text style={styles.registro}>Registros</Text>

            {/* Dropdown */}
            <View style={styles.dropdown}>
              <SelectDropdown
                  data={formattedData}
                  defaultValue={initialCategory}
                  onSelect={(selectedItem, index) => {
                      setCategoria(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      return selectedItem
                  }}
                  rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item
                  }}/>
                </View>

            <Text style={styles.envios}>Envios</Text>
            <Envios token={token} initialCategory={categoria} navigation={navigation}/>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: 'white', 
  },
  registro: {
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    color: 'black',
    marginTop: 40,
    marginLeft: 40,
    marginBottom: 10,
  },
  box:{
    minWidth: '80%',
    backgroundColor: '#D2D7DF',
    marginLeft: 40,
    borderRadius: 10,
    marginBottom: 10,
  },
  textUser:{
    color: 'black',
    fontFamily: 'Roboto-Bold',
    marginLeft: 20,
    fontSize: 19,
    marginVertical: 20,
  },
  textContent:{
    color: 'black',
    fontFamily: 'Roboto-Regular',
    marginLeft: 20,
    fontSize: 18,
    marginBottom: 20,
  },
  envios:{
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: 'black',
    marginLeft: 40,
    marginTop: 10,
    marginBottom: 20,
  },
  dropdown:{
    marginLeft: 40,
    marginVertical: 10,
  },
});

export default MensagensScreen;
