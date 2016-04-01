'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  var reviewForm = document.querySelector('.review-form');
  var reviewUser = reviewForm['review-name'];
  var reviewText = reviewForm['review-text'];
  var reviewMark = reviewForm['review-mark'];
  var reviewGroupMark = document.querySelector('.review-form-group-mark');
  var reviewSubmit = document.querySelector('.review-submit');
  var reviewFields = document.querySelector('.review-fields');
  var reviewFName = document.querySelector('.review-fields-name');
  var reviewFText = document.querySelector('.review-fields-text');


  var clickedElement;


  /**
   * Проверяет, валидны ли данные, в форме отзыва.
   * @return {boolean}
   */


  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
    getActiveMark();
  };

  // Функция получения текущей оценки
  function getActiveMark() {
    for (var i = 0; i < reviewMark.length; i++) {
      if (reviewMark[i].checked) {
        console.log('дф');
      }
    }
  }

  // Обработчик клика на блок с оценками
  reviewGroupMark.addEventListener('click', function(evt) {
    clickedElement = evt.target;
    formValidation();
  });

  // Валидация формы
  function formValidation() {
    if (clickedElement.value < 3 && reviewText.value.length && reviewUser.value.length) {
      console.log('валидна');
      reviewSubmit.disabled = false;
      reviewFields.style.display = 'none';
    } else if (clickedElement.value >= 3 && reviewUser.value.length) {
      console.log('валидна');
      reviewSubmit.disabled = false;
      reviewFields.style.display = 'none';
    } else if (clickedElement.value >= 3 && !reviewUser.value.length ) {
      console.log('не валидна');
      reviewFields.style.display = 'inline-block';
      reviewFName.style.display = 'inline-block';
      reviewFText.style.display = 'none';
    } else if (clickedElement.value < 3 && !reviewUser.value.length && reviewText.value.length) {
      console.log('не валидна');
      reviewFields.style.display = 'inline-block';
      reviewFName.style.display = 'inline-block';
      reviewFText.style.display = 'none';
    } else if (clickedElement.value < 3 && reviewUser.value.length && !reviewText.value.length) {
      console.log('не валидна');
      reviewFields.style.display = 'inline-block';
      reviewFName.style.display = 'none';
      reviewFText.style.display = 'inline-block';
    } else {
      console.log('не валидна');
      reviewSubmit.disabled = true;
      reviewFields.style.display = 'inline-block';
      reviewFName.style.display = 'inline-block';
      reviewFText.style.display = 'inline-block';

    }
  }

  // Обработчик события нажатия клавиши
  reviewForm.addEventListener('keyup', function() {
    console.log(reviewMark);
    formValidation();
  });

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

})();
