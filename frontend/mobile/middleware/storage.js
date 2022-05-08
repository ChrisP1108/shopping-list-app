import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';

import { secretKey } from './secretKey';

// Token Storage

export async function getToken() {
    try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            const decryptToken = CryptoJS.AES.decrypt(token, secretKey);
            return decryptToken.toString(CryptoJS.enc.Utf8)
        } else return null
    } catch(err) {
        console.log(err);
        return null
    }
}

export async function storeToken(token) {
    try {
        console.log(token);
        const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString();
        await AsyncStorage.setItem('token', encryptedToken);
        const tokenCheck = await AsyncStorage.getItem('token');
        const decryptToken = CryptoJS.AES.decrypt(tokenCheck, secretKey);
        const unEncryptedToken = decryptToken.toString(CryptoJS.enc.Utf8);
        if (token === unEncryptedToken) {
            return unEncryptedToken
        } else console.error('Error In AsyncStorage.  Token Stored Does Not Match Token Input')
    } catch(err) {
        console.log(err);
        console.error('Error Storing Web Token In AsyncStorage')
    }
}