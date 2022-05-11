import React from 'react';
import { TouchableOpacity } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

function ButtonLogin({ pressed, size, color }: any) {

    return (
        <TouchableOpacity onPress={() => pressed()} style={{marginRight: 16}}>
            <Svg 
                width={size} height={size} viewBox="0 0 64.000000 43.000000"
                preserveAspectRatio="xMidYMid meet">

                <G transform="translate(0.000000,43.000000) scale(0.100000,-0.100000)"
                fill={color} stroke="none">
                    <Path d="M227 424 c-11 -12 -8 -126 3 -119 6 3 10 26 10 51 l0 44 185 0 185 0
                    0 -185 0 -185 -185 0 -185 0 0 55 c0 30 -4 55 -10 55 -6 0 -10 -28 -10 -65 l0
                    -65 208 2 207 3 0 205 0 205 -201 3 c-110 1 -203 -1 -207 -4z" />

                    <Path d="M307 353 c-4 -3 -7 -21 -7 -40 l0 -33 -150 0 -150 0 0 -60 0 -60 150
                    0 150 0 0 -34 c0 -19 5 -38 11 -41 14 -9 234 119 234 136 0 7 -49 42 -109 76
                    -112 65 -118 68 -129 56z m119 -80 c46 -27 84 -50 84 -53 0 -4 -149 -90 -170
                    -98 -5 -2 -10 12 -12 30 l-3 33 -147 3 -148 3 0 29 0 29 148 3 147 3 3 33 c2
                    17 6 32 9 32 3 0 43 -21 89 -47z" />
                </G>
            </Svg>
        </TouchableOpacity>
    )

}

export default ButtonLogin;