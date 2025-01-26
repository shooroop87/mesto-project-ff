function createCard(cardData, handleDelete, handleLike, handleImageClick) {
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
    deleteButton.addEventListener('click', () => handleDelete(cardElement));

    // Лайк карточки
    likeButton.addEventListener('click', () => handleLike(likeButton));

    // Открытие попапа с картинкой
    cardImage.addEventListener('click', () => handleImageClick(cardData));

    return cardElement;
}

export { createCard };
