import React,{ useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
} from 'react-native';
const ChatOptions = () =>{
    //Refazer do jeito certo depois
    const [isSelected,setIsSelected] = useState(false);
    const [isSelected1,setIsSelected1] = useState(false);
    const [isSelected2,setIsSelected2] = useState(false);
    const [isSelected3,setIsSelected3] = useState(false);

    function deselect(){
        setIsSelected(false);
        setIsSelected1(false);
        setIsSelected2(false);
        setIsSelected3(false);
    }
    return(
        <>
        <Pressable onPress={()=>{if(isSelected){
            setIsSelected(false)
        }else{
            deselect()
            setIsSelected(true)
        }}} style={styles.opcao}>
            <Text style={styles.opcaoText}>Opção</Text>
            {isSelected && <Text style={styles.opcaoSelected}>OK</Text>}
        </Pressable>
        <Pressable onPress={()=>{if(isSelected1){
            setIsSelected1(false)
        }else{
            deselect()
            setIsSelected1(true)
        }}} style={styles.opcao}>
            <Text style={styles.opcaoText}>Opção</Text>
            {isSelected1 && <Text style={styles.opcaoSelected}>OK</Text>}
        </Pressable>
        <Pressable onPress={()=>{if(isSelected2){
            setIsSelected2(false)
        }else{
            deselect()
            setIsSelected2(true)
        }}} style={styles.opcao}>
            <Text style={styles.opcaoText}>Opção</Text>
            {isSelected2 && <Text style={styles.opcaoSelected}>OK</Text>}
        </Pressable>
        <Pressable onPress={()=>{if(isSelected3){
            setIsSelected3(false)
        }else{
            deselect()
            setIsSelected3(true)
        }}} style={styles.opcao}>
            <Text style={styles.opcaoText}>Opção</Text>
            {isSelected3 && <Text style={styles.opcaoSelected}>OK</Text>}
        </Pressable>
        </>
    );
}
const ChatScreen = () =>{
    return(
        <View style={styles.container}>
            <View style={styles.bubble}>
                <Pressable><Text>Voltar</Text></Pressable>
                <Text style={styles.bubbleText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor tortor tempor erat maximus, in vehicula dui finibus. Maecenas ut euismod ligula, nec porta turpis. Vivamus ullamcorper blandit eros at finibus. Suspendisse porttitor nisi id lacus eleifend cursus.</Text>
            </View>
            <ChatOptions />
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    bubble:{
        backgroundColor: 'grey',
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 30,
        borderRadius: 20,
    },
    bubbleText:{
        color: 'black',
        fontWeight: 'bold',
    },
    opcao:{
        flexDirection: 'row',
        backgroundColor: 'darkgrey',
        marginBottom: 5,
        marginHorizontal: 20,
        padding: 8,
        borderRadius: 20,
    },
    opcaoText:{
        color: 'white',
    },
    opcaoSelected:{
        backgroundColor:'black',
        color: 'white',
        marginLeft: 240,
        borderRadius: 10,
    },
});
export default ChatScreen;