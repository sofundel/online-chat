import { POPUPS, AUTHORIZATION, CONFIRMATION, SETTINGS, ERROR, INPUT_FORM, MAIN_BUTTONS, MESSAGE } from './html-operations/constants-html.js';
import { SOCKET } from './server/websocket.js';
import { showHTMLElement, hideHTMLElement, clearTextContent, clearHTMLValue, deleteMessageHistory } from './html-operations/html-nodes-operations.js';
import { getCode } from './popups/authorization.js';
import { autoCompletionCode, logIn } from './popups/confirmation.js';
import { changeName } from './popups/settings.js';
import { inputMessageFormHandler } from './message-history/send-message.js';
import { websocketPermanentConnection } from './server/websocket.js';
import { getAndShowMessageHistory } from './message-history/show-message-history.js';
import { checkScrollPosition } from './message-history/scroll-behavior.js';
import Cookies from 'js-cookie';

function checkCookies() {
    const code = Cookies.get('code');
    if (!code) {
        showHTMLElement(POPUPS.AUTHORIZATION)
    } else {
        getAndShowMessageHistory()   
        websocketPermanentConnection(code);     
    }
}

checkCookies();

AUTHORIZATION.GET_CODE_BUTTON.addEventListener('click', getCode);
AUTHORIZATION.ENTER_CODE_BUTTON.addEventListener('click', () => {
    clearTextContent(AUTHORIZATION.FEEDBACK);
    hideHTMLElement(POPUPS.AUTHORIZATION);
    showHTMLElement(POPUPS.CONFIRMATION);
    autoCompletionCode()
});

CONFIRMATION.COME_BACK_BUTTON.addEventListener('click', () => {
    clearTextContent(CONFIRMATION.FEEDBACK);
    hideHTMLElement(POPUPS.CONFIRMATION);
    showHTMLElement(POPUPS.AUTHORIZATION);
});
CONFIRMATION.LOG_IN_BUTTON.addEventListener('click', logIn);

SETTINGS.CHANGE_NAME_BUTTON.addEventListener('click', changeName);
SETTINGS.COME_BACK_BUTTON.addEventListener('click', () => {
    clearTextContent(SETTINGS.FEEDBACK);
    hideHTMLElement(POPUPS.SETTINGS);
    showHTMLElement(POPUPS.CONFIRMATION)
});
SETTINGS.CLOSE_BUTTON.addEventListener('click', () => {
    clearTextContent(SETTINGS.FEEDBACK);
    clearHTMLValue(SETTINGS.NAME);
    hideHTMLElement(POPUPS.SETTINGS);
    hideHTMLElement(SETTINGS.CLOSE_BUTTON)
});

MAIN_BUTTONS.SETTINGS.addEventListener('click', () => {
    showHTMLElement(POPUPS.SETTINGS);
    hideHTMLElement(SETTINGS.COME_BACK_BUTTON);
    showHTMLElement(SETTINGS.CLOSE_BUTTON)
});

function exit() {
    deleteMessageHistory();
    showHTMLElement(POPUPS.AUTHORIZATION);
    Cookies.remove('code');
    SOCKET.close();
    location.reload()
}

MAIN_BUTTONS.EXIT.addEventListener('click', exit)

INPUT_FORM.SEND_BUTTON.addEventListener('click', inputMessageFormHandler);

MESSAGE.SCROLL.addEventListener('scroll', checkScrollPosition);

window.addEventListener('unhandledrejection', (event) => {
    showHTMLElement(POPUPS.ERROR);
    ERROR.FEEDBACK.textContent = `Ошибка соединения: ${event.reason}. Перезагрузите страницу или обратитесь в службу поддержки`
});