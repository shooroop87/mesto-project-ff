// Импорты стилей
import './pages/index.css';

// Импорт модального окна и карточки
import { openModal, closeModal } from './components/modal.js';
import { createCard } from './components/card.js';

// Импорт валидации
import { enableValidation, clearValidation, validationConfig } from './components/validation.js';

// Импорты API
import { 
  getUserInfo, 
  getInitialCards, 
  updateUserInfo, 
  addCard, 
  updateUserAvatar,
  getAppInfo 
} from './components/api.js';

// DOM узлы
const profileEditButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileAvatarContainer = document.querySelector('.profile__image');

const editProfilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const avatarPopup = document.querySelector('.popup_type_avatar');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

const nameInput = editProfilePopup.querySelector('.popup__input_type_name');
const descriptionInput = editProfilePopup.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const newCardForm = newCardPopup.querySelector('.popup__form');
const editProfileForm = editProfilePopup.querySelector('.popup__form');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarInput = avatarPopup.querySelector('#avatar-input');
const placesList = document.querySelector('.places__list');

// Поля формы для добавления карточки
const placeNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const placeLinkInput = newCardForm.querySelector('.popup__input_type_url');

// Сохраняем ID юзера
let userId;

// Функция управления состоянием загрузки
function renderLoading(isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохранение...') {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}

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
  
  const submitButton = editProfileForm.querySelector('.popup__button');
  
  // Показываю индикатор загрузки
  renderLoading(true, submitButton);

  // Отправляю данные на сервер
  updateUserInfo({
    name: nameInput.value,
    about: descriptionInput.value,
  })
  .then((userData) => {
    // Обновляю инфу на странице
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    closeModal(editProfilePopup);
  })
  .catch((err) => {
    console.error(`Ошибка при обновлении профиля: ${err}`);
  })
  .finally(() => {
    // Возвращаем исходный текст кнопке
    renderLoading(false, submitButton);
  });
}

// Открытие попапа для редактирования профиля
function openProfileEditPopup() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfig);
  openModal(editProfilePopup);
}

// Функция обработки изменения аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  
  const submitButton = avatarForm.querySelector('.popup__button');
  
  // Показываю индикатор загрузки
  renderLoading(true, submitButton);
  
  updateUserAvatar(avatarInput.value)
    .then((userData) => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(avatarPopup);
      avatarForm.reset();
    })
    .catch((err) => {
      console.error(`Ошибка при обновлении аватара: ${err}`);
    })
    .finally(() => {
      // Возвращаю исходный текст кнопке
      renderLoading(false, submitButton);
    });
}

// Функция обработки добавления новой карточки
function handleNewCardSubmit(evt) {
  evt.preventDefault();

  // Получаю кнопку отправки формы
  const submitButton = newCardForm.querySelector('.popup__button');
  
  // Показываю индикатор загрузки
  renderLoading(true, submitButton);
  
  const cardData = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  };

  // Отправляю данные на сервер
  addCard(cardData)
    .then((newCardData) => {
      const cardElement = createCard(
        newCardData, 
        handleImageClick,
        userId
      );
      placesList.prepend(cardElement);
      closeModal(newCardPopup);
      newCardForm.reset();
    })
    .catch((err) => {
      console.error(`Ошибка при добавлении карточки: ${err}`);
    })
    .finally(() => {
      // Возвращаю исходный текст кнопке
      renderLoading(false, submitButton);
      clearValidation(newCardForm, validationConfig);
    });
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

// Установка слушателей событий для форм и кнопок
function setEventListeners() {
  // Обработка отправки формы редактирования профиля
  editProfileForm.addEventListener('submit', handleProfileFormSubmit);

  // Обработка добавления новой карточки
  newCardForm.addEventListener('submit', handleNewCardSubmit);
  
  // Обработка обновления аватара
  avatarForm.addEventListener('submit', handleAvatarFormSubmit);

  // Открытие попапа для редактирования профиля
  profileEditButton.addEventListener('click', openProfileEditPopup);

  // Открытие попапа добавления карточки
  addButton.addEventListener('click', () => {
    newCardForm.reset();
    clearValidation(newCardForm, validationConfig);
    openModal(newCardPopup);
  });
  
  // Открытие попапа обновления аватара
  profileAvatarContainer.addEventListener('click', () => {
    avatarForm.reset();
    clearValidation(avatarForm, validationConfig);
    openModal(avatarPopup);
  });
}

// Инициализация попапов
initPopups();

// Установка слушателей событий
setEventListeners();

// Включение валидации для всех форм
enableValidation(validationConfig);

// Загрузка начальных данных
getAppInfo()
  .then(([userData, initialCards]) => {
    // Сохраняю ID юзера
    userId = userData._id;
    
    // Инициализирую данные юзера
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    if (userData.avatar) {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
    }
    
    // Отображаю карточки
    initialCards.forEach((cardData) => {
      const card = createCard(
        cardData, 
        handleImageClick,
        userId
      );
      placesList.append(card);
    });
  })
  .catch((err) => {
    console.error(`Ошибка при загрузке данных: ${err}`);
  });