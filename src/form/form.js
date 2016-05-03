'use strict';

var formContainer = document.querySelector('.overlay-container');
var formOpenButton = document.querySelector('.reviews-controls-new');
var formCloseButton = document.querySelector('.review-form-close');

var reviewForm = document.querySelector('.review-form');
var reviewUser = reviewForm['review-name'];
var reviewText = reviewForm['review-text'];
var reviewMark = reviewForm['review-mark'];
var reviewNameError = document.querySelector('.review-name-error');
var reviewTextError = document.querySelector('.review-text-error');
var reviewGroupMark = document.querySelector('.review-form-group-mark');

var reviewSubmit = document.querySelector('.review-submit');
var reviewFields = document.querySelector('.review-fields');
var reviewFName = document.querySelector('.review-fields-name');
var reviewFText = document.querySelector('.review-fields-text');


var getDateExpire = require('../form/dateToExpire');

var cookies = require('browser-cookies');
reviewUser.value = cookies.get('reviewUser');
reviewMark.value = cookies.get('reviewMark') || 3;

/**
 * Функция валидации формы отзыва
 */
function formValidation() {
  var StatusRName = reviewUser.validity.valid;
  var StatusRText = reviewText.validity.valid;
  var StateValidation = StatusRName && StatusRText;

  reviewSubmit.disabled = !StateValidation;
  reviewNameError.classList.toggle('invisible', StatusRName);
  reviewTextError.classList.toggle('invisible', StatusRText);
  reviewFields.classList.toggle('invisible', StateValidation);
  reviewFName.classList.toggle('invisible', StatusRName);
  reviewFText.classList.toggle('invisible', StatusRText);

  if (reviewText.validity.valid === false) {
    console.log('ne validno');
  }
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
