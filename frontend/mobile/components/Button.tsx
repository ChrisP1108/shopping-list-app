import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

import ButtonRefresh from './buttons/ButtonRefresh';
import ButtonLogin from './buttons/ButtonLogin';
import ButtonForgot from './buttons/ButtonForgot';
import ButtonAddUser from './buttons/ButtonAddUser';

function Button({ type, name, pressed }: any) {

    const size = 64;
    const color = '#000';

    function buttonType(): any {
        switch(type) {
            case 'refresh':
                return <ButtonRefresh pressed={pressed} 
                    size={size} color={color} />
            case 'login':
                return <ButtonLogin pressed={pressed} 
                size={size} color={color} />
            case 'forgot':
                return <ButtonForgot pressed={pressed} 
                size={size} color={color} />
            case 'addUser':
                return <ButtonAddUser pressed={pressed} 
                size={size} color={color} />
        }
    }

    return (
        <View style={styles.container}>
            { buttonType() }
            <Text style={styles.buttonText}>{name}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'roboto',
        fontSize: 16,
        color: '#000',
        textAlign: 'center'
    }
});

export default Button;