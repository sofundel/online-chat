const MAIN_BUTTONS = {
    SETTINGS: document.querySelector('.main-buttons__settings'),
    EXIT: document.querySelector('.main-buttons__exit'),
}

const MESSAGE = {
    SCROLL: document.querySelector('.scrollable'),
    SCROLL_DOWN_BUTTON: document.querySelector('.message-story__scroll-bottom'),
    HISTORY: document.querySelector('.message-story'),
    TEMPLATE: document.querySelector('#messageTemplate')
}

const INPUT_FORM = {
    FORM: document.querySelector('.input-message-form'),
    SEND_BUTTON: document.querySelector('.input-message-form__send-button'),
    MESSAGE_TEXT: document.querySelector('.input-message-form__message-text')
}

const POPUPS = {
    AUTHORIZATION: document.querySelector('#authorizationPopup'),
    CONFIRMATION: document.querySelector('#confirmationPopup'),
    SETTINGS: document.querySelector('#settingsPopup'),
    ERROR: document.querySelector('#errorPopup'),
}

const AUTHORIZATION = {
    EMAIL: POPUPS.AUTHORIZATION.querySelector('.popup-body__info'),
    GET_CODE_BUTTON: POPUPS.AUTHORIZATION.querySelector('.popup-body__left-button'),
    ENTER_CODE_BUTTON: POPUPS.AUTHORIZATION.querySelector('.popup-body__right-button'),
    FEEDBACK: POPUPS.AUTHORIZATION.querySelector('.popup-body__feedback')
}

const CONFIRMATION = {
    CODE: POPUPS.CONFIRMATION.querySelector('.popup-body__info'),
    COME_BACK_BUTTON: POPUPS.CONFIRMATION.querySelector('.popup-body__left-button'),
    LOG_IN_BUTTON: POPUPS.CONFIRMATION.querySelector('.popup-body__right-button'),
    FEEDBACK: POPUPS.CONFIRMATION.querySelector('.popup-body__feedback')
}

const SETTINGS = {
    NAME: POPUPS.SETTINGS.querySelector('.popup-body__info'),
    CLOSE_BUTTON: POPUPS.SETTINGS.querySelector('.popup-body__close-button'),
    COME_BACK_BUTTON: POPUPS.SETTINGS.querySelector('.popup-body__left-button'),
    CHANGE_NAME_BUTTON: POPUPS.SETTINGS.querySelector('.popup-body__right-button'),
    FEEDBACK: POPUPS.SETTINGS.querySelector('.popup-body__feedback')
}

const ERROR = {
    FEEDBACK: POPUPS.ERROR.querySelector('.popup-body__error-message')
}

const FEEDBACK = {
    TEXT: {
        incorrectEmail: 'Указан некорректный email',
        auth200: 'Код направлен на указанный email',
        auth400: 'Не удалось направить код на указанный email',
        serverError: 'Упс... Что-то не так с сервером! Повторите попытку позже или обратитесь в службу поддержки',
        emptyCode: 'Введите код',
        incorrectName: 'Слишком короткое имя',
        incorrectCode: 'Ошибка авторизации',
        emptyName: 'Введите имя',
        globalErrorCode: 'Повторите попытку'
    },

    COLOR: {
        red: '#8B0000',
        green: '#00693E'
    }
}

export { MAIN_BUTTONS, MESSAGE, INPUT_FORM, POPUPS, AUTHORIZATION, CONFIRMATION, SETTINGS, ERROR, FEEDBACK }
