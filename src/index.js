// Импорты стилей
import './pages/index.css';

// Импорты данных
import { initialCards } from './components/cards.js';

// Импорты функций
import { openModal, closeModal, closeModalOverlay, initCloseButtonListeners } from './components/modal.js';
import { createCard } from './components/card.js';

// DOM узлы
const profileEditButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const editProfilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const nameInput = editProfilePopup.querySelector('.popup__input_type_name');
const descriptionInput = editProfilePopup.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const newCardForm = newCardPopup.querySelector('.popup__form');
const editProfileForm = editProfilePopup.querySelector('.popup__form');
const placesList = document.querySelector('.places__list');

// Редактирование профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;

    closeModal(editProfilePopup);
}

// Открытие попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
    openModal(editProfilePopup);
});

// Создание карточки
function handleNewCardSubmit(evt) {
    evt.preventDefault();

    const placeName = newCardForm.querySelector('.popup__input_type_card-name').value;
    const placeLink = newCardForm.querySelector('.popup__input_type_url').value;

    const cardData = { name: placeName, link: placeLink };
    const cardElement = createCard(cardData);

    placesList.prepend(cardElement);
    closeModal(newCardPopup);
    newCardForm.reset();
}

// Слушатели событий для попапов
[editProfilePopup, newCardPopup, imagePopup].forEach((popup) => {
    popup.addEventListener('mousedown', closeModalOverlay);
});

// Инициализация обработчика для кнопки закрытия
initCloseButtonListeners();

editProfileForm.addEventListener('submit', handleProfileFormSubmit);
newCardForm.addEventListener('submit', handleNewCardSubmit);
addButton.addEventListener('click', () => openModal(newCardPopup));

// Добавление класса popup_is-animated ко всем попапам
document.querySelectorAll('.popup').forEach((popup) => {
    popup.classList.add('popup_is-animated');
});

// Вывести карточки на страницу
initialCards.forEach((cardData) => {
    const card = createCard(cardData);
    placesList.append(card);
});