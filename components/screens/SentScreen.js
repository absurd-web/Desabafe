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

const SentScreen = ({navigation}) =>{
    return(
        <View style={styles.container}>
            <Image style={styles.image} source={require('./images/icons/sent_icon.png')} />
            <Text style={styles.desabafoEnv}>Desabafo enviado</Text>
            <Text style={styles.obrigado}>Obrigado</Text>
            <View style={styles.divisor}/>
            <Pressable
            style={styles.button}
            onPress={()=>navigation.navigate('Splash',{goal: 'Login'})}>
                <Text style={styles.textButton}>Ok</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    desabafoEnv:{
        fontFamily: 'Roboto-Bold',
        fontSize: 27,
        color: 'black',
        marginBottom: 15,
    },
    button:{
        backgroundColor: '#FFBB00',
        minWidth: '70%',
        minHeight: '8%',
        borderRadius: 30,
    },
    image:{
        width: 200,
        height: 200,
        marginTop: '35%',
        marginBottom: '15%',
    },
    textButton: {
        marginTop: '1%',
        alignSelf: 'center',
        color: 'black',
        padding: 10,
        fontFamily: 'Roboto-Bold',
        fontSize: 19,
    },
    obrigado: {
        color: '#8A897C',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
    },
    divisor: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        minWidth: 320,
        marginVertical: 25,
        marginBottom: 35,
        marginTop: 35,
      },
});

export default SentScreen;