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
  var reviewMarkValue;

  formOpenButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
    setActiveMark();
  });

  // Обработчик клика на блок с оценками
  reviewGroupMark.addEventListener('change', function() {
    setActiveMark();
  });

  function setActiveMark() {
    for (var i = 0; i < reviewMark.length; i++) {
      if (reviewMark[i].checked) {
        reviewMarkValue = reviewMark[i].value;
        reviewText.required = reviewMarkValue < 3;
        break;
      }
    }
    formValidation();
  }

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

  formCloseButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  });

})();
