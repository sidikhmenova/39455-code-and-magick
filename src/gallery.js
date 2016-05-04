/**
 * Created by Катэ on 23.04.2016.
 */

'use strict';
var galleryContainer = document.querySelector('.overlay-gallery');
var preview = galleryContainer.querySelector('.overlay-gallery-preview');

var photoGalleryContainer = document.querySelector('.photogallery');
var photos = photoGalleryContainer.querySelectorAll('img');

var btnNext = galleryContainer.querySelector('.overlay-gallery-control-right');
var btnBefore = galleryContainer.querySelector('.overlay-gallery-control-left');
var btnClose = galleryContainer.querySelector('.overlay-gallery-close');

var spanCurrent = galleryContainer.querySelector('.preview-number-current');
var spanTotal = galleryContainer.querySelector('.preview-number-total');

var inherit = require('./utils');
var BaseComponent = require('./base-component');

/**
 * @constructor
 */
function Gallery() {
  BaseComponent.call(this, this.element, preview);

  /**
   * @type {string}
   * @private
   */
  this._clickedElement = null;
  /**
   * @type {Object}
   */
  this.element = null;
  /**
   * @type {boolean}
   * @private
   */
  this._isShowGallery = null;
  /**
   * @type {number}
   * @private
   */
  this._currentNum = 1;
  /**
   * @type {Array}
   * @private
   */
  this._galleryPicture = [];
  /**
   * @type {RegExp}
   * @private
   */
  this._REG_STRING = /#photo\/(\S+)/;

  this._getPhotoGallery = this._getPhotoGallery.bind(this);
  this._initialClick = this._initialClick.bind(this);
  this._getActivePhoto = this._getActivePhoto.bind(this);
  this._hashChange = this._hashChange.bind(this);
  this._showGallery = this._showGallery.bind(this);
  this._showActivePhoto = this._showActivePhoto.bind(this);
  this._visibleButton = this._visibleButton.bind(this);
  this._closeGallery = this._closeGallery.bind(this);
  this._visibleButton = this._visibleButton.bind(this);
  this._showNextPage = this._showNextPage.bind(this);
  this._showBeforePage = this._showBeforePage.bind(this);
  this._clearHash = this._clearHash.bind(this);
  this._editLocationHash = this._editLocationHash.bind(this);
  this._onCloseKeydownGallery = this._onCloseKeydownGallery.bind(this);

  this.element = this._getPhotoGallery();
  this._hashChange();

  photoGalleryContainer.addEventListener('click', this._initialClick);
  window.addEventListener('hashchange', this._hashChange.bind(this));
}

inherit(Gallery, BaseComponent);

/**
 * Функция получения массива фотографий, на основе фотографий, расположенных на главной странице
 * @private
 */
Gallery.prototype._getPhotoGallery = function() {
  for (var i = 0; i < photos.length; i++) {
    this._galleryPicture[i] = photos[i].getAttribute('src');
  }
};

/**
 * Функция первоначального клика на фотографии с главной страницы
 * @param {MouseEvent} evt
 * @private
 */
Gallery.prototype._initialClick = function(evt) {
  evt.preventDefault();
  if (evt.target.tagName === 'IMG') {
    this._clickedElement = evt.target.getAttribute('src');
    this._currentNum = this._getActivePhoto(this._clickedElement);
    this._editLocationHash(this._currentNum);
  }
};

/**
 * Функция определения индекса в массиве по переданному элементу. Используется во всех случаях изменения фото.
 * @param {string} clkElement
 * @returns {number}
 * @private
 */
Gallery.prototype._getActivePhoto = function(clkElement) {
  for (var i = 0; i < this._galleryPicture.length; i++) {
    if (this._galleryPicture[i] === clkElement) {
      return i;
    }
  }
  return null;
};

/**
 * Функция анализа изменения значений в адресной строке
 * @private
 */
Gallery.prototype._hashChange = function() {
  var galleryHash = window.location.href.match(this._REG_STRING);

  if (galleryHash && this._isShowGallery) {
    this._showActivePhoto();
  } else if(galleryHash && !this._isShowGallery) {
    this._showGallery();
  } else if(!galleryHash && this._isShowGallery) {
    this._closeGallery();
  }
};

/**
 * Функция отрисовки галереи
 * @private
 */
Gallery.prototype._showGallery = function() {
  this._isShowGallery = true;

  galleryContainer.classList.remove('invisible');
  spanTotal.textContent = this._galleryPicture.length;

  this.element = new Image();
  BaseComponent.prototype.create.call(this);

  btnNext.addEventListener('click', this._showNextPage);
  btnBefore.addEventListener('click', this._showBeforePage);
  btnClose.addEventListener('click', this._clearHash);
  window.addEventListener('keydown', this._onCloseKeydownGallery);

  this._showActivePhoto();
};

/**
 * Функция отрисовки активной фото
 * @private
 */
Gallery.prototype._showActivePhoto = function() {
  this._currentNum = this._getActivePhoto(window.location.href.match(this._REG_STRING)[1]);

  if (this._currentNum >= 0) {
    this.element.src = this._galleryPicture[this._currentNum];
    spanCurrent.textContent = this._currentNum + 1;
    this._visibleButton();
  } else {
    this._editLocationHash();
  }
};

/**
 * Функция
 * @param {number} num
 * @private
 */
Gallery.prototype._editLocationHash = function(num) {
  if (!num) {
    location.hash = '';
  } else {
    location.hash = '#photo/' + this._galleryPicture[num];
  }
};

/**
 * Функция, отвечающая за отображение кнопок "вперед", "назад". Анализирует значение текущей фотографии по отношению к макс, мин индексу массива
 * @private
 */
Gallery.prototype._visibleButton = function() {
  btnBefore.classList.toggle('invisible', this._currentNum === 0);
  btnNext.classList.toggle('invisible', (this._currentNum + 1) === this._galleryPicture.length);
};

/**
 * Функция, меняющая адрес в hash для отображения след.картинки
 * @private
 */
Gallery.prototype._showNextPage = function() {
  this._editLocationHash(this._currentNum + 1);
};

/**
 * Функция, меняющая адрес в hash для отображения пред.картинки
 * @private
 */
Gallery.prototype._showBeforePage = function() {
  this._editLocationHash(this._currentNum - 1);
};

/**
 * Функция закрытия блока галлереи
 * @private
 */
Gallery.prototype._closeGallery = function() {
  this._isShowGallery = false;
  BaseComponent.prototype.remove.call(this);

  btnNext.removeEventListener('click', this._showNextPage);
  btnBefore.removeEventListener('click', this._showBeforePage);
  btnClose.removeEventListener('click', this._clearHash);
  window.removeEventListener('keydown', this._onCloseKeydownGallery);

  galleryContainer.classList.add('invisible');
};

/**
 * Функция, отвечающая за редактирования hash строки на основе переданных данных. Вызывается при листании "вперед", "назад"
 * @private
 */
Gallery.prototype._clearHash = function() {
  this._editLocationHash();
};

/**
 * Функция, выполняющая анализ нажатой клавиши
 * @param {KeyboardEvent} evt
 * @private
 */
Gallery.prototype._onCloseKeydownGallery = function(evt) {
  if (evt.keyCode === 27) {
    this._clearHash();
  }
};

module.exports = new Gallery();
