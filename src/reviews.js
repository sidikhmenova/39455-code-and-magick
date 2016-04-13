/**
 * Created by Катэ on 05.04.2016.
 */

'use strict';

(function() {
  var filterList = document.querySelector('.reviews-filter');
  var filterItem = filterList['reviews'];
  var reviewContainer = document.querySelector('.reviews-list');
  var template = document.querySelector('#review-template');
  var sectionReviews = document.querySelector('.reviews');
  var buttonMore = document.querySelector('.reviews-controls-more');
  var defaultFilter = 'reviews-all';
  var cloneElement;
  var reviews;

  filterList.classList.add('invisible');

// 1 Находим нужный элемент в разметке. Для поддержки старыми браузерами (усли браузер не поддерживает тег template) добавляем else
  if ('content' in template) {
    cloneElement = template.content.querySelector('.review');
  } else {
    cloneElement = template.querySelector('.review');
  }

  /** @constant {number} */
  var IMAGE_LOAD_TIMEOUT = 10000;

  /** @constant {string} */
  var REVIEW_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

  /** @type {Array.<Object>} */
  var filteredReviews = [];

  /** @constant {number} */
  var PAGE_SIZE = 3;

  /** @constant {number} */
  var pageNumber = 0;

// 2
  /**
   * @param {Object} data
   * @param {HTMLElement} container
   * @return {HTMLElement}
   */
  var getReviewElement = function(data, container) {
    // Клонируем шаблонный элемент и заполняем элементы отеля данными из объекта data
    var element = cloneElement.cloneNode(true);
    element.querySelector('.review-text').textContent = data.description;

    // вставлеяем элемент в DOM
    container.appendChild(element);

    var backgroundImage = new Image();
    var backgroundLoadTimeout;

    backgroundImage.addEventListener('load', function() {
      clearTimeout(backgroundLoadTimeout);
      element.replaceChild(backgroundImage, element.children[0]);
      backgroundImage.classList.add('review-author');
      backgroundImage.alt = 'Отзыв пользоватедя ' + data.author.name + ' об игре Code & Magick';
      backgroundImage.title = data.author.name;
      backgroundImage.width = 124;
      backgroundImage.height = 124;
    });

    backgroundImage.addEventListener('error', function() {
      element.classList.add('review-load-failure');
    });

    backgroundImage.src = data.author.picture;

    backgroundLoadTimeout = setTimeout(function() {
      backgroundImage.src = '';
      element.classList.add('review-load-failure');
    }, IMAGE_LOAD_TIMEOUT);


    var reviewRatingBlock = element.querySelector('.review-rating');
    var rating = data.rating;

    var transRating = ['one', 'two', 'three', 'four', 'five'];

    reviewRatingBlock.classList.add('review-rating-' + transRating[rating - 1]);

    return element;
  };

  var getReviewList = function(callback) {
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
  };

  var isBottomNear = function() {
    var footerCoordinates = document.querySelector('footer');
    var footerPosition = footerCoordinates.getBoundingClientRect();
    return footerPosition.top - window.innerHeight <= 0;
  };

  var isNextPageAvailable = function(reviewItem, pageNum, pageSize) {
    return pageNum < Math.floor(reviewItem.length / pageSize);
  };

  var btnMoreActive = function() {
    buttonMore.addEventListener('click', function() {
      if (isBottomNear() && isNextPageAvailable(reviews, pageNumber, PAGE_SIZE)) {
        pageNumber++;
        renderReview(filteredReviews, pageNumber);
      }
    });
  };

  // Функция, возвращающая ошибку
  function reviewsFailure() {
    sectionReviews.classList.remove('reviews-list-loading');
    sectionReviews.classList.add('reviews-load-failure');
  }

  /** @param {Array.<Object>} data
   * @param {number} page
   * @param {boolean=} replace
   * */
  var renderReview = function(data, page, replace) {
    if (replace) {
      reviewContainer.innerHTML = '';
    }

    var from = page * PAGE_SIZE;
    var to = from + PAGE_SIZE;

    var pageReview = data.slice(from, to);

    pageReview.forEach(function(reviewItem) {
      getReviewElement(reviewItem, reviewContainer);
    });

    if ( to < data.length) {
      buttonMore.classList.remove('invisible');
    } else {
      buttonMore.classList.add('invisible');
    }
  };

  filterList.addEventListener('change', function() {
    setActiveFilter(filterItem.value);
  });

  function setActiveFilter(id) {
    pageNumber = 0;
    filteredReviews = reviews.slice(0);
    switch (id) {
      case 'reviews-all':
        break;
      // показывает список отзывов, оставленных за две недели, отсортированных по убыванию даты
      case 'reviews-recent':
        filteredReviews = filteredReviews.sort(function(a, b) {
          return b.date - a.date;
        });
        filteredReviews = filteredReviews.filter(function(a) {
          var lastDate = new Date();
          lastDate.setDate(lastDate.getDate() - 14);
          return a.date > lastDate;
        });
        break;
      //  с рейтингом не ниже 3, отсортированные по убыванию рейтинга
      case 'reviews-good':
        filteredReviews = filteredReviews.filter(function(a) {
          return a.rating > 2;
        });
        filteredReviews = filteredReviews.sort(function(a, b) {
          return b.rating - a.rating;
        });
        break;
      //  с рейтингом не выше 2, отсортированные по возрастанию рейтинга
      case 'reviews-bad':
        filteredReviews = filteredReviews.filter(function(a) {
          return a.rating < 3;
        });
        filteredReviews = filteredReviews.sort(function(a, b) {
          return a.rating - b.rating;
        });
        break;
      case 'reviews-popular':
        //  отсортированные по убыванию оценки отзыва
        filteredReviews = filteredReviews.sort(function(a, b) {
          return b.review_usefulness - a.review_usefulness;
        });
        break;
    }

    renderReview(filteredReviews, pageNumber, true);
  }

  getReviewList(function(loadedReviews) {
    reviews = loadedReviews;
    setActiveFilter(defaultFilter);
    btnMoreActive();
  });

  filterList.classList.remove('invisible');
})();


