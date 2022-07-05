import React,{Component} from 'react';
import { StackActions, CommonActions } from '@react-navigation/native';
import LoadingScreen from './LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadOptions } from '@babel/core';
const API_URL = 'http://192.168.100.5:5000';
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
        const getData = async () => {
            try {
            const value = await AsyncStorage.getItem('@token');
            if(value !== null) {
                fetch(`${API_URL}/private`, {
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
                                navigation.replace(goal,{token: jsonRes.token});
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