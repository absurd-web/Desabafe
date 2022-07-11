import React from 'react';
import {
    StyleSheet,
    Pressable,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

const ReturnButton = (props) =>{
    return(
        <TouchableOpacity onPress={()=>props.onPress()}>
            <View>
                <Image
                    style={styles.config}
                    source={require('./icons/return.png')}
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
        width: 40,
        height: 40,
    },
});

export default ReturnButton;