/**
 * Created by Катэ on 20.04.2016.
 */

'use strict';

var template = document.querySelector('#review-template');
var cloneElement;

/** @constant {number} */
var IMAGE_LOAD_TIMEOUT = 10000;

// 1 Находим нужный элемент в разметке. Для поддержки старыми браузерами (усли браузер не поддерживает тег template) добавляем else
if ('content' in template) {
  cloneElement = template.content.querySelector('.review');
} else {
  cloneElement = template.querySelector('.review');
}

// 2
/**
 * @param {Object} data
 * @param {HTMLElement} container
 * @return {HTMLElement}
 */
function getReviewElement(data, container) {
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
}

module.exports = getReviewElement;
