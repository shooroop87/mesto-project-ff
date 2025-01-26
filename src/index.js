// Импорты стилей
import './pages/index.css';

// Импорты данных
import { initialCards } from './components/cards.js';

// Импорты функций
import { openModal, closeModal } from './components/modal.js';
import { createCard, handleDeleteCard, handleLikeCard } from './components/card.js';

// DOM узлы
const profileEditButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const editProfilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

const nameInput = editProfilePopup.querySelector('.popup__input_type_name');
const descriptionInput = editProfilePopup.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const newCardForm = newCardPopup.querySelector('.popup__form');
const editProfileForm = editProfilePopup.querySelector('.popup__form');
const placesList = document.querySelector('.places__list');

// Поля формы для добавления карточки
const placeNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const placeLinkInput = newCardForm.querySelector('.popup__input_type_url');

// Функция открытия попапа с картинкой
function handleImageClick(cardData) {
    imagePopupImage.src = cardData.link;
    imagePopupImage.alt = cardData.name;
    imagePopupCaption.textContent = cardData.name;

    openModal(imagePopup);
}

// Функция обработки редактирования профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;

    closeModal(editProfilePopup);
}

// Открытие попапа для редактирования профиля
function openProfileEditPopup() {
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
    openModal(editProfilePopup);
}

// Функция обработки добавления новой карточки
function handleNewCardSubmit(evt) {
    evt.preventDefault();

    const cardData = {
        name: placeNameInput.value,
        link: placeLinkInput.value,
    };

    const cardElement = createCard(cardData, handleDeleteCard, handleLikeCard, handleImageClick);

    placesList.prepend(cardElement);
    closeModal(newCardPopup);
    newCardForm.reset();
}

// Инициализация слушателей для всех попапов
function initPopups() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach((popup) => {
        const closeButton = popup.querySelector('.popup__close');

        if (closeButton) {
            closeButton.addEventListener('click', () => closeModal(popup));
        }

        popup.addEventListener('mousedown', (event) => {
            if (event.target === event.currentTarget) {
                closeModal(popup);
            }
        });

        popup.classList.add('popup_is-animated');
    });
}

// Инициализация попапов
initPopups();

// Обработка отправки формы редактирования профиля
editProfileForm.addEventListener('submit', handleProfileFormSubmit);

// Обработка добавления новой карточки
newCardForm.addEventListener('submit', handleNewCardSubmit);

// Открытие попапа для редактирования профиля
profileEditButton.addEventListener('click', openProfileEditPopup);

// Открытие попапа добавления карточки
addButton.addEventListener('click', () => {
    openModal(newCardPopup);
});

// Вывести базовый набор карточек на страницу
initialCards.forEach((cardData) => {
    const card = createCard(cardData, handleDeleteCard, handleLikeCard, handleImageClick);
    placesList.append(card);
});
