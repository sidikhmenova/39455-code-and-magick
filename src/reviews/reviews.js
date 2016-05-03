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

var Review = require('../reviews/review');

filterList.classList.add('invisible');

/**
 * @constant {number}
 */
var PAGE_SIZE = 3;

/**
 * @constant {number}
 */
var IMAGE_LOAD_TIMEOUT = 10000;

/**
 * @constant {string}
 */
var REVIEW_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

/**
 * @type {Array.<Object>}
 */
var filteredReviews = [];

/**
 * @type {Array.<Review>}
 */
var renderedReviews = [];

/**
 * @type {number}
 */
var pageNumber = 0;


/**
 * Функция получения списка отзывов
 * @param {Array.<Object>} callback
 */
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

/**
 * Функция анализа доступности след.страницы отзывов
 * @param {Array.<Object>} reviewItem
 * @param {number} pageNum
 * @param {number} pageSize
 * @returns {boolean}
 */
function isNextPageAvailable(reviewItem, pageNum, pageSize) {
  return pageNum < Math.ceil(reviewItem.length / pageSize);
}

/**
 * Функция загрузки след.страницы отзывов по клику на кнопку "Еще отзывы"
 */
function btnMoreActive() {
  buttonMore.addEventListener('click', function() {
    if (isNextPageAvailable(reviews, pageNumber, PAGE_SIZE)) {
      pageNumber++;
      renderReview(filteredReviews, pageNumber);
    }
  });
}

/**
 * Функция, возвращающая ошибку загрузки списка отзывов
 */
function reviewsFailure() {
  sectionReviews.classList.remove('reviews-list-loading');
  sectionReviews.classList.add('reviews-load-failure');
}

/**
 * Функция отрисовки списка отзывов
 * @param {Array.<Object>} data
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

/**
 * Обработчик события изменения текущего фильтра
 */
filterList.addEventListener('change', function() {
  setActiveFilter(filterItem.value);
});

/**
 * Функия установки текущего фильтра и вызова отрисовки отзывов для текущего фильтра
 * @param {number} id
 */
function setActiveFilter(id) {
  pageNumber = 0;
  filteredReviews = filter(id, reviews);
  renderReview(filteredReviews, pageNumber, true);
}

/**
 * Функия получения списка отзывов
 */
getReviewList(function(loadedReviews) {
  reviews = loadedReviews;
  setActiveFilter(defaultFilter);
  btnMoreActive();
});

filterList.classList.remove('invisible');
