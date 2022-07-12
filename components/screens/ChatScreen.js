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
    const [categoria,setCategoria] = useState('Não definido');
    return(
        <View style={styles.innerContainer}>
            <Pressable onPress={()=>props.onPress()} style={props.isSelected ? styles.opcaoSelected : styles.opcao}>
                <Text style={styles.opcaoText}>{props.conteudo}</Text>
            </Pressable>
            {props.isSelected && <BotaoConfirmar onPress={()=>{
            if(typeof(props.goal) === 'string'){
                props.navigation.push('Chat',{goal: props.goal});
                if(props.categoria){
                    setCategoria(props.categoria);
                }
            }else{
                props.navigation.navigate('Splash',{goal : 'Mensagem',categoria : categoria});
            }
            }}/>}
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
                  <ChatOption key={index} conteudo={item.desc} categoria={item.categoria} goal={item.goal} navigation={this.props.navigation} isSelected={this.state.opcoes[index]} onPress={()=>this.aoPressionar(index)}/>
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
            desc: 'Olá! Eu sou [NOME], e estou aqui pra te ajudar a enviar seu desabafo de forma segura para que o Instituto JCPM possa te auxiliar de forma adequada. A gente pode conversar um pouco sobre o seu problema antes, ou você pode ir direto para a escrita do desabafo, o que acha?',
            options: [
                {desc: 'Quero conversar.', goal: '2'},
                {desc: 'Quero desabafar logo.', goal: navigation},
            ],
        },
        2 : {
            desc: 'Que bom que deseja conversar! Então, você já tem alguma idéia sobre o que vai querer desabafar?',
            options: [
                {desc: 'Sim.', goal: '3'},
                {desc: 'Não.', goal: '4'},
            ],
        },
        3 : {
            desc: 'Isso já ajuda bastante! Certo, esse assunto tem a ver com algo que você vem sentindo e pensando ou é por causa de algo que aconteceu ou vem acontecendo?',
            options: [
                {desc: 'Algo que eu sinto.', goal: 'B1'},
                {desc: 'Algo que aconteceu.', goal: 'B2'},
            ],
        },
        4 : {
            desc: 'Entendo. A gente pode passar por algumas perguntinhas para te ajudar a elaborar melhor o que você está sentindo, para que você possa escrever seu desabafo com mais segurança. Você deseja passar por essas perguntinhas mesmo ou prefere escrever logo seu relato?',
            options: [
                {desc: 'Responder perguntas.', goal: 'A1'},
                {desc: 'Escrever relato logo', goal: '5'},
            ],
        },
        5 : {
            desc: 'Prontinho, agora eu posso deixar você sozinho para escrever seu desabafo! Fique a vontade, tome seu tempo e volte sempre que precisar, estarei aqui te esperando!',
            options: [
                {desc: 'Obrigado.', goal: navigation, categoria: 'Não definido'},
                {desc: 'Tchau.', goal: navigation, categoria: 'Não definido'},
                {desc: 'Até a próxima.', goal: navigation, categoria: 'Não definido'},
            ],
        },
        'A1' : {
            desc: 'Primeiro, qual emoção você percebe que te domina? Que mais está presente dentro de você no seu dia-a-dia?',
            options: [
                {desc: 'Medo.', goal: 'A2'},
                {desc: 'Tristeza.', goal: 'A2'},
                {desc: 'Raiva.', goal: 'A2'},
                {desc: 'Alegria.', goal: 'A2'}
            ],
        },
        'B1' : {
            desc: 'E esses sentimentos envolvem algum desses assuntos?',
            options: [
                {desc: 'Relacionamentos.', goal: 'B3'},
                {desc: 'Quem eu sou.', goal: '4'},
                {desc: 'Meu futuro.', goal: '4'},
                {desc: 'Outra coisa.', goal: '4'},
            ],
        },
        'B2' : {
            desc: 'Algo aconteceu? Em que ambiente ou parte da sua vida isso ocorre?',
            options: [
                {desc: 'Família.', goal: '4'},
                {desc: 'Escola.', goal: '4'},
                {desc: 'Trabalho.', goal: '4'},
                {desc: 'No Instituo JCPM.', goal: '4'},
            ],
        },
        'B3' : {
            desc: 'Ah, acho que sei como é. Mas o quê exatamente sobre relacionamentos tem te afetado?',
            options: [
                {desc: 'Uma pessoa.', goal: '4'},
                {desc: 'Meus amigos.', goal: '4'},
                {desc: 'Minha sexualidade.', goal: '4'},
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
        //maxHeight: '27%',
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