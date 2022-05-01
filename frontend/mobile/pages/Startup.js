import React, { useState, useEffect } from 'react';
import { Text, View, Image, Animated, StyleSheet } from 'react-native';
import { useInterval } from 'react-interval-hook';
import Svg, { G, Path } from 'react-native-svg';
import { defaultColor } from '../observables/themeColor.js';

function Startup() {
    const spinnerHighlight = defaultColor();
    const spinnerColors = [spinnerHighlight, "#fff", "#fff", "#fff", spinnerHighlight, "#fff", "#fff", "#fff"]
    
    const [spinner, setSpinner] = useState(spinnerColors);
    const [counter, setCounter] = useState([0, 4]);

    useInterval(() => {
        setSpinner(spinner.map((color, index) => 
            counter.includes(index) ? spinnerHighlight : '#fff'));
        if (counter[0] === 0) {
            setCounter([1, 5]);
        }
        if (counter[0] === 1) {
            setCounter([2, 6]);
        }
        if (counter[0] === 2) {
            setCounter([3, 7]);
        }
        if(counter[0] === 3) {
            setCounter([4, 0]);
        }
        if(counter[0] === 4) {
            setCounter([1, 5]);
        }
    }, 200);
    
    return (
        <>
            <Image source={require('../assets/shopping-cart-image.png')} 
                style={{width: '65%', height: '37%', marginTop: 'auto' }}
            /> 
            <Text style={{fontSize: 40, fontWeight: 'bold', 
                color: 'black', marginTop: 20, fontFamily: 'Roboto'}}>
                    Memshop
            </Text>
            <Text style={{fontSize: 16, fontWeight: 'bold', 
                color: '#fff', marginTop: 4, fontFamily: 'Roboto'}}>
                    Your Shopping List Made Mobile
            </Text>
            <View style={{marginTop: 40, marginBottom: 'auto'}}>
                <Svg width={80} height={80} viewBox="0 0 128 128">
                        <G>
                            <Path id="1" d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill={spinner[0]} />
                            <Path id="2" d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill={spinner[1]} transform="rotate(45 64 64)"/>
                            <Path id="3" d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill={spinner[2]} transform="rotate(90 64 64)"/>
                            <Path id="4" d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill={spinner[3]} transform="rotate(135 64 64)"/>
                            <Path id="5" d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill={spinner[4]} transform="rotate(180 64 64)"/>
                            <Path id="6" d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill={spinner[5]} transform="rotate(225 64 64)"/>
                            <Path id="7" d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill={spinner[6]} transform="rotate(270 64 64)"/>
                            <Path id="8" d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill={spinner[7]} transform="rotate(315 64 64)"/>
                            {/* <AnimateTransform attributeName="transform" type="rotate" values="0 64 64;45 64 64;90 64 64;135 64 64;180 64 64;225 64 64;270 64 64;315 64 64" calcMode="discrete" dur="720ms" repeatCount="indefinite">
                            </AnimateTransform> */}
                        </G>
                </Svg>
            </View>
        </>
    )
}

export default Startup;
