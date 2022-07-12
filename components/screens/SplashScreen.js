import React,{Component} from 'react';
import Config from "react-native-config";
import { StackActions, CommonActions } from '@react-navigation/native';
import LoadingScreen from './LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadOptions } from '@babel/core';
class SplashScreen extends Component{
    constructor(props){
        super(props);
        this.authenticateSession();
    }
    resetToLogin(navigation){
        navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                { name: 'Login' },
              ],
            })
        );
    }
    authenticateSession(){
        const { navigation } = this.props;
        const goal = this.props.route.params.goal;
        const categoria = this.props.route.params.categoria;
        const getData = async () => {
            try {
            const value = await AsyncStorage.getItem('@token');
            if(value !== null) {
                fetch(`${Config.API_URL}/private`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${value}`, 
                    },
                })
                .then(async res => {
                    try {
                        const jsonRes = await res.json();
                        if (res.status === 200) {
                            if(goal != 'Login'){
                                if(goal == 'Chat' && jsonRes.token.level == 0){
                                    navigation.replace('Admin',{token: jsonRes.token});
                                }else if(goal == 'Mensagem'){
                                    navigation.replace(goal,{token: jsonRes.token, categoria: categoria});
                                }else{
                                    navigation.replace(goal,{token: jsonRes.token});
                                }
                            }else{
                                this.resetToLogin(navigation);
                            }
                        }else if(jsonRes.message =='jwt expired'){
                            await AsyncStorage.removeItem('@token');
                            this.resetToLogin(navigation);
                        }
                    } catch (err) {
                        console.log(err);
                    };
                })
            }else{
                this.resetToLogin(navigation);
            }
            } catch(e) {
                console.log(e);
            }
        }
        getData();
    }
    render(){
        return(
            <LoadingScreen/>
        );
    }
}
export default SplashScreen;