import { showOnlyLastMessage } from '../message-history/show-message-history.js';
import { POPUPS, ERROR } from '../html-operations/constants-html.js';
import { showHTMLElement } from '../html-operations/html-nodes-operations.js';
import { SOCKET_URL } from './constants-server.js';

let SOCKET;

function websocketPermanentConnection(code) {
    SOCKET = new WebSocket(`${SOCKET_URL}?${code}`);

    SOCKET.onerror = (event) => {
        showHTMLElement(POPUPS.ERROR);
        ERROR.FEEDBACK.textContent = `Ошибка соединения: ${event.reason}. Перезагрузите страницу или обратитесь в службу поддержки`
    };

    SOCKET.onmessage = (event) => {
        try {
            showOnlyLastMessage(JSON.parse(event.data))
        } catch(error) {
            showHTMLElement(POPUPS.ERROR);
            ERROR.FEEDBACK.textContent = `Ошибка ${error.name}: ${error.message}`
        }
    };

    SOCKET.onclose = () => { websocketPermanentConnection(code) }
}

export { websocketPermanentConnection, SOCKET }