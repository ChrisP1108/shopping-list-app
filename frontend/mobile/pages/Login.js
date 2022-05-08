import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { getThemeColor} from '../observables/themeColor';
import { getRoute, setRoute } from '../observables/router';
import { getData, setData } from '../observables/data';

import { httpGet, httpPost, timeoutRes } from '../middleware/httpReq';
import { storeToken } from '../middleware/storage';

import UserPass from '../components/UserPass';
import Button from '../components/Button';

import { globalStyles } from '../styles';


function Login() {

    const [credentials, setCredentials] = useState(clearCredentials());
    const [resError, setResError] = useState({ isErr: false, msg: null});
    const [inputError, setInputError] = useState(false);

    function clearCredentials() {
        return { username: '', password: '' }
    }

    function login() {
        let loaded = false;
        httpPost('/users/login', credentials).then(res => {
            loaded = true;
            if (res.ok) {
                setData(res.data);
                console.log(res.data);
                storeToken(res.data.token);
                clearCredentials();
                setRoute('User');
            } else if (!res.ok && res.status) {
                setResError({ isErr: true, msg: res.data.msg });
                clearCredentials();
            } else {
                setResError({ isErr: true, msg: 'Error Communicating With Server. Please Try Again'});
            }
        });
        setTimeout(() => {
            if (!loaded) {
                console.error(timeoutRes.msg)
                setResError({ isErr: true, msg: timeoutRes.msg})
            }
        }, 12000)
    }

    function inputChecker() {
        const { username, password } = credentials;
        if (!username || !password || username.length < 8 || username.length > 15
            || password.length < 8 || username.length > 15) {
                setInputError(true);
                return
        }
        setResError({ isErr: false, msg: null })
        login();
    }

    return (
        <>
            <View style={[globalStyles.sectionContainer, { borderColor: getThemeColor()._value }]}>
                <UserPass inputError={inputError} userPassData={setCredentials} />
                { resError.isErr && <Text style={globalStyles.serverErrorText}>{resError.msg}</Text> }
                <View style={{marginTop: 16}}>
                    <Button pressed={inputChecker} type='login' name='Login'/> 
                </View>
            </View>
        </>
    )
}

export default Login;