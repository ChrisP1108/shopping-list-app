import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { getThemeColor} from '../observables/themeColor';
import { getRoute, setRoute } from '../observables/router';
import { getData, setData } from '../observables/data.js';

import { httpReq } from '../middleware/httpReq';

import { globalStyles } from '../App';


function Checklist() {
    return (
        <>
            <View style={[globalStyles.sectionContainer, {borderColor: getThemeColor()._value}]}>
                <Text>
                    Checklist Component
                </Text>
            </View>
        </>
    )
}

export default Checklist;