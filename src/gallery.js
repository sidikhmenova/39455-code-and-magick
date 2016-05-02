/**
 * Created by Катэ on 23.04.2016.
 */

'use strict';
var galleryContainer = document.querySelector('.overlay-gallery');
var preview = document.querySelector('.overlay-gallery-preview');

var photoGalleryContainer = document.querySelector('.photogallery');
var photos = document.querySelectorAll('.photogallery img');

var btnNext = document.querySelector('.overlay-gallery-control-right');
var btnBefore = document.querySelector('.overlay-gallery-control-left');
var btnClose = document.querySelector('.overlay-gallery-close');

var spanCurrent = document.querySelector('.preview-number-current');
var spanTotal = document.querySelector('.preview-number-total');

var utility = require('./utils');
var BaseComponent = require('./base-component');

/** @constructor */
function Gallery() {
  this.clickedElement = null;
  this.mainPhoto = null;
  this.element = null;
  this.isShowGallery = null;
  this.currentNum = 1;
  this.galleryPicture = [];

  this.REG_STRING = /#photo\/(\S+)/;

  this.getPhotoGallery = this.getPhotoGallery.bind(this);
  this.initialClick = this.initialClick.bind(this);
  this.getActivePhoto = this.getActivePhoto.bind(this);
  this.hashChange = this.hashChange.bind(this);
  this.showGallery = this.showGallery.bind(this);
  this.showActivePhoto = this.showActivePhoto.bind(this);
  this.visibleButton = this.visibleButton.bind(this);
  this.closeGallery = this.closeGallery.bind(this);
  this.visibleButton = this.visibleButton.bind(this);
  this.showNextPage = this.showNextPage.bind(this);
  this.showBeforePage = this.showBeforePage.bind(this);
  this.clearHash = this.clearHash.bind(this);
  this.onCloseKeydownGallery = this.onCloseKeydownGallery.bind(this);

  this.element = this.getPhotoGallery();
  this.hashChange();

  photoGalleryContainer.addEventListener('click', this.initialClick);
  window.addEventListener('hashchange', this.hashChange.bind(this));
}

/**
 * Функция получения массива фотографий, на основе фотографий, расположенных на главной странице
 */
Gallery.prototype.getPhotoGallery = function() {
  for (var i = 0; i < photos.length; i++) {
    this.galleryPicture[i] = photos[i].getAttribute('src');
  }
};

/**
 * Функция первоначального клика на фотографии с главной страницы
 * @param {KeyboardEvent} evt
 */
Gallery.prototype.initialClick = function(evt) {
  evt.preventDefault();
  this.clickedElement = evt.target.getAttribute('src');
  this.currentNum = this.getActivePhoto(this.clickedElement);
  location.hash = '#photo/' + this.galleryPicture[this.currentNum];
};

/**
 * Функция определения индекса в массиве по переданному элементу. Используется во всех случаях изменения фото.
 * @param {string} clkElement
 * @returns {number}
 */
Gallery.prototype.getActivePhoto = function(clkElement) {
  for (var i = 0; i < this.galleryPicture.length; i++) {
    if (this.galleryPicture[i] === clkElement) {
      return i;
    }
  }
  return null;
};

/**
 * Функция анализа изменения значений в адресной строке
 */
Gallery.prototype.hashChange = function() {
  var galleryHash = window.location.href.match(this.REG_STRING);

  if (galleryHash && this.isShowGallery) {
    this.showActivePhoto();
  } else if(galleryHash && !this.isShowGallery) {
    this.showGallery();
  } else if(!galleryHash && this.isShowGallery) {
    this.closeGallery();
  }
};

/**
 * Функция отрисовки галереи
 */
Gallery.prototype.showGallery = function() {
  this.isShowGallery = true;

  galleryContainer.classList.remove('invisible');
  spanTotal.textContent = this.galleryPicture.length;

  this.element = new Image();
  this.mainPhoto = preview.appendChild(this.element);

  btnNext.addEventListener('click', this.showNextPage);
  btnBefore.addEventListener('click', this.showBeforePage);
  btnClose.addEventListener('click', this.clearHash);
  window.addEventListener('keydown', this.onCloseKeydownGallery);

  this.showActivePhoto();
};

/**
 * Функция отрисовки активной фото
 */
Gallery.prototype.showActivePhoto = function() {
  this.currentNum = this.getActivePhoto(window.location.href.match(this.REG_STRING)[1]);

  if (this.currentNum >= 0) {
    this.mainPhoto.src = this.galleryPicture[this.currentNum];
    spanCurrent.textContent = this.currentNum + 1;
    this.visibleButton();
  } else {
    this.clearHash();
  }
};

/**
 * Функция, отвечающая за отображение кнопок "вперед", "назад". Анализирует значение текущей фотографии по отношению к макс, мин индексу массива
 */
Gallery.prototype.visibleButton = function() {
  btnBefore.classList.toggle('invisible', this.currentNum === 0);
  btnNext.classList.toggle('invisible', (this.currentNum + 1) === this.galleryPicture.length);
};

/**
 * Функция, меняющая адрес в hash для отображения след.картинки
 */
Gallery.prototype.showNextPage = function() {
  location.hash = '#photo/' + this.galleryPicture[this.currentNum + 1];
};

/**
 * Функция, меняющая адрес в hash для отображения пред.картинки
 */
Gallery.prototype.showBeforePage = function() {
  location.hash = '#photo/' + this.galleryPicture[this.currentNum - 1];
};

utility.inherit(Gallery, BaseComponent);

/**
 * Функция закрытия блока галлереи
 */
Gallery.prototype.closeGallery = function() {
  this.isShowGallery = false;
  //this.mainPhoto = preview.removeChild(this.element);
  BaseComponent.prototype.remove.call(this);

  btnNext.removeEventListener('click', this.showNextPage);
  btnBefore.removeEventListener('click', this.showBeforePage);
  btnClose.removeEventListener('click', this.clearHash);
  window.removeEventListener('keydown', this.onCloseKeydownGallery);

  galleryContainer.classList.add('invisible');
};

/**
 * Функция, отвечающая за редактирования hash строки на основе переданных данных. Вызывается при листании "вперед", "назад"
 */
Gallery.prototype.clearHash = function() {
  location.hash = '';
};

/**
 * Функция, выполняющая анализ нажатой клавиши
 * @param {KeyboardEvent} evt
 */
Gallery.prototype.onCloseKeydownGallery = function(evt) {
  if (evt.keyCode === 27) {
    this.clearHash();
  }
};

module.exports = new Gallery();
