import AsyncStorage from '@react-native-async-storage/async-storage';

// Token Storage


export async function getToken(): Promise<string | null> {
    try {
        const token: string | null = await AsyncStorage.getItem('token');
        return token
    } catch(err) {
        console.log(err);
        return null
    }
}

export async function storeToken(token: string): Promise<void> {
    try {
        await AsyncStorage.setItem('token', token);
        const tokenCheck: string | null = await AsyncStorage.getItem('token');
        if (token === tokenCheck) {
            return 
        } else console.error('Error In AsyncStorage.  Token Stored Does Not Match Token Input')
    } catch(err) {
        console.log(err);
        console.error('Error Storing Web Token In AsyncStorage')
    }
}

// User Theme Color

export async function getColor(): Promise <string | null> {
    try {
        const themeColor: string | null = await AsyncStorage.getItem('themeColor');
        return themeColor
    } catch(err) {
        console.log(err);
        return null
    }
}

export async function storeColor(value: string): Promise<void> {
    try {
        await AsyncStorage.setItem('themeColor', value);
        const themeColorCheck: string | null = await AsyncStorage.getItem('themeColor');
        if (value === themeColorCheck) {
            return 
        } else console.error('Error In AsyncStorage.  Theme Color Stored Does Not Match Theme Color Input')
    } catch(err) {
        console.log(err);
        console.error('Error Storing Theme Color In AsyncStorage')
    }
}