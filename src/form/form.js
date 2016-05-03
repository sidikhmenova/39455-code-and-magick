'use strict';

var formContainer = document.querySelector('.overlay-container');
var formOpenButton = document.querySelector('.reviews-controls-new');
var formCloseButton = formContainer.querySelector('.review-form-close');

var reviewForm = document.querySelector('.review-form');
var reviewUser = reviewForm['review-name'];
var reviewText = reviewForm['review-text'];
var reviewMark = reviewForm['review-mark'];
var reviewNameError = reviewForm.querySelector('.review-name-error');
var reviewTextError = reviewForm.querySelector('.review-text-error');
var reviewGroupMark = reviewForm.querySelector('.review-form-group-mark');

var reviewSubmit = reviewForm.querySelector('.review-submit');
var reviewFields = reviewForm.querySelector('.review-fields');
var reviewFName = reviewForm.querySelector('.review-fields-name');
var reviewFText = reviewForm.querySelector('.review-fields-text');


var getDateExpire = require('../form/dateToExpire');

var cookies = require('browser-cookies');
reviewUser.value = cookies.get('reviewUser');
reviewMark.value = cookies.get('reviewMark') || 3;

/**
 * Функция валидации формы отзыва
 */
function formValidation() {
  var isNameRequired = reviewUser.validity.valid;
  var isTextRequired = reviewText.validity.valid;
  var stateValidation = isNameRequired && isTextRequired;

  reviewSubmit.disabled = !stateValidation;
  reviewNameError.classList.toggle('invisible', isNameRequired);
  reviewTextError.classList.toggle('invisible', isTextRequired);
  reviewFields.classList.toggle('invisible', stateValidation);
  reviewFName.classList.toggle('invisible', isNameRequired);
  reviewFText.classList.toggle('invisible', isTextRequired);
}

/**
 * Обработчик события нажатия кнопки "добавить свой"
 */
formOpenButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  formContainer.classList.remove('invisible');
  formValidation();
});

/**
 * Обработчик события нажатия на "закрыть"
 */
formCloseButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  formContainer.classList.add('invisible');
});

/**
 * Обработчик клика на блок с оценками
 */
reviewGroupMark.addEventListener('change', function() {
  reviewText.required = reviewMark.value < 3;
  formValidation();
});

/**
 * Обработчик события нажатия клавиши
 */
reviewForm.addEventListener('keyup', function() {
  formValidation();
});

/**
 * Обработчик события нажатия кнопки "Отправить отзыв"
 */
reviewForm.addEventListener('submit', function(evt) {
  evt.preventDefault();

  var dateToExpire = getDateExpire();

  cookies.set('reviewUser', reviewUser.value, dateToExpire);
  cookies.set('reviewMark', reviewMark.value, dateToExpire);

  this.submit();
});
