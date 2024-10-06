import { cardTemplate } from "..";
import { likeCard } from "./api";
import { openModal } from "./modal";

export function createCard(card, formDelete, likeAdd, showImage, profileId) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".card__title").textContent = card.name;
  const imageArea = cardElement.querySelector(".card__image");
  imageArea.src = card.link;
  imageArea.alt = card.name;
  cardElement.querySelector(".card__like-count").textContent =
    card.likes.length;
  cardElement.querySelector(".places__item").setAttribute("_id", `${card._id}`);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", (evt) => {
    formDelete.setAttribute("_id", card._id);
    openModal(formDelete.closest(".popup"));
  });
  if (profileId != card.owner._id) {
    deleteButton.classList.add("card__delete-button-hidden");
  }
  const likeButton = cardElement.querySelector(".card__like-button");
  if (card.likes.some((like) => like._id === profileId)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeButton.addEventListener("click", likeAdd);
  imageArea.addEventListener("click", showImage);

  return cardElement;
}

export function likeToggle(event) {
  const card = event.target.closest(".places__item");
  const config = {
    _id: card.getAttribute("_id"),
    add: !event.target.classList.contains("card__like-button_is-active"),
  };
  likeCard(config)
    .then((res) => {
      event.target.classList.toggle("card__like-button_is-active");
      card.querySelector(".card__like-count").textContent = res.likes.length;
    })
    .catch((err) => console.log(`Ошибка ${err}`));
}
