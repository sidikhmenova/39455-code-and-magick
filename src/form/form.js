'use strict';

var formContainer = document.querySelector('.overlay-container');
var formOpenButton = document.querySelector('.reviews-controls-new');
var formCloseButton = document.querySelector('.review-form-close');

var reviewForm = document.querySelector('.review-form');
var reviewUser = reviewForm['review-name'];
var reviewText = reviewForm['review-text'];
var reviewMark = reviewForm['review-mark'];
var reviewGroupMark = document.querySelector('.review-form-group-mark');

var formValidation = require('../form/validation');
var setCookies = require('../form/cookies');

setCookies(reviewUser, reviewMark);

formOpenButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  formContainer.classList.remove('invisible');
  formValidation(reviewMark, reviewUser, reviewText);
});

formCloseButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  formContainer.classList.add('invisible');
});

// Обработчик клика на блок с оценками
reviewGroupMark.addEventListener('change', function() {
  formValidation(reviewMark, reviewUser, reviewText);
});

// Обработчик события нажатия клавиши
reviewForm.addEventListener('keyup', function() {
  formValidation(reviewMark, reviewUser, reviewText);
});

reviewForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  setCookies(reviewUser, reviewMark);
  this.submit();
});
