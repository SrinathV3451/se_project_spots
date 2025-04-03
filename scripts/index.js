const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const profileEditButton = document.querySelector(".profile__edit-btn");
const cardModalBtn = document.querySelector(".profile__new-post");
const profileInputEditText = document.querySelector(".profile__name");
const profileDecscriptionEditText = document.querySelector(
  ".profile__description"
);

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".posts__grid");

const editModal = document.querySelector("#edit-modal");
const editFormElement = document.querySelector(".modal__form");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");

const editInputEditText = editModal.querySelector("#name");
const editDecriptionEditText = editModal.querySelector("#description");

const cardModal = document.querySelector("#add-card-edit-modal");
const cardModalCloseBtn = cardModal.querySelector(".modal__close-btn");

const cardForm = document.querySelector("#add-card-edit-modal");
const formModalCloseBtn = cardForm.querySelector(".modal__close-btn");
const cardFormUrl = cardForm.querySelector("#add-card-link-name");
const cardFormCaption = cardForm.querySelector("#add-card-name-description");
const previewModal = document.querySelector("#preview-modal");
const cardSubmitBtn = cardModal.querySelector(".modal__submit-btn");
const editSubmitBtn = editModal.querySelector(".modal__submit-btn");

const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");
const cardImageClosebtn = previewModal.querySelector(".modal__close-btn");

// listeing on a modal if where  you click is not a modal then close

function handleLikeClickEventSubmit(evt) {
  evt.preventDefault();
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".modal__image");
  const cardLikEl = cardElement.querySelector(".card__like-button");
  const cardDelete = cardElement.querySelector(".card__delete-image");

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalCaption.textContent = data.name;
    previewModalImage.src = data.link;
    previewModalImage.alt = data.name;
  });

  cardLikEl.addEventListener("click", () => {
    cardLikEl.classList.toggle("card__like-button-liked");
  });

  cardDelete.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  // if (modal != editModal) {
  cardSubmitBtn.classList.add(settings.buttonInactive);
  // }
  document.addEventListener("keyup", handleEscapKeyPressed);
  document.addEventListener("mouseup", handleMouseClick);
}

profileEditButton.addEventListener("click", () => {
  editInputEditText.value = profileInputEditText.textContent;
  editDecriptionEditText.value = profileDecscriptionEditText.textContent;
  resetValidation(
    editFormElement,
    [editInputEditText, editDecriptionEditText],
    settings
  );
  openModal(editModal);
});

function handleEscapKeyPressed(evt) {
  if (evt.key == "Escape") {
    if (evt.key == "Escape") {
      const openedModal = document.querySelector(".modal_opened");
      closeModal(openedModal);
      disableButton(cardSubmitBtn);
    }
  }
}

function handleMouseClick(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    closeModal(evt.target);
    disableButton(cardSubmitBtn);
  }
}

function closeModal(modal) {
  document.removeEventListener("keyup", handleEscapKeyPressed);
  document.removeEventListener("mouseup", handleMouseClick);
  modal.classList.remove("modal_opened");
  disableButton(cardSubmitBtn);
}

function handleEditFormEventSubmit(evt) {
  evt.preventDefault();
  profileInputEditText.textContent = editInputEditText.value;
  profileDecscriptionEditText.textContent = editDecriptionEditText.value;
  closeModal(editModal);
}

function handleCardFormEventSubmit(evt) {
  evt.preventDefault();
  const newCard = { name: cardFormCaption.value, link: cardFormUrl.value };
  const cardElement = getCardElement(newCard);
  cardsList.prepend(cardElement);
  closeModal(cardForm);
  evt.target.reset();
}

cardImageClosebtn.addEventListener("click", () => {
  closeModal(previewModal);
});

editModalCloseBtn.addEventListener("click", (evt) => {
  closeModal(editModal);
});

editFormElement.addEventListener("submit", handleEditFormEventSubmit);
cardForm.addEventListener("submit", handleCardFormEventSubmit);

cardModalBtn.addEventListener("click", () => {
  cardFormUrl.value = "";
  cardFormCaption.value = "";
  resetValidation(cardForm, [cardFormUrl, cardFormCaption]);
  openModal(cardModal);
});

cardModalCloseBtn.addEventListener("click", () => {
  closeModal(cardModal);
});

initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.prepend(cardElement);
});
