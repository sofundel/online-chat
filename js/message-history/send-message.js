import { INPUT_FORM, POPUPS, ERROR } from '../html-operations/constants-html.js';
import { showHTMLElement } from '../html-operations/html-nodes-operations.js';
import { SOCKET_URL } from '../server/constants-server.js';
import Cookies from 'js-cookie';

function sendMessage(text) {
    const code = Cookies.get('code');
    const socket = new WebSocket(`${SOCKET_URL}?${code}`);

    try {
        socket.onopen = () => { socket.send(JSON.stringify({ text })) };
    } catch (error) {
        showHTMLElement(POPUPS.ERROR);
        ERROR.FEEDBACK.textContent = `Ошибка ${error.name}: ${error.message}`
    }
}

function inputMessageFormHandler(event) {
    event.preventDefault();

    const messageText = INPUT_FORM.MESSAGE_TEXT.value;

    INPUT_FORM.FORM.reset();

    if (messageText.trim() === '') return;
    sendMessage(messageText)
}

export { inputMessageFormHandler }
