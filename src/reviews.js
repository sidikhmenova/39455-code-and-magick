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
  var cloneElement;
  var reviews;
  var activeFilter = 'reviews-all';

  filterList.classList.add('invisible');

// 1 Находим нужный элемент в разметке. Для поддержки старыми браузерами (усли браузер не поддерживает тег template) добавляем else
  if ('content' in template) {
    cloneElement = template.content.querySelector('.review');
  } else {
    cloneElement = template.querySelector('.review');
  }

  /** @constant {number} */
  var IMAGE_LOAD_TIMEOUT = 10000;

  var REVIEW_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

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
    backgroundImage.alt = 'Отзыв пользоватедя ' + data.author.name + ' об игре Code & Magick';
    backgroundImage.title = data.author.name;
    var backgroundLoadTimeout;

    backgroundImage.addEventListener('load', function() {
      backgroundImage.src = data.author.picture;
      clearTimeout(backgroundLoadTimeout);
      element.replaceChild(backgroundImage, element.children[0]);
      backgroundImage.classList.add('review-author');
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

  /** @param {function(Array.<Object>)} callback */
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

  // Функция, возвращающая ошибку
  function reviewsFailure() {
    sectionReviews.classList.remove('reviews-list-loading');
    sectionReviews.classList.add('reviews-load-failure');
  }

  /** @param {Array.<Object>} reviews */
  var renderReview = function(reviews) {
    reviewContainer.innerHTML = '';

    reviews.forEach(function(reviewItem) {
      getReviewElement(reviewItem, reviewContainer);
    });
  };

  // Обработчик клика на блок с оценками
  filterList.addEventListener('change', function() {
    console.log(filterItem.value);
    setActiveFilter(filterItem.value);
  });

  function setActiveFilter(id) {
    if (activeFilter === id) {
      return;
    }

    var filteredReviews = reviews.slice(0);
    console.log(reviews);
    switch (id) {
      case 'reviews-recent':
        // показывает список отзывов, оставленных за две недели, отсортированных по убыванию даты
        filteredReviews = filteredReviews.sort(function(a, b) {
          return b.date - a.date;
        });
        //// фильтруем массив с датами и отбираем изображения за 2 недели
        //filteredReviews = filteredReviews.filter(selectedDay);
        break;
      case 'reviews-good':
        //  с рейтингом не ниже 3, отсортированные по убыванию рейтинга
        filteredReviews = filteredReviews.sort(function(a, b) {
          return b.rating - a.rating;
        });
        break;
      case 'reviews-bad':
        //  с рейтингом не выше 2, отсортированные по возрастанию рейтинга
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

    renderReview(filteredReviews);
  }

  //var lastDate = new Date();
  //var lastMonth = lastDate.getMonth();
  //lastMonth = lastMonth - 3;
  //lastDate.setMonth(lastMonth);
  //
  //// Функция анализа даты публикации
  //function selectedDay(date) {
  //  // делаем выборку за последние 3 месяца
  //  var pictureDate = new Date(date.date);
  //  return pictureDate > lastDate;
  //}

  getReviewList(function(loadedReviews) {
    reviews = loadedReviews;
    console.log(reviews);
    renderReview(reviews);
  });

  filterList.classList.remove('invisible');
})();


