/**
 * Created by Катэ on 20.04.2016.
 */

'use strict';

var template = document.querySelector('#review-template');
var quizAnswer = 'review-quiz-answer';
var quizAnswerActive = 'review-quiz-answer-active';
var cloneElement;

var inherit = require('../utils');
var BaseComponent = require('../base-component');

/** @constant {number} */
var IMAGE_LOAD_TIMEOUT = 10000;

// 1 Находим нужный элемент в разметке. Для поддержки старыми браузерами (усли браузер не поддерживает тег template) добавляем else
if ('content' in template) {
  cloneElement = template.content.querySelector('.review');
} else {
  cloneElement = template.querySelector('.review');
}

/** @constructor */
function Review(data, container) {
  BaseComponent.call(this, this.element, this.container);

  /**
   * @type {string}
   */
  this.element = null;
  /**
   * @type {string}
   */
  this.container = container;
  /**
   * @type {Object}
   * @private
   */
  this._data = data;

  this._initialization();
}

inherit(Review, BaseComponent);

/**
 * Функция, инициализирующая работу с отзывами
 * @private
 */
Review.prototype._initialization = function() {
  this.element = this._getReview();
  this.element.addEventListener('click', this._onClickRQuizAnswer);

  BaseComponent.prototype.create.call(this);
};

/**
 * Функция работы с полученным отзывом по шаблону.
 * @returns {Node}
 * @private
 */
Review.prototype._getReview = function() {
  // Клонируем шаблонный элемент и заполняем элементы отеля данными из объекта data
  var element = cloneElement.cloneNode(true);

  var backgroundImage = new Image();
  var backgroundLoadTimeout;

  var reviewRatingBlock = element.querySelector('.review-rating');
  var rating = this._data.rating;
  var transRating = ['one', 'two', 'three', 'four', 'five'];
  var that = this;

  element.querySelector('.review-text').textContent = this._data.description;

  backgroundImage.addEventListener('load', function() {
    clearTimeout(backgroundLoadTimeout);
    element.replaceChild(backgroundImage, element.children[0]);
    backgroundImage.classList.add('review-author');
    backgroundImage.alt = 'Отзыв пользователя ' + that._data.author.name + ' об игре Code & Magick';
    backgroundImage.title = that._data.author.name;
    backgroundImage.width = 124;
    backgroundImage.height = 124;
  });

  backgroundImage.addEventListener('error', function() {
    element.classList.add('review-load-failure');
  });

  backgroundImage.src = this._data.author.picture;

  backgroundLoadTimeout = setTimeout(function() {
    backgroundImage.src = '';
    element.classList.add('review-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  reviewRatingBlock.classList.add('review-rating-' + transRating[rating - 1]);

  return element;
};

/**
 * Функция обработчика события клика на блок "Полезный отзыв"
 * @param {MouseEvent} evt
 * @private
 */
Review.prototype._onClickRQuizAnswer = function(evt) {
  if (evt.target.classList.contains(quizAnswer)) {
    evt.preventDefault();
    evt.target.classList.add(quizAnswerActive);
  }
};

/**
 * Функция очистки блока с отзывами
 */
Review.prototype.remove = function() {
  this.element.removeEventListener('click', this._onClickRQuizAnswer);
  BaseComponent.prototype.remove.call(this);
};

module.exports = Review;
