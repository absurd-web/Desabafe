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
const SentScreen = () =>{
    return(
        <View>
        <Text>Desabafo enviado</Text>
        <Text>Obrigado</Text>
        <Pressable>
            <Text>Ok</Text>
        </Pressable>
        </View>
    );
}
export default SentScreen;