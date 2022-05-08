import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { getThemeColor} from '../observables/themeColor';
import { getRoute, setRoute } from '../observables/router';
import { getData, setData } from '../observables/data';

import { httpGet } from '../middleware/httpReq';

import UserPass from '../components/UserPass';

import { globalStyles } from '../styles';


function Login() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    function username(text) {
        console.log(text)
        setCredentials({...credentials, username: text});
    }

    function password(text) {
        console.log(text)
        setCredentials({...credentials, password: text});
    }

    return (
        <>
            <View style={[globalStyles.sectionContainer, {borderColor: getThemeColor()._value}]}>
                <UserPass credentialsChange={username} password={password} />
            </View>
        </>
    )
}

export default Login;