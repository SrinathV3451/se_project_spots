const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button__inactive",
  errorClass: "modal__error_visible",
  buttonInactive: "modal__button_inactive",
};

const showInputError = (formElement, inputElement, errorMsg, config) => {
  const errorMsgID = inputElement.id + "-error";
  const errorMsgEl = formElement.querySelector("#" + errorMsgID);
  errorMsgEl.textContent = errorMsg;
};

const hideInputError = (formElement, inputElement) => {
  const errorMsgID = inputElement.id + "-error";
  const inputError = "modal__input_type_error";
  const errorMsgEl = formElement.querySelector("#" + errorMsgID);
  errorMsgEl.textContent = "";
  inputElement.classList.remove(inputError);
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, config);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.buttonInactive);
  }
};

const disableButton = (buttonEl, config) => {
  buttonEl.disabled = true;
  buttonEl.classList.add(config.buttonInactive);
};

const resetValidation = (formElement, inputList) => {
  inputList.forEach((input) => {
    input.value = "";
    hideInputError(formElement, input);
  });
};

const setEventListners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListners(formEl, config);
  });
};

enableValidation(settings);
