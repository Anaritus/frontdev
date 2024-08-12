import { createCard, deleteCard, likeAdd } from "./components/card.js";
import { initialCards } from "./components/cards.js";
import {
  closeModal,
  openModal,
  closePopupByOverlay,
} from "./components/modal.js";
import "./styles/index.css";
import {
  enableValidation,
  refreshValidationState,
} from "./components/validation.js";
export const cardTemplate = document.querySelector("#card-template").content;

const showImage = function (evt) {
  const popupImage = document.querySelector(".popup__image");
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  openModal(popupBigImage);
};
const cardsContainer = document.querySelector(".places__list");
initialCards.forEach(function (card) {
  cardsContainer.append(createCard(card, deleteCard, likeAdd, showImage));
});

export const editButton = document.querySelector(".profile__edit-button");
export const popupEdit = document.querySelector(".popup_type_edit");
const addButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupBigImage = document.querySelector(".popup_type_image");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description",
);
const newCardTitle = document.querySelector(".popup__input_type_card-name");
const newCardLink = document.querySelector(".popup__input_type_url");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

addButton.addEventListener("click", function (event) {
  openModal(popupAddCard);
});

editButton.addEventListener("click", function (event) {
  const inputTypeName = document.querySelector(".popup__input_type_name");
  const inputTypeDescription = document.querySelector(
    ".popup__input_type_description",
  );
  inputTypeName.value = profileTitle.textContent;
  inputTypeDescription.value = profileDescription.textContent;
  refreshValidationState(formEditElement, validationConfig);
  openModal(popupEdit);
});

const closeButtons = document.querySelectorAll(".popup__close");
closeButtons.forEach(function (btn) {
  btn.addEventListener("click", function (evt) {
    closeModal(evt.target.closest(".popup"));
  });
});

const Popups = document.querySelectorAll(".popup");
Popups.forEach(function (popup) {
  popup.classList.add("popup_is-animated");
  popup.addEventListener("click", closePopupByOverlay());
});

// Находим форму в DOM
const formEditElement = document.querySelector(".popup_type_edit .popup__form"); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = document.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  closeModal(evt.target.closest(".popup"));

  profileTitle.textContent = nameInput.value; // Вставьте новые значения с помощью textContent
  profileDescription.textContent = jobInput.value; // Вставьте новые значения с помощью textContent
  nameInput.value = "";
  jobInput.value = "";
}

function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  closeModal(evt.target.closest(".popup"));
  const Newcard = {
    name: newCardTitle.value,
    link: newCardLink.value,
  };
  cardsContainer.prepend(createCard(Newcard, deleteCard, likeAdd, showImage));
  newCardTitle.value = "";
  newCardLink.value = "";
  refreshValidationState(formAdd, validationConfig);
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
const formAdd = document.querySelector(".popup_type_new-card .popup__form");
formEditElement.addEventListener("submit", handleFormEditSubmit);
formAdd.addEventListener("submit", handleFormSubmitAdd);

enableValidation(validationConfig);
