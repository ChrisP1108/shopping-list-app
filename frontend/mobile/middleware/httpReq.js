import { getToken } from './storage';

const path = 'http://192.168.0.102:5000/api'

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
    try {
        const res = await fetch(path + url, {
            method: 'GET',
            mode: 'cors',
            headers: header(token)
        });
        return { status: res.status, ok: res.ok, data: await res.json()}
    } catch (err) {
        return { status: null, ok: false, msg: err}
    }
}

export async function httpPost(url, data) {
    const token = await getToken();
    try {
        const res = await fetch(path + url, {
            method: 'POST',
            mode: 'cors',
            headers: header(token),
            body: JSON.stringify(data)
        });
        return { status: res.status, ok: res.ok, data: await res.json()}
    } catch (err) {
        return { status: null, ok: false, msg: err}
    }
}

export async function httpPut(url, data) {
    const token = await getToken();
    try {
        const res = await fetch(path + url, {
            method: 'PUT',
            mode: 'cors',
            headers: header(token),
            body: JSON.stringify(data)
        });
        return { status: res.status, ok: res.ok, data: await res.json()}
    } catch (err) {
        return { status: null, ok: false, msg: err}
    }
}

export async function httpDelete(url) {
    const token = await getToken();
    try {
        const res = await fetch(path + url, {
            method: 'DELETE',
            mode: 'cors',
            headers: header(token)
        });
        return { status: res.status, ok: res.ok, data: await res.json()}
    } catch (err) {
        return { status: null, ok: false, msg: err}
    }
}
