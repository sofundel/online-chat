import Cookies from 'js-cookie';
import { POPUPS, CONFIRMATION, FEEDBACK, SETTINGS } from '../html-operations/constants-html.js';
import { showHTMLElement, hideHTMLElement, showTextContent, clearTextContent } from '../html-operations/html-nodes-operations.js';

function autoCompletionCode() {
    const code = Cookies.get('code');

    if (code) {
        CONFIRMATION.CODE.value = code
    }
}

function checkCode(code) {
    if (code.trim() !== '') {
        return true
    } else {
        showTextContent(CONFIRMATION.FEEDBACK, FEEDBACK.TEXT.emptyCode, FEEDBACK.COLOR.red)
        return false
    }
}

function logIn() {
    clearTextContent(CONFIRMATION.FEEDBACK);

    const code = CONFIRMATION.CODE.value;
    if (!checkCode(code)) return;

    Cookies.set('code', code, { expires: 14 });

    hideHTMLElement(POPUPS.CONFIRMATION);
    showHTMLElement(POPUPS.SETTINGS);
    hideHTMLElement(SETTINGS.CLOSE_BUTTON)
}

export { autoCompletionCode, logIn }
