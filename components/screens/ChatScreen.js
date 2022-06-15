import React,{ useState, useEffect, Component } from 'react';
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
const BotaoConfirmar = () =>{
    return(
        <Pressable style={styles.opcaoConfirmar}>
            <Text style={styles.confirmarText}>C</Text>
        </Pressable>
    );
}
const ChatOption = (props) =>{
    return(
        <View style={styles.innerContainer}>
            <Pressable onPress={()=>props.onPress()} style={props.isSelected ? styles.opcaoSelected : styles.opcao}>
                <Text>{props.conteudo}</Text>
            </Pressable>
            {props.isSelected && <BotaoConfirmar />}
        </View>
    );
};
class ChatOptions extends Component{
    constructor(props){
        super(props);
        this.state = {
            opcoes: Array(5).fill(false),
        };
    }
    aoPressionar(i){
        const opcoes = this.state.opcoes.slice();
        if(!opcoes[i]) opcoes.fill(false);
        opcoes[i] = !opcoes[i];
        this.setState({opcoes: opcoes});
    }
    renderOpcao(i,conteudo){
        return <ChatOption conteudo={conteudo} onPress={()=>this.aoPressionar(i)} isSelected={this.state.opcoes[i]}/>;
    }
    render(){
        return(
            <>
            {this.renderOpcao(0,"Depressão")}
            {this.renderOpcao(1,"Ansiedade")}
            {this.renderOpcao(2,"Fadiga")}
            {this.renderOpcao(3,"Tristeza em geral")}
            </>
        );
    }
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
        flexDirection: 'column',
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
    innerContainer:{
        flexDirection: 'row',
    },
    opcao:{
        flex: 6,
        backgroundColor: 'darkgrey',
        marginBottom: 5,
        marginLeft: 20,
        marginRight: 68,
        padding: 8,
        borderRadius: 20,
    },
    opcaoSelected:{
        flex: 6,
        backgroundColor: 'darkgrey',
        marginBottom: 5,
        marginLeft: 20,
        padding: 8,
        borderRadius: 20,
    },
    opcaoText:{
        color: 'white',
    },
    opcaoConfirmar:{
        flex: 1,
        backgroundColor: 'black',
        marginRight: 20,
        borderRadius: 30,
        marginBottom: 5,
        justifyContent: 'center',
    },
    confirmarText:{
        color: 'white',
        textAlign: 'center',
    },
});
export default ChatScreen;