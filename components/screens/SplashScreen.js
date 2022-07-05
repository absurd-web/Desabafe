import React,{Component} from 'react';
import { StackActions, CommonActions } from '@react-navigation/native';
import LoadingScreen from './LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_URL = 'http://10.0.0.104:5000';
class SplashScreen extends Component{
    constructor(props){
        super(props);
        this.authenticateSession();
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
                            navigation.replace(goal,{token: jsonRes.token});
                        }else if(jsonRes.message =='jwt expired'){
                            await AsyncStorage.removeItem('@token');
                            navigation.replace('Login');
                        }
                    } catch (err) {
                        console.log(err);
                    };
                })
            }else{
                navigation.replace('Login');
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