import React from 'react';
import { Text, StyleSheet } from 'react-native';

import ButtonRefresh from './buttons/ButtonRefresh';
import ButtonLogin from './buttons/ButtonLogin';

function Button({ type, name, pressed }) {

    const size = 64;
    const color = '#000';

    function buttonType() {
        switch(type) {
            case 'refresh':
                return <ButtonRefresh pressed={pressed} 
                    size={size} color={color} />
            case 'login':
                return <ButtonLogin pressed={pressed} 
                size={size} color={color} />
        }
    }

    return (
        <>
            { buttonType() }
            <Text style={styles.buttonText}>{name}</Text>
        </>
    )

}

const styles = StyleSheet.create({
    buttonText: {
        fontFamily: 'roboto',
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
        marginTop: 8
    }
});

export default Button;