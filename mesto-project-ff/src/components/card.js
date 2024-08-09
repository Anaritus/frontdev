import { cardTemplate } from "..";

export function createCard(card, onDelete, likeAdd, showImage) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", onDelete);
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeAdd);
  const imageArea = cardElement.querySelector(".card__image");
  imageArea.addEventListener("click", showImage);
  return cardElement;
}

export function likeAdd(event) {
  event.target.classList.toggle("card__like-button_is-active");
}
// @todo: Функция удаления карточки
export function deleteCard(event) {
  event.target.closest(".places__item").remove();
}
