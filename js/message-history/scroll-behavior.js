import { MESSAGE } from '../html-operations/constants-html.js';
import { showPartOfMessageHistory } from './show-message-history.js';

function checkScrollPosition() {
    const height = MESSAGE.HISTORY.offsetHeight;
    const screenHeight = MESSAGE.SCROLL.offsetHeight;
    const scrolled =  MESSAGE.SCROLL.scrollHeight - screenHeight - MESSAGE.SCROLL.scrollTop;
    const threshold = height - screenHeight / 4;
    const position = scrolled + screenHeight;

    if (position >= threshold) {
        showPartOfMessageHistory()
    }
}

function isScrolled() {
    const screenHeight = MESSAGE.SCROLL.offsetHeight;
    const scrolled =  MESSAGE.SCROLL.scrollHeight - MESSAGE.SCROLL.offsetHeight - MESSAGE.SCROLL.scrollTop;

    return (scrolled > screenHeight)
}

export { checkScrollPosition, isScrolled }