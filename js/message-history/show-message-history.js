import { MESSAGE, POPUPS, ERROR } from '../html-operations/constants-html.js';
import { showHTMLElement, deleteMessageHistory } from '../html-operations/html-nodes-operations.js';
import { SERVER_PATH, REQUEST_METHOD } from '../server/constants-server.js';
import { getResponseFromServer } from '../server/server-requests.js';
import Cookies from 'js-cookie';
import { isScrolled } from './scroll-behavior.js';

let MESSAGE_HISTORY;
const NUMBER_OF_SHOWN_MESSAGES = 20;
let MY_EMAIL;

function formattingTime(time) {
    return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

async function getInfo(path) {
    const code = Cookies.get('code');

    try {
        const response = await getResponseFromServer(path,
            REQUEST_METHOD.get,
            {
                'Content-Type': 'application/json;charset=UTF-8',
                Authorization: `Bearer ${code}`
            });

        if (response.status >= 200 && response.status <= 299) {
            return response.body;
        } else {
            showHTMLElement(POPUPS.ERROR);
            ERROR.FEEDBACK.textContent = `Ошибка HTTP: ${response.status}`
        }
    } catch (error) {
        showHTMLElement(POPUPS.ERROR);
        ERROR.FEEDBACK.textContent = `Ошибка ${error.name}: ${error.message}`
    }
}

function createMessageNode(messageInfo, myEmail) {
    const {
        createdAt,
        text,
        user: {
            email,
            name
        }
    } = messageInfo;

    const formattedCreatedAt = formattingTime(createdAt);

    const message = MESSAGE.TEMPLATE.content.cloneNode(true);

    email === myEmail
        ? message.querySelector('#messageType').className = 'message-story__outgoing-message'
        : message.querySelector('#messageType').className = 'message-story__incoming-message';

    message.querySelector('.message-story__sender').textContent = name;
    message.querySelector('.message-story__message-text').textContent = text;
    message.querySelector('.message-story__sending-time').textContent = formattedCreatedAt;

    return message
}

function createMessageBlock(messageHistory, myEmail) {
    const messageBlock = [];

    messageHistory.forEach((messageInfo) => {
        const message = createMessageNode(messageInfo, myEmail);
        messageBlock.push(message)
    })

    return messageBlock
}

function insertMessageBlock(messageHistory, myEmail, typeOfInsert = 'append') {
    const messageBlock = createMessageBlock(messageHistory, myEmail);
    typeOfInsert === 'append'
        ? MESSAGE.HISTORY.append(...messageBlock)
        : MESSAGE.HISTORY.prepend(...messageBlock)
}

async function getAndShowMessageHistory() {
    deleteMessageHistory();

    MESSAGE_HISTORY = await getInfo(SERVER_PATH.messages);
    if (!MESSAGE_HISTORY) return;

    const myData = await getInfo(`${SERVER_PATH.user}/${SERVER_PATH.me}`);
    MY_EMAIL = myData.email;

    insertMessageBlock(MESSAGE_HISTORY.messages.slice(0, NUMBER_OF_SHOWN_MESSAGES), MY_EMAIL);

    MESSAGE.SCROLL.style['scroll-behavior'] = 'auto';
    MESSAGE.SCROLL.scrollTop = MESSAGE.SCROLL.scrollHeight
}

function showPartOfMessageHistory() {
    insertMessageBlock(MESSAGE_HISTORY.messages.slice(0, NUMBER_OF_SHOWN_MESSAGES), MY_EMAIL);

    MESSAGE.SCROLL.style['scroll-behavior'] = 'auto';
}

function showOnlyLastMessage(oneMessageHistory) {
    if (!oneMessageHistory) return;

    insertMessageBlock([oneMessageHistory], MY_EMAIL, 'prepend');

    if ((document.hidden || isScrolled()) && oneMessageHistory.user.email !== MY_EMAIL) { return }

    MESSAGE.SCROLL.style['scroll-behavior'] = 'smooth';
    MESSAGE.SCROLL.scrollTop = MESSAGE.SCROLL.scrollHeight;
}

export { getAndShowMessageHistory, showPartOfMessageHistory, showOnlyLastMessage }
