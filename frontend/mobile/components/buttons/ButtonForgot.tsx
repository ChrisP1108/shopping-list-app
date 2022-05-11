import React from 'react';
import { TouchableOpacity } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

function ButtonForgot({ pressed, size, color }: any) {

    return (
        <TouchableOpacity onPress={() => pressed()} style={{marginLeft: 20}}>
            <Svg 
                width={size} height={size} viewBox="0 0 56.000000 56.000000"
                preserveAspectRatio="xMidYMid meet">

                <G transform="translate(0.000000,45.000000) scale(0.100000,-0.100000)"
                fill="#000000" stroke="none">
                    <Path d="M84 431 c-36 -17 -84 -62 -84 -81 0 -4 17 -19 37 -33 l37 -27 29 30
                    c31 31 55 37 88 20 31 -17 23 -47 -21 -75 -48 -30 -73 -66 -68 -97 3 -20 10
                    -23 50 -26 43 -3 49 0 59 22 7 14 29 36 49 50 70 46 77 126 17 184 -57 55
                    -120 66 -193 33z"/>
                    
                    <Path d="M107 114 c-4 -4 -7 -29 -7 -56 l0 -48 56 0 55 0 -3 53 -3 52 -45 3
                    c-25 2 -49 0 -53 -4z"/>
                </G>
            </Svg>
        </TouchableOpacity>
    )

}

export default ButtonForgot;