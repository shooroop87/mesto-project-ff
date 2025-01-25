import { openModal } from './modal.js';

function createCard(cardData) {
    const cardTemplate = document.querySelector('#card-template').content; 
    const cardElement = cardTemplate.cloneNode(true).querySelector('.card');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    // Удаление карточки
    deleteButton.addEventListener('click', () => {
        cardElement.remove();
    });

    // Лайк карточки
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
    });

    // Открытие попапа изображения
    cardImage.addEventListener('click', () => {
        const imagePopup = document.querySelector('.popup_type_image');
        const imagePopupImage = imagePopup.querySelector('.popup__image');
        const imagePopupCaption = imagePopup.querySelector('.popup__caption');

        imagePopupImage.src = cardData.link;
        imagePopupImage.alt = cardData.name;
        imagePopupCaption.textContent = cardData.name;

        openModal(imagePopup);
    });

    return cardElement;
}

export { createCard };
