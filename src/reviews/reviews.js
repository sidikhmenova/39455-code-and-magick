/**
 * Created by Катэ on 05.04.2016.
 */

'use strict';

var getReviewElement = require('../reviews/templates');
var filter = require('../reviews/filter');
var getPageReview = require('../reviews/paigination');

var filterList = document.querySelector('.reviews-filter');
var filterItem = filterList['reviews'];
var reviewContainer = document.querySelector('.reviews-list');
var sectionReviews = document.querySelector('.reviews');
var buttonMore = document.querySelector('.reviews-controls-more');
var defaultFilter = 'reviews-all';
var reviews;

filterList.classList.add('invisible');

/** @constant {number} */
var IMAGE_LOAD_TIMEOUT = 10000;

/** @constant {string} */
var REVIEW_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

/** @type {Array.<Object>} */
var filteredReviews = [];

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

function btnMoreActive() {
  buttonMore.addEventListener('click', function() {
    pageNumber++;
    renderReview(filteredReviews, pageNumber);
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
    reviewContainer.innerHTML = '';
  }

  var pageReview = getPageReview(data, page, buttonMore);

  pageReview.forEach(function(reviewItem) {
    getReviewElement(reviewItem, reviewContainer);
  });
}

filterList.addEventListener('change', function() {
  setActiveFilter(filterItem.value);
});

function setActiveFilter(id) {
  pageNumber = 0;
  filteredReviews = filter(id, reviews);

  renderReview(filteredReviews, pageNumber, true);
}

getReviewList(function(loadedReviews) {
  reviews = loadedReviews;
  setActiveFilter(defaultFilter);
  btnMoreActive();
});

filterList.classList.remove('invisible');
