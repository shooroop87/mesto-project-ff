import { deleteCard, addLike, removeLike } from './api.js';

// Функция создания карточки
export function createCard(cardData, onImageClick, userId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  
  // Создаю контейнер для кнопки лайка и счетчика
  const likeContainer = cardElement.querySelector('.card__like-container') || 
                        document.createElement('div');
  
  if (!cardElement.querySelector('.card__like-container')) {
    likeContainer.classList.add('card__like-container');
    likeButton.parentNode.appendChild(likeContainer);
    likeContainer.appendChild(likeButton);
  }
  
  // Добавляю счетчик лайков
  let likeCounter = cardElement.querySelector('.card__like-counter');
  if (!likeCounter) {
    likeCounter = document.createElement('span');
    likeCounter.classList.add('card__like-counter');
    likeContainer.appendChild(likeCounter);
  }
  
  // Инциализирую данные карточки
  cardElement.dataset.cardId = cardData._id;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  
  // Отображаю кол-во лайков
  likeCounter.textContent = cardData.likes ? cardData.likes.length : 0;
  
  // Проверяю поставил ли пользователь лайк этой карточке
  if (cardData.likes && cardData.likes.some(like => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }
  
  // Проверяб является ли пользователь владельцем карточки
  const isOwner = cardData.owner && cardData.owner._id === userId;
  
  // Показываю кнопку удаления только для карточек пользователя
  if (!isOwner) {
    deleteButton.style.display = 'none';
  }
  
  // Обработчик клика по кнопке удаления
  deleteButton.addEventListener('click', () => {
    deleteCard(cardData._id)
      .then(() => {
        cardElement.remove();
      })
      .catch((err) => {
        console.error(`Ошибка при удалении карточки: ${err}`);
      });
  });
  
  // Обработчик клика по кнопке лайка
  likeButton.addEventListener('click', () => {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    
    if (isLiked) {
      removeLike(cardData._id)
        .then((updatedCard) => {
          likeButton.classList.remove('card__like-button_is-active');
          likeCounter.textContent = updatedCard.likes.length;
        })
        .catch((err) => {
          console.error(`Ошибка при снятии лайка: ${err}`);
        });
    } else {
      addLike(cardData._id)
        .then((updatedCard) => {
          likeButton.classList.add('card__like-button_is-active');
          likeCounter.textContent = updatedCard.likes.length;
        })
        .catch((err) => {
          console.error(`Ошибка при постановке лайка: ${err}`);
        });
    }
  });
  
  // Обработчик клика по картинке
  cardImage.addEventListener('click', () => {
    onImageClick({ name: cardData.name, link: cardData.link });
  });
  
  return cardElement;
}