/**
 * Created by Катэ on 20.04.2016.
 */
'use strict';

var reviewSubmit = document.querySelector('.review-submit');
var reviewFields = document.querySelector('.review-fields');
var reviewFName = document.querySelector('.review-fields-name');
var reviewFText = document.querySelector('.review-fields-text');

function formValidation(markVl, userVl, textVl) {
  textVl.required = markVl.value < 3;

  var StatusRName = userVl.value.length > 0;
  var StatusRText = !textVl.required || textVl.value.length > 0;
  var StateValidation = StatusRName && StatusRText;
  reviewSubmit.disabled = !StateValidation;
  reviewFields.classList.toggle('invisible', StateValidation);
  reviewFName.classList.toggle('invisible', StatusRName);
  reviewFText.classList.toggle('invisible', StatusRText);
}

module.exports = formValidation;
