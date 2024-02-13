import "./styles/index.css"; // добавьте импорт главного файла стилей
import { initialCards } from "./cards.js";
// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const cardsContainer = document.querySelector(".places__list");

// @todo: Функция создания карточки

function createCard(card, onDelete, onLike, onClick) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  deleteButton.addEventListener("click", onDelete);
  likeButton.addEventListener("click", onLike);
  cardImage.addEventListener("click", onClick);

  return cardElement;
}

// @todo: Функция удаления и лайка карточки

function deleteCard(event) {
  event.target.closest(".places__item").remove();
}

function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

function viewCard(evt) {
  popupCardImage.src = evt.target.src;
  popupCardImage.alt = evt.target.alt;
  showPopup(popupShowCard);
}

// @todo: Вывести карточки на страницу

initialCards.forEach((card) => {
  cardsContainer.append(createCard(card, deleteCard, likeCard, viewCard));
});

// @todo: Переменные

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const closeButtonElements = document.querySelectorAll(".popup__close");
const popupElements = document.querySelectorAll(".popup");

const formProfile = document.forms["edit-profile"];
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupProfileNameInput = formProfile.elements.name;
const popupProfileDescriptionInput = formProfile.elements.description;

const formCard = document.forms["new-place"];
const popupCardNameInput = formCard.elements["place-name"];
const popupCardLinkInput = formCard.elements["link"];

const popupEdit = document.querySelector(".popup_type_edit");
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const popupShowCard = document.querySelector(".popup_type_image");
const popupCardImage = document.querySelector(".popup__image");

// @todo: Коллбеки

function showPopup(popupWindow) {
  popupWindow.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeWindow);
}

function showEditProfilePopup() {
  popupProfileNameInput.placeholder = profileName.textContent;
  popupProfileDescriptionInput.placeholder = profileDescription.textContent;
  showPopup(popupEdit);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileNameInput.value;
  profileDescription.textContent = popupProfileDescriptionInput.value;
  closeWindow(evt);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: popupCardNameInput.value,
    link: popupCardLinkInput.value,
  };
  cardsContainer.prepend(createCard(newCard, deleteCard, likeCard, viewCard));
  closeWindow(evt);
}

function showAddNewCardPopup() {
  showPopup(popupAddNewCard);
}

function closeWindow(evt) {
  if ((evt.key || "Escape") === "Escape") {
    popupElements.forEach((popup) => {
      popup.classList.remove("popup_is-opened");
    });
    document.removeEventListener("keydown", closeWindow);
  }
}

function test(evt) {
  console.log(evt);
}

function processPopup(popup) {
  popup.classList.add("popup_is-animated");

  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup")) closeWindow(evt);
  });
}

// @todo: Слушатели событий

profileEditButton.addEventListener("click", showEditProfilePopup);
profileAddButton.addEventListener("click", showAddNewCardPopup);
closeButtonElements.forEach((button) =>
  button.addEventListener("click", closeWindow),
);
popupElements.forEach(processPopup);
formProfile.addEventListener("submit", handleProfileFormSubmit);
formCard.addEventListener("submit", handleCardFormSubmit);

/* @todo: Закрытие попапа:
 * крестик
 * клик по оверлею
 * нажатие esc
 */

// @todo: Лайк карточки и удаление с помощью приколов делегирования
