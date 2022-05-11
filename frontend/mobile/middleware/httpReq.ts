import { getToken } from './storage';

const path = 'http://192.168.0.102:5000/api'

export const timeoutRes = { status: 408, ok: false, msg: 'Server Connection Timed Out' };

interface resInterface {
    status: number | null,
    ok: boolean,
    data?: object | Array<any>,
    msg?: any
}

function header(token: string | null): any {
    return { 
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}

export async function httpGet(url: string): Promise<resInterface> {
    const token: string | null = await getToken();
    try {
        const res: any = await fetch(path + url, {
            method: 'GET',
            mode: 'cors',
            headers: header(token)
        });
        return { status: res.status, ok: res.ok, data: await res.json()}
    } catch (err) {
        return { status: null, ok: false, msg: err}
    }
}

export async function httpPost(url: string, data: any): Promise<resInterface> {
    const token: string | null = await getToken();
    try {
        const res: any = await fetch(path + url, {
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

export async function httpPut(url: string, data: any): Promise<resInterface> {
    const token: string | null = await getToken();
    try {
        const res: any = await fetch(path + url, {
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

export async function httpDelete(url: string): Promise<resInterface> {
    const token: string | null = await getToken();
    try {
        const res: any = await fetch(path + url, {
            method: 'DELETE',
            mode: 'cors',
            headers: header(token)
        });
        return { status: res.status, ok: res.ok, data: await res.json()}
    } catch (err) {
        return { status: null, ok: false, msg: err}
    }
}
