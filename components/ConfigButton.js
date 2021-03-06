import React from 'react';
import {
    StyleSheet,
    Pressable,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

const ConfigButton = (props) =>{
    return(
        <TouchableOpacity onPress={()=>props.onPress()}>
            <View>
                <Image
                    style={styles.config}
                    source={require('./icons/settings_icon.png')}
                />
            </View>
        </TouchableOpacity> 
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