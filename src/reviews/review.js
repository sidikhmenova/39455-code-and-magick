/**
 * Created by Катэ on 20.04.2016.
 */

'use strict';

var template = document.querySelector('#review-template');
var quizAnswer = 'review-quiz-answer';
var quizAnswerActive = 'review-quiz-answer-active';
var cloneElement;

/** @constant {number} */
var IMAGE_LOAD_TIMEOUT = 10000;

// 1 Находим нужный элемент в разметке. Для поддержки старыми браузерами (усли браузер не поддерживает тег template) добавляем else
if ('content' in template) {
  cloneElement = template.content.querySelector('.review');
} else {
  cloneElement = template.querySelector('.review');
}

function Review(data, container) {
  this.data = data;

  this.getReview = function() {
    // Клонируем шаблонный элемент и заполняем элементы отеля данными из объекта data
    var element = cloneElement.cloneNode(true);

    var backgroundImage = new Image();
    var backgroundLoadTimeout;

    var reviewRatingBlock = element.querySelector('.review-rating');
    var rating = data.rating;
    var transRating = ['one', 'two', 'three', 'four', 'five'];

    element.querySelector('.review-text').textContent = data.description;

    // вставлеяем элемент в DOM
    container.appendChild(element);

    backgroundImage.addEventListener('load', function() {
      clearTimeout(backgroundLoadTimeout);
      element.replaceChild(backgroundImage, element.children[0]);
      backgroundImage.classList.add('review-author');
      backgroundImage.alt = 'Отзыв пользователя ' + data.author.name + ' об игре Code & Magick';
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

    reviewRatingBlock.classList.add('review-rating-' + transRating[rating - 1]);

    return element;
  };

  this.element = this.getReview();
  this.element.addEventListener('click', this.onClickRQuizAnswer);

  this.onClickRQuizAnswer = function(evt) {
    if (evt.target.classList.contains(quizAnswer)) {
      evt.preventDefault();
      evt.target.classList.add(quizAnswerActive);
    }
  };

  this.remove = function() {
    this.element.removeEventListener('click', this.onClickRQuizAnswer);
    this.element.parentNode.removeChild(this.element);
  };
}

module.exports = Review;
