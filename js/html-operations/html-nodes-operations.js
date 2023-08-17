function showHTMLElement(element) {
    element.style.visibility = 'visible';
}

function hideHTMLElement(element) {
    element.style.visibility = 'hidden';
}

function showTextContent(htmlNode, feedbackText, color) {
    htmlNode.textContent = feedbackText;
    htmlNode.style.color = color
}

function clearTextContent(htmlNode) {
    htmlNode.textContent = '';
}

function clearHTMLValue(htmlNode) {
    htmlNode.value = '';
}

function deleteHTMLNodes(deletedElements) {
    deletedElements.forEach(function (element) {
        element.remove();
    });
}

function deleteMessageHistory() {
    const deletedElements = document.querySelectorAll('.message-story__outgoing-message, .message-story__incoming-message');
    deleteHTMLNodes(deletedElements)
}


export { showHTMLElement, hideHTMLElement, showTextContent, clearTextContent, clearHTMLValue, deleteHTMLNodes, deleteMessageHistory }
