const initialCards = [
    {
        name: "Val Thorens",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"
    },
    {
        name: "Restaurant terrace",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"
    },
    {
        name: "An outdoor cafe",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"
    },
    {
        name: "A very long bridge, over the forest and through the trees",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"
    },
    {
        name: "Tunnel with morning light",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"
    },
    {
        name: "Mountain house",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"
    }
];

const profileEditButton = document.querySelector(".profile__edit-btn");
const profileInputEditText = document.querySelector(".profile__name");
const profileDecscriptionEditText = document.querySelector(".profile__description");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".posts__grid");

const editModal = document.querySelector("#edit-modal");
const editFormElements = document.querySelector(".modal__form");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const editInputEditText = editModal.querySelector("#name");
const editDecriptionEditText = editModal.querySelector("#description");

function getCardElement(data){
    const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
    
    const cardNameEl = cardElement.querySelector(".card__title");
    const cardImageEl = cardElement.querySelector(".card__image");

    cardNameEl.textContent = data.name;
    cardImageEl.src = data.link;
    cardImageEl.alt = data.name;

    return cardElement;
}


function openModal() {
  editModal.classList.add("modal_opened");
  editInputEditText.value = profileInputEditText.textContent;
  editDecriptionEditText.value = profileDecscriptionEditText.textContent;
}
/*
ditModalButton.addEventListener("click", () => {
    // Use an arrow function and call the openModal method inside it. 
    // Pass it the appropriate modal as an argument.
    openModal(editModal);
  })
*/
function closeModal() {
  editModal.classList.remove("modal_opened");
}

function handleEditFormEventSubmit(evt) {
    evt.preventDefault();
    profileInputEditText.textContent = editInputEditText.value;
    profileDecscriptionEditText.textContent = editDecriptionEditText.value;
    closeModal();
}

profileEditButton.addEventListener("click", openModal);
editModalCloseBtn.addEventListener("click", closeModal);
editFormElements.addEventListener("submit",handleEditFormEventSubmit);

initialCards.forEach((item) => {    
    const cardElement = getCardElement(item);
    cardsList.prepend(cardElement);
});

















