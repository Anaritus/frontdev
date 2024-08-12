function escapeFromPopup(event) {
  if (event.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", escapeFromPopup);
}
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escapeFromPopup);
}
export function closePopupByOverlay() {
  return function (event) {
    if (event.target.classList.contains("popup")) {
      closeModal(event.target);
    }
  };
}
