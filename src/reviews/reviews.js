/**
 * Created by Катэ on 05.04.2016.
 */

'use strict';

var filter = require('../reviews/filter');

var filterList = document.querySelector('.reviews-filter');
var filterItem = filterList['reviews'];
var reviewContainer = document.querySelector('.reviews-list');
var sectionReviews = document.querySelector('.reviews');
var buttonMore = document.querySelector('.reviews-controls-more');
var defaultFilter = 'reviews-all';
var reviews;
var localFilter = 'id';

var Review = require('../reviews/review');

filterList.classList.add('invisible');

/** @constant {number} */
var PAGE_SIZE = 3;

/** @constant {number} */
var IMAGE_LOAD_TIMEOUT = 10000;

/** @constant {string} */
var REVIEW_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

/** @type {Array.<Object>} */
var filteredReviews = [];

/** @type {Array.<Review>} */
var renderedReviews = [];

var pageNumber = 0;

function getReviewList(callback) {
  var xhr = new XMLHttpRequest();

  /** @param {ProgressEvent} */
  xhr.onload = function(evt) {
    sectionReviews.classList.add('reviews-list-loading');
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData);
    sectionReviews.classList.remove('reviews-list-loading');
  };

  xhr.onerror = function() {
    reviewsFailure();
  };

  xhr.timeout = IMAGE_LOAD_TIMEOUT;
  xhr.ontimeout = function() {
    reviewsFailure();
  };

  xhr.open('GET', REVIEW_LOAD_URL);
  xhr.send();
}

function isNextPageAvailable(reviewItem, pageNum, pageSize) {
  return pageNum < Math.ceil(reviewItem.length / pageSize);
}

function btnMoreActive() {
  buttonMore.addEventListener('click', function() {
    if (isNextPageAvailable(reviews, pageNumber, PAGE_SIZE)) {
      pageNumber++;
      renderReview(filteredReviews, pageNumber);
    }
  });
}

// Функция, возвращающая ошибку
function reviewsFailure() {
  sectionReviews.classList.remove('reviews-list-loading');
  sectionReviews.classList.add('reviews-load-failure');
}

/** @param {Array.<Object>} data
 * @param {number} page
 * @param {boolean=} replace
 * */
function renderReview(data, page, replace) {
  if (replace) {
    renderedReviews.forEach(function(reviewItem) {
      reviewItem.remove();
    });
    renderedReviews = [];
  }

  var from = page * PAGE_SIZE;
  var to = from + PAGE_SIZE;

  var pageReview = data.slice(from, to);

  pageReview.forEach(function(reviewItem) {
    renderedReviews.push(new Review(reviewItem, reviewContainer));
  });

  if (isNextPageAvailable(data, pageNumber + 1, PAGE_SIZE)) {
    buttonMore.classList.remove('invisible');
  } else {
    buttonMore.classList.add('invisible');
  }
}

filterList.addEventListener('change', function() {
  setActiveFilter(filterItem.value);
});

function setActiveFilter(id) {
  pageNumber = 0;
  filteredReviews = filter(id, reviews);
  localStorage.setItem(localFilter, id);
  renderReview(filteredReviews, pageNumber, true);
}

function fcallback(loadedReviews) {
  reviews = loadedReviews;
  defaultFilter = localStorage.getItem(localFilter);
  filterList.elements['reviews'].value = defaultFilter;
  setActiveFilter(defaultFilter);
  btnMoreActive();
}

getReviewList(fcallback);

filterList.classList.remove('invisible');
