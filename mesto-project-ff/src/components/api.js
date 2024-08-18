const api_config = {
  baseUrl: "https://nomoreparties.co/v1/cohort-magistr-2",
  headers: {
    authorization: "8883cffe-7e09-492f-8029-89217bdff786",
    "Content-Type": "application/json",
  },
};

export function whoami() {
  return fetch(`${api_config.baseUrl}/users/me`, api_config)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .catch((err) => console.log(`Ошибка ${err.status}`));
}

export function fetchCards() {
  return fetch(`${api_config.baseUrl}/cards`, api_config)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .catch((err) => console.log(`Ошибка ${err}`));
}

export function updateProfile(config) {
  return fetch(`${api_config.baseUrl}/users/me`, {
    method: "PATCH",
    body: JSON.stringify({
      name: config.name,
      about: config.about,
    }),
    ...api_config,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .catch((err) => console.log(`Ошибка ${err}`));
}

export function postCard(config) {
  return fetch(`${api_config.baseUrl}/cards`, {
    method: "POST",
    body: JSON.stringify({
      name: config.name,
      link: config.link,
    }),
    ...api_config,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .catch((err) => console.log(`Ошибка ${err}`));
}

export function deleteCard(config) {
  return fetch(`${api_config.baseUrl}/cards/${config._id}`, {
    method: "DELETE",
    ...api_config,
  }).catch((err) => console.log(`Ошибка ${err}`));
}

export function likeCard(config) {
  return fetch(`${api_config.baseUrl}/cards/likes/${config._id}`, {
    method: config.add ? "PUT" : "DELETE",
    ...api_config,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .catch((err) => console.log(`Ошибка ${err}`));
}

export function editAvatar(config) {
  return fetch(`${api_config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    body: JSON.stringify({
      avatar: config.avatar,
    }),
    ...api_config,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .catch((err) => console.log(`Ошибка ${err}`));
}
