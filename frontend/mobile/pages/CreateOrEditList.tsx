import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { getThemeColor} from '../observables/themeColor';
import { getRoute, setRoute } from '../observables/router';
import { getData, setData } from '../observables/data';

import { httpGet } from '../middleware/httpReq';

import { globalStyles } from '../styles';


function CreateOrEditList({ edit }: boolean) {
    return (
        <>
            <View style={[globalStyles.sectionContainer, {borderColor: getThemeColor()._value}]}>
                <Text>
                    CreateOrEditList Component
                </Text>
            </View>
        </>
    )
}

export default CreateOrEditList;