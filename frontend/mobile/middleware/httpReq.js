import { getToken } from './storage';

const path = 'http://localhost:5000/api'

export async function httpReq(url, method, data) {
    if (!method) {
        method = 'GET'
    }
    const token = await getToken();
    try {
        const res = await fetch(path + url, {
            method,
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return { status: res.status, ok: res.ok, data: await res.json()}
    } catch (err) {
        return { status: null, ok: false, msg: err}
    }
}