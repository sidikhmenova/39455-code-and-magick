'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');

  var reviewForm = document.querySelector('.review-form');
  var reviewUser = reviewForm['review-name'];
  var reviewText = reviewForm['review-text'];
  var reviewMark = reviewForm['review-mark'];
  var reviewGroupMark = document.querySelector('.review-form-group-mark');
  var reviewSubmit = document.querySelector('.review-submit');
  var reviewFields = document.querySelector('.review-fields');
  var reviewFName = document.querySelector('.review-fields-name');
  var reviewFText = document.querySelector('.review-fields-text');

  var cookies = require('browser-cookies');
  reviewUser.value = cookies.get('reviewUser');
  reviewText.value = cookies.get('reviewText');

  formOpenButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
    formValidation();
  });

  // Обработчик клика на блок с оценками
  reviewGroupMark.addEventListener('change', function() {
    reviewText.required = reviewMark.value < 3;
    formValidation();
  });

  function formValidation() {
    var StatusRName = reviewUser.value.length > 0;
    var StatusRText = !reviewText.required || reviewText.value.length > 0;
    var StateValidation = StatusRName && StatusRText;
    reviewSubmit.disabled = !StateValidation;
    reviewFields.classList.toggle('invisible', StateValidation);
    reviewFName.classList.toggle('invisible', StatusRName);
    reviewFText.classList.toggle('invisible', StatusRText);

  }

  // Обработчик события нажатия клавиши
  reviewForm.addEventListener('keyup', function() {
    formValidation();
  });

  reviewForm.addEventListener('submit', function(evt) {
    evt.preventDefault();

    var dateToExpire = getDateExpire();

    cookies.set('reviewUser', reviewUser.value, dateToExpire);
    cookies.set('reviewText', reviewText.value, dateToExpire);
    this.submit();
  });

   //Вычисояем кол-во дней для хранения Куки
   //Вычесляется как:
   //1) Определяем кол-во дней, прошедших с последнего дня рождения
   //2) Прибавляем к текущей дате
  function getDateExpire() {
    var today = new Date();
    var dateBD = new Date(2015, 3, 8);
    var dateExp = +today - +dateBD;
    var dateToExpire = +Date.now() + +dateExp;

    return new Date(dateToExpire).toUTCString();
  }


})();
