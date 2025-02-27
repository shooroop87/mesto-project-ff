// Найстройка API
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-32', // Мой идентификатор группы
    headers: {
      authorization: '722f9317-1629-4396-87db-5b13933a4340', // Мой токен
      'Content-Type': 'application/json'
    }
  };
  
  // Функция проверки ответа сервера
  function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // Если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  
  // Получаю инфо о юзере
  export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'GET',
      headers: config.headers
    })
      .then(checkResponse);
  };
  
  // Получаю списка карточек
  export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(checkResponse);
  };
  
  // Обновляю инфо о юзере
  export const updateUserInfo = (data) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(checkResponse);
  };
  
  // Обновляю аватар
  export const updateUserAvatar = (avatarUrl) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatarUrl
      })
    })
      .then(checkResponse);
  };
  
  // Добавляю новую карточку
  export const addCard = (data) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(checkResponse);
  };
  
  // Удаляю карточку
  export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
      .then(checkResponse);
  };
  
  // Добавляю лайк
  export const addLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers
    })
      .then(checkResponse);
  };
  
  // Удаляю лайк с карточки
  export const removeLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
      .then(checkResponse);
  };
  
  // Загружаю начальные данных
  export const getAppInfo = () => {
    return Promise.all([getUserInfo(), getInitialCards()]);
  };