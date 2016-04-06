/**
 * Created by Катэ on 05.04.2016.
 */

'use strict';

(function() {
  var filter = document.querySelector('.reviews-filter');
  var reviewContainer = document.querySelector('.reviews-list');
  var template = document.querySelector('#review-template');
  var cloneElement;

  filter.classList.add('invisible');

// 1 Находим нужный элемент в разметке. Для поддержки старыми браузерами (усли браузер не поддерживает тег template) добавляем else
  if ('content' in template) {
    cloneElement = template.content.querySelector('.review');
  } else {
    cloneElement = template.querySelector('.review');
  }

  /** @constant {number} */
  var IMAGE_LOAD_TIMEOUT = 10000;

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

    var reviewAutor = element.querySelector('.review-author');
    reviewAutor.alt = 'Отзыв пользоватедя' + data.name + 'об игре Code & Magick';
    reviewAutor.title = data.name;

    var backgroundImage = new Image();
    var backgroundLoadTimeout;

    backgroundImage.addEventListener('load', function(evt) {
      clearTimeout(backgroundLoadTimeout);
      reviewAutor.src = evt.target.src;
      reviewAutor.width = 124;
      reviewAutor.height = 124;
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

    var transRating = {
      1: 'one',
      2: 'two',
      3: 'tree',
      4: 'four',
      5: 'five'
    };

    reviewRatingBlock.classList.add('review-rating-' + transRating[rating]);

    return element;
  };

  window.reviews.forEach(function(reviews) {
    getReviewElement(reviews, reviewContainer);
  });

  filter.classList.remove('invisible');
})();


