import Cookies from 'js-cookie';
import { POPUPS, SETTINGS, FEEDBACK } from '../html-operations/constants-html.js';
import { SOCKET } from '../server/websocket.js';
import { hideHTMLElement, showTextContent, clearTextContent, clearHTMLValue } from '../html-operations/html-nodes-operations.js';
import { SERVER_PATH, REQUEST_METHOD } from '../server/constants-server.js';
import { getResponseFromServer } from '../server/server-requests.js';
import { websocketPermanentConnection } from '../server/websocket.js';
import { getAndShowMessageHistory } from '../message-history/show-message-history.js';

function checkName(name) {
    if (name.trim() !== '') {
        return true
    } else {
        showTextContent(SETTINGS.FEEDBACK, FEEDBACK.TEXT.emptyName, FEEDBACK.COLOR.red)
        return false
    }
}

async function changeName() {
    clearTextContent(SETTINGS.FEEDBACK);

    const name = SETTINGS.NAME.value;
    if (!checkName(name)) return;

    const code = Cookies.get('code');

    try {
        const response = await getResponseFromServer(SERVER_PATH.user,
            REQUEST_METHOD.patch,
            {
                'Content-Type': 'application/json;charset=UTF-8',
                Authorization: `Bearer ${code}`
            },
            JSON.stringify({ name }));

        if (response.status >= 200 && response.status <= 299) {
            clearHTMLValue(SETTINGS.NAME);
            hideHTMLElement(POPUPS.SETTINGS);
            hideHTMLElement(SETTINGS.CLOSE_BUTTON);
            if (SOCKET) return;
            websocketPermanentConnection(code);
            getAndShowMessageHistory()
        } else {
            switch (response.status) {
                case 400:
                    showTextContent(SETTINGS.FEEDBACK, FEEDBACK.TEXT.incorrectName, FEEDBACK.COLOR.red);
                    break;
                case 401:
                    showTextContent(SETTINGS.FEEDBACK, FEEDBACK.TEXT.incorrectCode, FEEDBACK.COLOR.red);
                    break;
                default: showTextContent(SETTINGS.FEEDBACK, FEEDBACK.TEXT.globalErrorMessage, FEEDBACK.COLOR.red)
            }
        }
    } catch {
        showTextContent(SETTINGS.FEEDBACK, FEEDBACK.TEXT.serverError, FEEDBACK.COLOR.red)
    }
}

export { changeName }
