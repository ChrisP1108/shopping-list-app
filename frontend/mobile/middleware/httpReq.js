import axios from 'axios'

import { getToken } from './storage';

const path = 'http://localhost:5000/api'

function header(token) {
    return { 
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}


export async function httpGet(url) {
    const token = await getToken();
    console.log(token);
    try {
        const res = await fetch(path + url, {
            method: 'GET',
            mode: 'no-cors',
            headers: header(token)
        });
        return { status: res.status, ok: res.ok, data: await res.json()}
    } catch (err) {
        return { status: null, ok: false, msg: err}
    }
}