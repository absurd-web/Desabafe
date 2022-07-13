import React,{ useState } from 'react';
import Config from "react-native-config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet,
    Pressable,
    Text,
    View,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Linking,
} from 'react-native';

const AboutScreen = () =>{
    //Função para redirecionar para link
    loadInBrowser = (link) => {
        Linking.openURL(link).catch(err => console.error("Couldn't load page", err));
    };

    return(
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Imagem do ícone */}
        <Image
            style={styles.icons}
            source={require('./images/desabafe_logo.png')}
        />
        {/* Título */}
        <Text style={styles.title}>Desabafe</Text>
        {/* Título parágrafo 1 */}
        <View style={styles.par1}>
            <Text style={styles.titlePar}>O que é?</Text>
            {/* parágrafo 1 */}
            <Text style={styles.text}>
            Desabafe é uma aplicação desenvolvida
            por alunos do curso de Sistemas e
            Mídias Digitais da Universidade Federal
            do Ceará, em conjunto com os
            coordenadores da unidade de Fortaleza
            do Instituto JCPM de compromisso
            social.
            </Text>
        </View>
        {/* Título parágrafo 2 */}
        <View style={styles.borderPar2}>
            <View style={styles.par2}>
                <Text style={styles.titlePar}>Como funciona?</Text>
                {/* parágrafo 2 */}
                <Text style={styles.text}>
                Os alunos do Instituto que tiverem
                acesso à aplicação, poderão enviar
                relatos e desabafos por escrito, de
                forma anônima ou não, que poderão ser
                visualizados pela coordenação e
                professores do Instituto, a fim de
                prestar auxílio a esses alunos da forma
                adequada.
                </Text>
            </View>
        </View>
        {/* Título parágrafo 3 */}
        <View style={styles.par3}>
            <Text style={styles.titlePar}>Quem somos nós?</Text>
            {/* parágrafo 3 */}
            <Text style={styles.text}>
            O grupo de desenvolvimento do
            aplicativo Desabafe é composto por
            cinco pessoas, que compõem a equipe
            AlleyCat. Somos:
            </Text>
            {/* Botões */}
            <Pressable style={styles.button} onPress={()=> loadInBrowser('https://www.linkedin.com/in/israel-gomes-429420243/')}>
                <Text style={styles.buttonText}>Israel Gomes (programador)</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={()=> loadInBrowser('https://aik0.artstation.com')}>
                <Text style={styles.buttonText}>Kaio Forte (designer)</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={()=> loadInBrowser('https://www.linkedin.com/in/nickolas-lima-164347209/')}>
                <Text style={styles.buttonText}>Nickolas Gabriel (revisor)</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={()=> loadInBrowser('https://github.com/DaviVasconcelos')}>
                <Text style={styles.buttonText}>Davi Vasconcelos (programador)</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={()=> loadInBrowser('https://www.instagram.com/contosbyv/')}>
                <Text style={styles.buttonText}>Vitor Martins (designer)</Text>
            </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView:{
        backgroundColor: 'white',
        marginHorizontal: 0,
    },
    text:{
        fontSize: 18,
        fontFamily: 'Roboto-Regular',
        marginHorizontal: '8%',
    },
    icons:{
        alignSelf: 'center',
        width: 150,
        height: 150,
        marginTop: 50,
    },
    title: {
        alignSelf: 'center',
        fontFamily:'AmaticSC-Regular',
        fontSize: 47,
        marginBottom: 30,
        color: 'black',
    },
    titlePar:{
        alignSelf: 'flex-start',
        fontFamily:'Roboto-Bold',
        fontSize: 30,
        marginLeft: 30,
        marginBottom: 10,
        color: 'black',
    },
    par1:{
        backgroundColor: '#D2D7DF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 50,
        paddingTop: 20,
    },
    par2:{
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 50,
        paddingTop: 20,
    },
    par3:{
        backgroundColor: '#D2D7DF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 50,
        paddingTop: 20,
    },
    borderPar2:{
        backgroundColor:'#D2D7DF',
    },
    button:{
        marginTop: 20,
        alignSelf: 'center',
        backgroundColor: 'black',
        padding: 20,
        marginBottom: 0,
        borderRadius: 30,
        width: '78%',
    },
    buttonText:{
        alignSelf: 'center',
        color: '#FFBB00',
        fontFamily:'Roboto-Bold',
        fontSize: 17,
    },
});

export default AboutScreen;