import React from 'react';
import {
    StyleSheet,
    Pressable,
    Text,
    View,
} from 'react-native';
const ConfigButton = (props) =>{
    return(
        <Pressable onPress={()=>props.onPress()}>
            <Text>CONFIG</Text>
        </Pressable>
    );
}
export default ConfigButton;