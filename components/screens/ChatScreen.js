import React,{ useState, useEffect, Component } from 'react';
import { useFocusEffect } from '@react-navigation/native';
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
            {props.isSelected && <BotaoConfirmar onPress={()=>typeof(props.goal) === 'string' ? props.navigation.push('Chat',{goal: props.goal}) : props.navigation.navigate('Splash',{goal : 'Mensagem'})}/>}
        </View>
    );
};
class ChatOptions extends Component{
    constructor(props){
        super(props);
        this.dataIndex = this.props.dataIndex;
        this.data = this.props.data[this.dataIndex].options;
        this.state = {
            opcoes: Array(this.data.length).fill(false),
        };
    }
/*     componentDidUpdate(prevProps){
        if (this.props.dataIndex !== prevProps.dataIndex) {
            this.dataIndex = this.props.dataIndex;
            this.data = this.props.data[this.dataIndex].options;
            this.setState({
                opcoes: Array(this.data.length).fill(false),
            });
        }
    } */
    aoPressionar(i){
        const opcoes = this.state.opcoes.slice();
        if(!opcoes[i]) opcoes.fill(false);
        opcoes[i] = !opcoes[i];
        this.setState({opcoes: opcoes});
    }
    render(){
        return(
            this.data.map((item,index)=>{
                return (
                  <ChatOption key={index} conteudo={item.desc} goal={item.goal} navigation={this.props.navigation} isSelected={this.state.opcoes[index]} onPress={()=>this.aoPressionar(index)}/>
                );
            })
        );
    }
}

const ChatScreen = ({route, navigation}) =>{
    const {goal} = route.params;
    const [dataIndex, setDataIndex] = goal ? useState(goal) : useState('1');
/*     useFocusEffect(
        React.useCallback(() => {
          // Do something when the screen is focused
    
          return () => {
            setDataIndex('1');
          };
        }, [])
    ); */
/*     const changeState = (value) =>{
        setDataIndex(value);
    } */
    const data = {
        1 : {
            desc: 'Deseja conversar com o assistente ou escrever o relato?',
            options: [
                {desc: 'Escrever relato', goal: navigation},
                {desc: 'Conversar', goal: '2'},
            ],
        },
        2 : {
            desc: 'Você já sabe sobre o que deseja conversar?',
            options: [
                {desc: 'Sim', goal: '3'},
                {desc: 'Não', goal: '4'},
            ],
        },
        3 : {
            desc: 'Você quer desabafar exclusivamente sobre algo que você sente ou sobre algo que está acontecendo?',
            options: [
                {desc: 'Sentimento', goal: 'B1'},
                {desc: 'Experiência', goal: 'B2'},
            ],
        },
        4 : {
            desc: '4. Deseja receber auxilio para elaborar o que está sentindo?',
            options: [
                {desc: 'Sim', goal: 'A1'},
                {desc: 'Não', goal: navigation},
            ],
        },
        'A1' : {
            desc: 'A.1. Qual sentimento você diria ser o mais comum no seu dia-a-dia?',
            options: [
                {desc: 'Raiva', goal: 'A2'},
                {desc: 'Cansaço', goal: 'A2'},
                {desc: 'Tristeza', goal: 'A2'},
                {desc: 'Tristeza', goal: 'A2'}
            ],
        },
        'B1' : {
            desc: 'Esses sentimentos envolvem algum dos seguintes assuntos?',
            options: [
                {desc: 'Relacionamentos', goal: 'B3'},
                {desc: 'Quem eu sou', goal: '4'},
                {desc: 'Outra Coisa (indefinido)', goal: '4'},
                {desc: 'Meu futuro', goal: '4'},
            ],
        },
        'B2' : {
            desc: 'Isso está acontecendo em que ambiente?',
            options: [
                {desc: 'Casa', goal: '4'},
                {desc: 'Escola', goal: '4'},
                {desc: 'Trabalho', goal: '4'},
                {desc: 'JCPM', goal: '4'},
            ],
        },
        'B3' : {
            desc: 'Qual desses aspectos sobre relacionamentos mais está lhe afetando?',
            options: [
                {desc: 'Pessoa específica', goal: '4'},
                {desc: 'Sexualidade', goal: '4'},
                {desc: 'Amigos', goal: '4'},
            ],
        },
    };
    return(
        //Caixa de mensagem do app
        <View style={styles.container}>
            <View style={styles.bubble}>
                {/* Triângulo do balão de fala */}
                <View style={styles.triangle}></View>
                <Text style={styles.bubbleText}>{data[dataIndex].desc}</Text>
            </View>

            {/* Imagem do mascote  */}
            <Image
                style={styles.mascote}
                source={require('./images/pet.png')}
            />
            {/* Opções de diálogo */}
            <ChatOptions dataIndex={dataIndex} data={data} navigation={navigation}/>
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