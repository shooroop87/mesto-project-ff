// Импорты стилей
import './pages/index.css';

// Импорты данных
import { initialCards } from './components/cards.js';

// Импорты функций
import { openModal, closeModal } from './components/modal.js';
import { createCard } from './components/card.js';

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

// Функция для удаления карточки
function handleDeleteCard(cardElement) {
    cardElement.remove();
}

// Функция для обработки лайка карточки
function handleLikeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}

// Функция открытия попапа с картинкой
function handleImageClick(cardData) {
    imagePopupImage.src = cardData.link;
    imagePopupImage.alt = cardData.name;
    imagePopupCaption.textContent = cardData.name;

    openModal(imagePopup);
    addEscListener();
}

// Закрытие попапов по нажатию Esc
function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        if (popup) {
            closeModal(popup);
            removeEscListener();
        }
    }
}

function addEscListener() {
    document.addEventListener('keydown', handleEscClose);
}

function removeEscListener() {
    document.removeEventListener('keydown', handleEscClose);
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
                removeEscListener();
            }
        });

        popup.classList.add('popup_is-animated');
    });
}

// Редактирование профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;

    closeModal(editProfilePopup);
    removeEscListener();
}

// Открытие попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
    openModal(editProfilePopup);
    addEscListener();
});

// Создание карточки
function handleNewCardSubmit(evt) {
    evt.preventDefault();

    const placeName = newCardForm.querySelector('.popup__input_type_card-name').value;
    const placeLink = newCardForm.querySelector('.popup__input_type_url').value;
    const cardData = { name: placeName, link: placeLink };

    const cardElement = createCard(cardData, handleDeleteCard, handleLikeCard, handleImageClick);

    placesList.prepend(cardElement);
    closeModal(newCardPopup);
    removeEscListener();
    newCardForm.reset();
}

// Инициализация попапов
initPopups();

// Обработка отправки формы редактирования профиля
editProfileForm.addEventListener('submit', handleProfileFormSubmit);

// Обработка добавления новой карточки
newCardForm.addEventListener('submit', handleNewCardSubmit);

// Открытие попапа добавления карточки
addButton.addEventListener('click', () => {
    openModal(newCardPopup);
    addEscListener();
});

// Вывести базовый набор карточек на страницу
initialCards.forEach((cardData) => {
    const card = createCard(cardData, handleDeleteCard, handleLikeCard, handleImageClick);
    placesList.append(card);
});
