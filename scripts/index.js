// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = newCardPopup.querySelector('.popup__form');
const closePopupButton = newCardPopup.querySelector('.popup__close');

// @todo: Функция создания карточки
function createCard(cardData, handleDeleteCard) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener('click', () => {
    handleDeleteCard(cardElement);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function handleDeleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
}

// @todo: Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}

// @todo: Обработчик добавления новой карточки
function handleNewCardSubmit(event) {
  event.preventDefault();

  const placeName = newCardForm.querySelector('.popup__input_type_card-name').value;
  const placeLink = newCardForm.querySelector('.popup__input_type_url').value;

  const newCardData = {
    name: placeName,
    link: placeLink,
  };

  const newCard = createCard(newCardData, handleDeleteCard);
  placesList.append(newCard);

  closePopup(newCardPopup);
  newCardForm.reset();
}

// @todo: Слушатели событий
addButton.addEventListener('click', () => openPopup(newCardPopup));
closePopupButton.addEventListener('click', () => closePopup(newCardPopup));
newCardForm.addEventListener('submit', handleNewCardSubmit);

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const card = createCard(cardData, handleDeleteCard);
  placesList.append(card);
});