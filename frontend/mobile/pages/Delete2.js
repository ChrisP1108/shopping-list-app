import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { getThemeColor} from '../observables/themeColor';
import { getRoute, setRoute } from '../observables/router';
import { getData, setData } from '../observables/data.js';

import { httpReq } from '../middleware/httpReq';

import { globalStyles } from '../App';


function Delete2() {
    return (
        <>
            <View style={[globalStyles.sectionContainer, {borderColor: getThemeColor()._value}]}>
                <Text>
                    Delete2 Component
                </Text>
            </View>
        </>
    )
}

export default Delete2;