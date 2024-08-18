import { createCard, likeToggle } from "./components/card.js";
import {
  closeModal,
  openModal,
  closePopupByOverlay,
} from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  whoami,
  fetchCards,
  updateProfile,
  postCard,
  editAvatar,
  deleteCard,
} from "./components/api.js";
import "./styles/index.css";
export const cardTemplate = document.querySelector("#card-template").content;

const showImage = function (evt) {
  const popupImage = document.querySelector(".popup__image");
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  openModal(popupBigImage);
};
const cardsContainer = document.querySelector(".places__list");

const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const avatarButton = document.querySelector(".profile__image-edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupBigImage = document.querySelector(".popup_type_image");
const profileConfig = {
  titleClass: ".profile__title",
  descriptionClass: ".profile__description",
  avatarClass: ".profile__image",
};
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const profileTitle = document.querySelector(profileConfig.titleClass);
const profileDescription = document.querySelector(
  profileConfig.descriptionClass,
);

function renderProfile(profile, config) {
  const profileTitle = document.querySelector(config.titleClass);
  const profileDescription = document.querySelector(config.descriptionClass);
  const profileImage = document.querySelector(config.avatarClass);
  profileTitle.textContent = profile.name;
  profileDescription.textContent = profile.about;
  profileImage.style = `background-image: url(${profile.avatar});`;
}

function renderInitial(config) {
  Promise.all([whoami(), fetchCards()]).then((ress) => {
    const profile = ress[0];
    renderProfile(profile, config);
    const initialCards = ress[1];
    initialCards.forEach(function (card) {
      cardsContainer.append(
        createCard(card, formDelete, likeToggle, showImage, profile._id),
      );
    });
    document.querySelectorAll(".popup__button").forEach(resetButton);
  });
}

function resetButton(button) {
  button.textContent = button.getAttribute("default");
}

function renderLoading(evt, loading) {
  const button = evt.target.querySelector(".popup__button");
  if (loading) {
    button.textContent = "Сохранение...";
  } else {
    resetButton(button);
  }
}

renderInitial(profileConfig);

addButton.addEventListener("click", function () {
  openModal(popupAddCard);
});

editButton.addEventListener("click", function () {
  const inputTypeName = document.querySelector(".popup__input_type_name");
  const inputTypeDescription = document.querySelector(
    ".popup__input_type_description",
  );
  inputTypeName.value = profileTitle.textContent;
  inputTypeDescription.value = profileDescription.textContent;
  clearValidation(formEditElement, validationConfig);
  openModal(popupEdit);
});

avatarButton.addEventListener("click", function () {
  openModal(popupAvatar);
});

const closeButtons = document.querySelectorAll(".popup__close");
closeButtons.forEach(function (btn) {
  btn.addEventListener("click", function (evt) {
    closeModal(evt.target.closest(".popup"));
  });
});

const popups = document.querySelectorAll(".popup");
popups.forEach(function (popup) {
  popup.classList.add("popup_is-animated");
  popup.addEventListener("click", closePopupByOverlay());
});

const formAdd = document.querySelector(".popup_type_new-card .popup__form");
const formEditElement = document.querySelector(".popup_type_edit .popup__form"); // Воспользуйтесь методом querySelector()
const formAvatar = document.querySelector(".popup_type_avatar .popup__form");
const formDelete = document.querySelector(".popup_type_delete .popup__form");
const nameInput = document.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector()
const newCardTitle = document.querySelector(".popup__input_type_card-name");
const newCardLink = document.querySelector(".popup__input_type_url");
const avatarLink = document.querySelector(".popup__input_type_avatar_url");

function handleFormEditSubmit(evt) {
  evt.preventDefault();

  renderLoading(evt, true);
  updateProfile({
    name: nameInput.value,
    about: jobInput.value,
  }).then((profile) => {
    renderProfile(profile, profileConfig);
    nameInput.value = "";
    jobInput.value = "";
    closeModal(evt.target.closest(".popup"));
    renderLoading(evt, false);
  });
}

function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  const newCard = {
    name: newCardTitle.value,
    link: newCardLink.value,
  };
  renderLoading(evt, true);
  postCard(newCard).then((newCard) => {
    cardsContainer.prepend(
      createCard(newCard, formDelete, likeToggle, showImage, newCard.owner._id),
    );
    newCardTitle.value = "";
    newCardLink.value = "";
    closeModal(evt.target.closest(".popup"));
    renderLoading(evt, false);
  });
  clearValidation(formAdd, validationConfig);
}

function handleFormSubmitAvatar(evt) {
  evt.preventDefault();

  const avatarConfig = {
    avatar: avatarLink.value,
  };
  renderLoading(evt, true);
  editAvatar(avatarConfig).then((profile) => {
    renderProfile(profile, profileConfig);
    avatarLink.value = "";
    closeModal(evt.target.closest(".popup"));
    renderLoading(evt, false);
  });
}

function find_card(_id) {
  const cards = document.querySelectorAll(".card");
  return Array.from(cards).filter(
    (card) => card.getAttribute("_id") === _id,
  )[0];
}

function handleFormSubmitDelete(evt) {
  const card_id = evt.target.getAttribute("_id");
  const cardElement = find_card(card_id);
  evt.preventDefault();
  renderLoading(evt, true);
  deleteCard({
    _id: cardElement.getAttribute("_id"),
  }).then(() => {
    cardElement.remove();
    closeModal(evt.target.closest(".popup"));
    renderLoading(evt, false);
  });
}

formEditElement.addEventListener("submit", handleFormEditSubmit);
formAdd.addEventListener("submit", handleFormSubmitAdd);
formAvatar.addEventListener("submit", handleFormSubmitAvatar);
formDelete.addEventListener("submit", handleFormSubmitDelete);

enableValidation(validationConfig);
