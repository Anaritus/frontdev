export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export function request(endpoint, options) {
  const baseUrl = "https://nomoreparties.co/v1/cohort-magistr-2";
  return fetch(`${baseUrl}${endpoint}`, options).then(checkResponse);
}
