import { AUTHORIZATION, FEEDBACK } from '../html-operations/constants-html.js';
import { showTextContent, clearTextContent } from '../html-operations/html-nodes-operations.js';
import { SERVER_PATH, REQUEST_METHOD } from '../server/constants-server.js';
import { getResponseFromServer } from '../server/server-requests.js';

function checkEmail(email) {
    email = email.trim();

    if (email.length >= 5
        && email.includes('@')
        && email.includes('.')) {
        return true
    } else {
        showTextContent(AUTHORIZATION.FEEDBACK, FEEDBACK.TEXT.incorrectEmail, FEEDBACK.COLOR.red);
        return false
    }
}

async function getCode() {
    clearTextContent(AUTHORIZATION.FEEDBACK);
    const email = AUTHORIZATION.EMAIL.value;

    if (!checkEmail(email)) return;

    try {
        const response = await getResponseFromServer(SERVER_PATH.user,
            REQUEST_METHOD.post,
            {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            JSON.stringify({ email }));

        if (response.status >= 200 && response.status <= 299) {
            showTextContent(AUTHORIZATION.FEEDBACK, FEEDBACK.TEXT.auth200, FEEDBACK.COLOR.green);
            AUTHORIZATION.EMAIL.value = ''
        } else {
            showTextContent(AUTHORIZATION.FEEDBACK, FEEDBACK.TEXT.auth400, FEEDBACK.COLOR.red)
        }
    } catch {
        showTextContent(AUTHORIZATION.FEEDBACK, FEEDBACK.TEXT.serverError, FEEDBACK.COLOR.red)
    }
}

export { getCode }
