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
const previewModalImage = previewModal.querySelector(".card__image");
const previewModalCaption = previewModal.querySelector(".card__title-preview");
const cardImageClosebtn = previewModal.querySelector(".modal__close-btn");

function handleLikeClickEventSubmit(evt) {
  evt.preventDefault();
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikEl = cardElement.querySelector(".card__like-button");
  const cardDelete = cardElement.querySelector(".card__delete-image");

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalCaption.textContent = data.name;
    previewModalImage.src = data.link;
  });

  cardImageClosebtn.addEventListener("click", () => {
    closeModal(previewModal);
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
}

profileEditButton.addEventListener("click", () => {
  editInputEditText.value = profileInputEditText.textContent;
  editDecriptionEditText.value = profileDecscriptionEditText.textContent;
  openModal(editModal);
});

function closeModal(modal) {
  modal.classList.remove("modal_opened");
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

editModalCloseBtn.addEventListener("click", (evt) => {
  closeModal(editModal);
});

editFormElement.addEventListener("submit", handleEditFormEventSubmit);
cardForm.addEventListener("submit", handleCardFormEventSubmit);

cardModalBtn.addEventListener("click", () => {
  openModal(cardModal);
});

cardModalCloseBtn.addEventListener("click", () => {
  closeModal(cardModal);
});

initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.prepend(cardElement);
});
