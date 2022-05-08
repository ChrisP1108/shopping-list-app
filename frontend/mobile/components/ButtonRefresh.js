import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useInterval } from 'react-interval-hook';
import Svg, { G, Path } from 'react-native-svg';
import { getThemeColor } from '../observables/themeColor.js';

function ButtonRefresh({ pressed }) {

    return (
        <TouchableOpacity onPress={() => pressed()}>
            <Svg 
                width={64} height={64} viewBox="0 0 56.000000 56.000000"
                preserveAspectRatio="xMidYMid meet">

                <G transform="translate(0.000000,56.000000) scale(0.100000,-0.100000)"
                fill="#000000" stroke="none">
                    <Path d="M183 469 c-45 -22 -103 -90 -103 -121 0 -10 3 -18 8 -18 4 0 16 -3
                    28 -6 16 -4 26 2 42 30 36 61 112 85 182 56 31 -13 32 -14 11 -22 -14 -5 -21
                    -15 -19 -25 2 -13 18 -20 62 -26 83 -12 89 -8 81 56 -10 69 -21 97 -40 97 -13
                    0 -19 -12 -16 -32 1 -11 0 -11 -44 12 -53 27 -137 27 -192 -1z"/>
                    
                    <Path d="M399 203 c-16 -25 -40 -44 -71 -57 -46 -19 -48 -19 -94 -1 -44 17
                    -46 19 -25 27 14 5 21 14 19 25 -2 14 -18 20 -63 26 -84 10 -87 8 -79 -55 9
                    -69 20 -98 38 -98 8 0 17 8 21 19 5 18 6 18 42 0 85 -43 208 -13 264 64 35 48
                    37 73 7 81 -34 9 -33 9 -59 -31z"/>
                </G>
            </Svg>
        </TouchableOpacity>
    )

}

export default ButtonRefresh;