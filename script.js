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
  } else if (formNameInput.value.length === 0) {
    formNameInput.classList.add('wrong-input');

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
