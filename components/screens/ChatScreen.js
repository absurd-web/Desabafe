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
    TouchableOpacity,
} from 'react-native';
const BotaoConfirmar = (props) =>{
    return(
        <TouchableOpacity onPress={()=>props.onPress()}>
            <View>
                <Image
                    style={styles.opcaoConfirmar}
                    source={require('./images/icons/play.png')}
                />
            </View>
        </TouchableOpacity>
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
                {/* Triângulo do balão de fala */}
                <View style={styles.triangle}></View>
                <Text style={styles.bubbleText}>Lorem ipsum dolor sit amet</Text>
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
        marginTop: 15,
        marginBottom: 0,
        borderRadius: 20,
        minWidth: '80%',
        maxWidth: '80%',
        minHeight: '27%',
        maxHeight: '27%',
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
        minWidth: '80%',
        maxWidth: '80%',
        padding: 15,
        borderRadius: 30,
    },
    opcaoSelected:{
        flex: 4,
        backgroundColor: '#181D27',
        marginBottom: 9,
        minWidth: '63.67%',
        maxWidth: '63.67%',
        padding: 15,
        borderRadius: 30,
    },
    /* Estilo do texto das opções de diálogo */
    opcaoText:{
        paddingLeft: 15,
        fontFamily:'Roboto-Regular',
        color: 'white',
        fontSize: 17,
    },
    /* Botão de confirmar */
    opcaoConfirmar:{
        width: 54,
        height: 54,
        justifyContent: 'center',
        marginRight: 0,
        marginLeft: 10,
    },
    mascote:{
        width: 210,
        height: 200,
        marginBottom: 10,
    },
    scrollView:{
        marginHorizontal: 40,
    },
    /* Triângulo da caixa de texto */
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 0,
        borderRightWidth: 25,
        borderBottomWidth: 60,
        borderLeftWidth: 0,
        borderTopColor: 'transparent',
        borderRightColor: '#8A897C',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        position: 'absolute',
        top: 170,
        left: 44,
      },   
});
export default ChatScreen;