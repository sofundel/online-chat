import { SERVER_URL } from './constants-server.js';

async function getResponseFromServer(path, method, headers, body) {
    const response = await fetch(`${SERVER_URL}${path}`, {
        method: method,
        headers: headers,
        body: body,
    });

    return {
        status: response.status,
        body: await response.json()
    }
}

export { getResponseFromServer }
