// @todo: Темплейт карточки

const template = document.querySelector("#card-template").content;

// @todo: DOM узлы

const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки

function createCard(cardContent, deleteFunction) {
  const newCard = template.cloneNode(true);

  newCard.querySelector(".card__image").src = cardContent.link;
  newCard.querySelector(".card__description .card__title").textContent =
    cardContent.name;

  newCard
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteFunction);

  return newCard;
}

// @todo: Функция удаления карточки

function deleteCard(event) {
  const listItem = event.target.closest(".places__item");
  listItem.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach((card) => {
  placesList.append(createCard(card, deleteCard));
});
