'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  var userName = document.querySelector('#review-name');
  var reviewText = document.querySelector('#review-text');

  var reviewSubmit = document.querySelector('.review-submit');
  var reviewForm = document.querySelector('.review-form');

  /**
   * Проверяет, валидны ли данные, в форме отзыва.
   * @return {boolean}
   */
  function resizeFormValid() {
    return (userName > 0);
  }

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  reviewForm.addEventListener('change', function() {
    if (resizeFormValid()) {
      reviewSubmit.removeAttribute('disabled');
    } else {
      reviewSubmit.setAttribute('disabled', 'true');
    }
  });
})();
