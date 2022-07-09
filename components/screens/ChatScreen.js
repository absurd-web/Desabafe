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
    TouchableWithoutFeedbackBase,
    Image,
} from 'react-native';
const BotaoConfirmar = (props) =>{
    return(
        <Pressable onPress={()=>props.onPress()} style={styles.opcaoConfirmar}>
            <Text style={styles.confirmarText}>C</Text>
        </Pressable>
    );
}
const ChatOption = (props) =>{
    return(
        <View style={styles.innerContainer}>
            <Pressable onPress={()=>props.onPress()} style={props.isSelected ? styles.opcaoSelected : styles.opcao}>
                <Text style={styles.opcaoText}>{props.conteudo}</Text>
            </Pressable>
            {props.isSelected && <BotaoConfirmar onPress={()=>props.navigation.navigate('Splash',{goal:'Mensagem'})}/>}
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
        return <ChatOption conteudo={conteudo} navigation={this.props.navigation} onPress={()=>this.aoPressionar(i)} isSelected={this.state.opcoes[i]}/>;
    }
    render(){
        return(
            <>
            {this.renderOpcao(0,"Depressão")}
            {this.renderOpcao(1,"Ansiedade")}
            {this.renderOpcao(2,"Fadiga")}
            {this.renderOpcao(3,"Pular")}
            </>
        );
    }
}
const ChatScreen = ({navigation}) =>{
    return(
        //Caixa de mensagem do app
        <View style={styles.container}>
            <View style={styles.bubble}>
                {/*<Pressable><Text>Voltar</Text></Pressable>*/}
                <Text style={styles.bubbleText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor tortor tempor erat maximus, in vehicula dui finibus. Maecenas ut euismod ligula, nec porta turpis. Vivamus ullamcorper blandit eros at finibus. Suspendisse porttitor nisi id lacus eleifend cursus.</Text>
            </View>
            {/* Imagem do mascote  */}
            <Image
                style={styles.mascote}
                source={require('./images/pet.png')}
            />
            {/* Opções de diálogo */}
            <ChatOptions navigation={navigation}/>
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#D2D7DF',
        alignItems: 'center',
    },
    /* Estilo da caixa de diálogo do app */
    bubble:{
        backgroundColor: '#8A897C',
        padding: 20,
        marginHorizontal: 20,
        marginTop: 30,
        marginBottom: 10,
        borderRadius: 20,
    },
    /* Estilo do texto da caixa de diálogo */
    bubbleText:{
        fontFamily:'Roboto-Bold',
        color: 'white',
        fontSize: 17,
    },
    innerContainer:{
        flexDirection: 'row',
    },
    /* Estilo das opções de diálogo */
    opcao:{
        flex: 6,
        backgroundColor: '#181D27',
        marginBottom: 9,
        marginLeft: 40,
        marginRight: 40,
        padding: 18,
        borderRadius: 30,
    },
    opcaoSelected:{
        flex: 4,
        backgroundColor: '#181D27',
        marginBottom: 9,
        marginLeft: 40,
        padding: 18,
        borderRadius: 30,
    },
    /* Estilo do texto das opções de diálogo */
    opcaoText:{
        fontFamily:'Roboto-Regular',
        color: 'white',
        fontSize: 17,
    },
    /* Botão de confirmar e opção selecionada */
    opcaoConfirmar:{
        flex: 1.15,
        backgroundColor: '#181D27',
        marginRight: 40,
        borderRadius: 40,
        marginBottom: 7,
        justifyContent: 'center',
    },
    confirmarText:{
        color: 'white',
        textAlign: 'center',
    },
    mascote:{
        width: 210,
        height: 200,
        marginBottom: 10,
    },
});
export default ChatScreen;