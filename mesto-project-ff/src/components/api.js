import { checkResponse, request } from "../utils/api";

const api_config = {
  headers: {
    authorization: "8883cffe-7e09-492f-8029-89217bdff786",
    "Content-Type": "application/json",
  },
};

export function whoami() {
  return request("/users/me", api_config);
}

export function fetchCards() {
  return request(`/cards`, api_config).catch((err) =>
    console.log(`Ошибка ${err}`),
  );
}

export function updateProfile(config) {
  return request(`/users/me`, {
    method: "PATCH",
    body: JSON.stringify({
      name: config.name,
      about: config.about,
    }),
    ...api_config,
  });
}

export function postCard(config) {
  return request(`/cards`, {
    method: "POST",
    body: JSON.stringify({
      name: config.name,
      link: config.link,
    }),
    ...api_config,
  });
}

export function deleteCard(config) {
  return request(`/cards/${config._id}`, {
    method: "DELETE",
    ...api_config,
  });
}

export function likeCard(config) {
  return request(`/cards/likes/${config._id}`, {
    method: config.add ? "PUT" : "DELETE",
    ...api_config,
  }).catch((err) => console.log(`Ошибка ${err}`));
}

export function editAvatar(config) {
  return request(`/users/me/avatar`, {
    method: "PATCH",
    body: JSON.stringify({
      avatar: config.avatar,
    }),
    ...api_config,
  });
}
