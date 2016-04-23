/**
 * Created by Катэ on 20.04.2016.
 */
'use strict';

var reviewContainer = document.querySelector('.reviews-list');
var buttonMore = document.querySelector('.reviews-controls-more');

/** @constant {number} */
var PAGE_SIZE = 3;

/** @param {Array.<Object>} data
 * @param {number} page
 * @param {boolean=} replace
 * @return {Array.<Object>}
 * */
function renderReview(data, page, replace) {
  if (replace) {
    reviewContainer.innerHTML = '';
  }

  var from = page * PAGE_SIZE;
  var to = from + PAGE_SIZE;
  var pageReview = data.slice(from, to);

  if (page + 1 < Math.floor(data.length / PAGE_SIZE)) {
    buttonMore.classList.remove('invisible');
  } else {
    buttonMore.classList.add('invisible');
  }

  return pageReview;
}

module.exports = renderReview;