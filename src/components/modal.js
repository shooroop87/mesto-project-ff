function openModal(popup) {
    popup.classList.add('popup_is-opened');
    addEscListener();
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    removeEscListener();
}

// Закрытие popup по нажатию Esc
function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        if (popup) {
            closeModal(popup);
        }
    }
}

// Добавление слушателя для Esc
function addEscListener() {
    document.addEventListener('keydown', handleEscClose);
}

// Удаление слушателя для Esc
function removeEscListener() {
    document.removeEventListener('keydown', handleEscClose);
}

export { openModal, closeModal };
