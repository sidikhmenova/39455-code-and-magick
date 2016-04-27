/**
 * Created by Катэ on 23.04.2016.
 */

'use strict';

var galleryContainer = document.querySelector('.overlay-gallery');
var preview = document.querySelector('.overlay-gallery-preview');

var photoGalleryContainer = document.querySelector('.photogallery');
var photos = document.querySelectorAll('.photogallery img');
var clickedElement;
var mainPhoto;
var element;

var btnNext = document.querySelector('.overlay-gallery-control-right');
var btnBefore = document.querySelector('.overlay-gallery-control-left');
var btnClose = document.querySelector('.overlay-gallery-close');

var spanCurrent = document.querySelector('.preview-number-current');
var spanTotal = document.querySelector('.preview-number-total');

var currentNum = 1;

function Gallery() {
  var self = this;

  this.galleryPicture = [];

  this.getPhotoGallery = function(pct) {
    for (var i = 0; i < pct.length; i++) {
      self.galleryPicture[i] = pct[i].src;
    }
  };

  this.initialClick = function(evt) {
    evt.preventDefault();
    clickedElement = evt.target.src;
    currentNum = self.getActivePhoto(clickedElement);
    self.showGallery();
  };

  this.getActivePhoto = function(clkElement) {
    for (var i = 0; i < self.galleryPicture.length; i++) {
      if (self.galleryPicture[i] === clkElement) {
        return i;
      }
    }
    return null;
  };

  this.showGallery = function() {
    galleryContainer.classList.remove('invisible');
    spanTotal.textContent = self.galleryPicture.length;

    element = new Image();
    mainPhoto = preview.appendChild(element);

    btnNext.addEventListener('click', self.showNextPage);
    btnBefore.addEventListener('click', self.showBeforePage);
    btnClose.addEventListener('click', self.onCloseClickGallery);
    window.addEventListener('keydown', self.onCloseKeydownGallery);

    self.showActivePhoto();
  };

  this.showActivePhoto = function() {
    mainPhoto.src = self.galleryPicture[currentNum];
    spanCurrent.textContent = currentNum + 1;
    self.visibleButton();
  };

  this.visibleButton = function() {
    btnBefore.classList.toggle('invisible', currentNum === 0);
    btnNext.classList.toggle('invisible', (currentNum + 1) === self.galleryPicture.length);
  };

  this.closeGallery = function() {
    mainPhoto = preview.removeChild(element);

    btnNext.removeEventListener('click', self.showNextPage);
    btnBefore.removeEventListener('click', self.showBeforePage);
    btnClose.removeEventListener('click', self.onCloseClickGallery);
    window.removeEventListener('keydown', self.onCloseKeydownGallery);

    galleryContainer.classList.add('invisible');
  };

  this.showNextPage = function() {
    ++currentNum;
    self.showActivePhoto(currentNum);
  };

  this.showBeforePage = function() {
    --currentNum;
    self.showActivePhoto(currentNum);
  };

  this.onCloseClickGallery = function() {
    self.closeGallery();
  };

  this.onCloseKeydownGallery = function(evt) {
    if (evt.keyCode === 27) {
      self.closeGallery();
    }
  };

  this.element = this.getPhotoGallery(photos);

  photoGalleryContainer.addEventListener('click', self.initialClick);
}

module.exports = new Gallery();
