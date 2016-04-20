/**
 * Created by Катэ on 20.04.2016.
 */
'use strict';

var reviewForm = document.querySelector('.review-form');
var reviewUser = reviewForm['review-name'];
var reviewText = reviewForm['review-text'];

var reviewSubmit = document.querySelector('.review-submit');
var reviewFields = document.querySelector('.review-fields');
var reviewFName = document.querySelector('.review-fields-name');
var reviewFText = document.querySelector('.review-fields-text');

function formValidation() {
  var StatusRName = reviewUser.value.length > 0;
  var StatusRText = !reviewText.required || reviewText.value.length > 0;
  var StateValidation = StatusRName && StatusRText;
  reviewSubmit.disabled = !StateValidation;
  reviewFields.classList.toggle('invisible', StateValidation);
  reviewFName.classList.toggle('invisible', StatusRName);
  reviewFText.classList.toggle('invisible', StatusRText);
}

module.exports = formValidation;
