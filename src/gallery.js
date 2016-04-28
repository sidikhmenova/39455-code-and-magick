/**
 * Created by Катэ on 23.04.2016.
 */

'use strict';

/** @constructor */
function Gallery() {
  this.galleryContainer = document.querySelector('.overlay-gallery');
  this.preview = document.querySelector('.overlay-gallery-preview');

  this.photoGalleryContainer = document.querySelector('.photogallery');
  this.photos = document.querySelectorAll('.photogallery img');

  this.clickedElement = null;
  this.mainPhoto = null;
  this.element = null;

  this.btnNext = document.querySelector('.overlay-gallery-control-right');
  this.btnBefore = document.querySelector('.overlay-gallery-control-left');
  this.btnClose = document.querySelector('.overlay-gallery-close');

  this.spanCurrent = document.querySelector('.preview-number-current');
  this.spanTotal = document.querySelector('.preview-number-total');

  this.currentNum = 1;

  var self = this;

  this.galleryPicture = [];

  /**
   * @param {Array} pct
   */
  this.getPhotoGallery = function(pct) {
    for (var i = 0; i < pct.length; i++) {
      self.galleryPicture[i] = pct[i].src;
    }
  };

  /**
   * @param {KeyboardEvent} evt
   */
  this.initialClick = function(evt) {
    evt.preventDefault();
    this.clickedElement = evt.target.src;
    this.currentNum = self.getActivePhoto(this.clickedElement);
    self.showGallery(this.currentNum);
  };

  /**
   * @param {string} clkElement
   * @returns {number}
   */
  this.getActivePhoto = function(clkElement) {
    for (var i = 0; i < self.galleryPicture.length; i++) {
      if (self.galleryPicture[i] === clkElement) {
        return i;
      }
    }
    return null;
  };

  this.showGallery = function(num) {
    this.galleryContainer.classList.remove('invisible');
    this.spanTotal.textContent = self.galleryPicture.length;

    this.element = new Image();
    this.mainPhoto = this.preview.appendChild(this.element);

    this.btnNext.addEventListener('click', self.showNextPage);
    this.btnBefore.addEventListener('click', self.showBeforePage);
    this.btnClose.addEventListener('click', self.onCloseClickGallery);
    window.addEventListener('keydown', self.onCloseKeydownGallery);

    self.showActivePhoto(num);
  };

  this.showActivePhoto = function(num) {
    this.mainPhoto.src = self.galleryPicture[num];
    this.spanCurrent.textContent = num + 1;
    self.visibleButton();
  };

  this.visibleButton = function() {
    this.btnBefore.classList.toggle('invisible', this.currentNum === 0);
    this.btnNext.classList.toggle('invisible', (this.currentNum + 1) === self.galleryPicture.length);
  };

  this.closeGallery = function() {
    this.mainPhoto = this.preview.removeChild(this.element);

    this.btnNext.removeEventListener('click', self.showNextPage);
    this.btnBefore.removeEventListener('click', self.showBeforePage);
    this.btnClose.removeEventListener('click', self.onCloseClickGallery);
    window.removeEventListener('keydown', self.onCloseKeydownGallery);

    this.galleryContainer.classList.add('invisible');
  };

  this.showNextPage = function() {
    ++this.currentNum;
    self.showActivePhoto(this.currentNum);
  };

  this.showBeforePage = function() {
    --this.currentNum;
    self.showActivePhoto(this.currentNum);
  };

  this.onCloseClickGallery = function() {
    self.closeGallery();
  };

  /**
   * @param {KeyboardEvent} evt
   */
  this.onCloseKeydownGallery = function(evt) {
    if (evt.keyCode === 27) {
      self.closeGallery();
    }
  };

  this.element = this.getPhotoGallery(this.photos);

  this.photoGalleryContainer.addEventListener('click', self.initialClick);
}

module.exports = new Gallery();
