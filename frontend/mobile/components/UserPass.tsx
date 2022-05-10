import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, SafeAreaView } from 'react-native';

import { getThemeColor} from '../observables/themeColor';
import { getRoute, setRoute } from '../observables/router';
import { getData, setData } from '../observables/data';

import { httpGet } from '../middleware/httpReq';

import { globalStyles } from '../styles';


function UserPass({ userPassData, inputError }) {

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const errMsg = 'Must Be Between 8 And 15 Characters In Length';

    function inputValues(input) {
        const output = { ...credentials, [input.name]: input.value };
        setCredentials(output);
        userPassData(output);
    }

    function hasErr(type) {
        if (inputError) {
            if (credentials[type].length < 8 || credentials[type].length > 15) {
                return true
            }
        } else return false
    }

    return (
        <>
            <Text style={globalStyles.fieldHeadingText}>
                Username
            </Text>
            <TextInput style={[globalStyles.textInput, 
                {borderColor: hasErr('username') ? globalStyles.fieldErrorBorderColor.color : getThemeColor()._value}]} 
                onChange={(e) => inputValues({ name: 'username', value: e.nativeEvent.text })} maxLength={15} />
            { hasErr('username') && <Text style={globalStyles.fieldErrorText}>{errMsg}</Text> }
            <Text style={globalStyles.fieldHeadingText}>
                Password
            </Text>
            <TextInput style={[globalStyles.textInput, 
            {borderColor: hasErr('password') ? globalStyles.fieldErrorBorderColor.color : getThemeColor()._value}]} 
                onChange={(e) => inputValues({ name: 'password', value: e.nativeEvent.text })} maxLength={15} />
            { hasErr('password') && <Text style={globalStyles.fieldErrorText}>{errMsg}</Text> }
        </>
    )
}

export default UserPass;