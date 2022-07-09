import React from 'react';
import {
    StyleSheet,
    Pressable,
    Text,
    View,
    Image,
    TouchableHighlight
} from 'react-native';

const ConfigButton = (props) =>{
    return(
        <TouchableHighlight onPress={()=>props.onPress()}>
            <View>
                <Image
                    style={styles.config}
                    source={require('./configIcon/settings_icon.png')}
                />
            </View>
        </TouchableHighlight> 
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    config: {
        width: 35,
        height: 35,
    },
});

export default ConfigButton;