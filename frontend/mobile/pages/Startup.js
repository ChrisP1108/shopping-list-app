import React, { useState, useEffect } from 'react';
import RNRestart from 'react-native-restart';

import { Text, View, Image, Animated, StyleSheet } from 'react-native';
import { useInterval } from 'react-interval-hook';
import Svg, { G, Path } from 'react-native-svg';
import { getThemeColor } from '../observables/themeColor.js';

import LoadingSpinner from '../components/LoadingSpinner';
import Button from '../components/Button';
import { globalStyles } from '../styles.js';

function Startup({ error }) {

    function reload() {
        RNRestart.Restart();
    }

    return (
        <>
            <Image source={require('../assets/shopping-cart-image.png')} 
                style={{width: '65%', height: '35%', marginTop: 'auto' }}
            /> 
            <Text style={{fontSize: 40, fontWeight: 'bold', 
                color: 'black', marginTop: 20, fontFamily: 'Roboto'}}>
                    Memshop
            </Text>
            <Text style={{fontSize: 20, fontWeight: 'bold', 
                color: '#fff', marginTop: 4, fontFamily: 'Roboto'}}>
                    Your Shopping List Made Mobile
            </Text>
            <View style={{marginTop: 40, marginBottom: 'auto', alignItems: 'center'}}>
                { !error.isErr && <LoadingSpinner /> }
                { error.isErr && 
                    <Text style={styles.errMsg}>
                        {error.msg}
                    </Text>
                }   
                { error.isErr &&
                    <Text style={styles.errMsg}>
                            Reload Or Try Back Later
                    </Text>
                }
                { error.isErr && 
                    <View style={{marginTop: 40, marginBottom: 'auto'}}>
                        <Button pressed={reload} type='refresh' name='Reload'/> 
                    </View>
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    errMsg: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#b71c1c',
        textAlign: 'center',
        marginTop: 8
    }
});

export default Startup;
