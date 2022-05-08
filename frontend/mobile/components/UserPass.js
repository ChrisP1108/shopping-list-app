import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, SafeAreaView } from 'react-native';

import { getThemeColor} from '../observables/themeColor';
import { getRoute, setRoute } from '../observables/router';
import { getData, setData } from '../observables/data';

import { httpGet } from '../middleware/httpReq';

import { globalStyles } from '../styles';


function UserPass({ username, password }) {

    return (
        <>
            <Text style={globalStyles.fieldHeadingText}>
                Username
            </Text>
            <TextInput style={[globalStyles.textInput, {borderColor: getThemeColor()._value}]} 
                onChange={(e) => username(e.nativeEvent.text)} maxLength={15} />
            <Text style={globalStyles.fieldHeadingText}>
                Password
            </Text>
            <TextInput style={[globalStyles.textInput, {borderColor: getThemeColor()._value}]} 
                onChange={(e) => password(e.nativeEvent.text)} maxLength={15} />
        </>
    )
}

export default UserPass;