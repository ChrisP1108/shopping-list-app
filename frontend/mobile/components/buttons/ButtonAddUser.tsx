import React from 'react';
import { TouchableOpacity } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

function ButtonAddUser({ pressed, size, color }: any) {

    return (
        <TouchableOpacity onPress={() => pressed()} style={{marginLeft: 12}}>
            <Svg 
                width={size} height={size} viewBox="0 0 56.000000 56.000000"
                preserveAspectRatio="xMidYMid meet">

                <G transform="translate(0.000000,48.000000) scale(0.100000,-0.100000)"
                fill="#000000" stroke="none">
                    <Path d="M140 463 c-55 -38 -72 -91 -46 -145 39 -81 149 -90 200 -16 20 29 20
                    97 0 126 -34 49 -109 66 -154 35z"/>
                    <Path d="M94 201 c-64 -29 -84 -62 -84 -137 l0 -64 135 0 135 0 -20 33 c-26
                    41 -26 103 0 142 14 22 16 31 7 37 -23 15 -131 8 -173 -11z"/>
                    <Path d="M323 200 c-26 -11 -63 -66 -63 -93 0 -32 29 -76 61 -93 66 -33 149
                    18 149 92 0 68 -83 121 -147 94z m57 -64 c0 -19 4 -24 20 -21 13 2 20 -2 20
                    -11 0 -8 -9 -14 -20 -14 -13 0 -20 -7 -20 -20 0 -11 -4 -20 -10 -20 -5 0 -10
                    9 -10 20 0 15 -7 20 -25 20 -31 0 -33 17 -2 22 14 2 23 11 25 26 4 30 22 28
                    22 -2z"/>
                </G>
            </Svg>
        </TouchableOpacity>
    )

}

export default ButtonAddUser;