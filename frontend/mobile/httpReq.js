export async function httpReq(url, method, data, token) {
    if (!method) {
        method = 'GET'
    }
    try {
        const res = await fetch(url, {
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