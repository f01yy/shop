'use strict';

const phoneNumberRegExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

const productOptions = Array.from(
  document.querySelectorAll('.cards__info h3')
).map((option) => option.innerHTML);

console.log(productOptions);

const popup = document.querySelector('.popup');
const popupContent = document.querySelector('.popup__content');
const popupBtn = document.querySelector('.popup-btn');

const form = document.querySelector('.form');
const formBtn = document.querySelector('.form__button');
const formSelect = document.querySelector('.form__select');
const formNameInput = document.querySelector('.form__name');
const formPhoneInput = document.querySelector('.form__phone');
const formEmail = document.querySelector('.form__email');

popupBtn.addEventListener('click', () => {
  popup.style.display = '';
});

popup.addEventListener('click', () => {
  popup.style.display = 'none';
});

popupContent.addEventListener('click', (event) => event.stopPropagation());

form.addEventListener('submit', (event) => event.preventDefault());

formBtn.addEventListener('click', () => {
  if (
    phoneNumberRegExp.test(formPhoneInput.value) &&
    formNameInput.value.length > 0
  ) {
    popup.style.display = 'none';
    formNameInput.value = '';
    formPhoneInput.value = '';
    formSelect.value = '';
    formEmail.value = '';
  } else if (formNameInput.value.length === 0) {
    formNameInput.classList.add('wrong-input');

    if (formNameInput.nextElementSibling.className === 'warning') {
      formNameInput.nextElementSibling.remove();
    }

    const nameWarning = document.createElement('div');
    nameWarning.className = 'warning';
    nameWarning.innerHTML = 'Неверный формат имени';
    formNameInput.after(nameWarning);

    formNameInput.addEventListener(
      'input',
      () => {
        formNameInput.classList.remove('wrong-input');
        nameWarning.remove();
      },
      { once: true }
    );
  } else if (!phoneNumberRegExp.test(formPhoneInput.value)) {
    formPhoneInput.classList.add('wrong-input');

    if (formPhoneInput.nextElementSibling.className === 'warning') {
      formPhoneInput.nextElementSibling.remove();
    }
    const phoneWarning = document.createElement('div');
    phoneWarning.className = 'warning';
    phoneWarning.innerHTML = 'Неверный формат номера телефона';
    formPhoneInput.after(phoneWarning);

    formPhoneInput.addEventListener(
      'input',
      () => {
        formPhoneInput.classList.remove('wrong-input');
        phoneWarning.remove();
      },
      { once: true }
    );
  }
});

productOptions.forEach((productOption) => {
  const option = document.createElement('option');
  option.innerHTML = productOption;
  option.value = productOption;

  formSelect.append(option);
});
