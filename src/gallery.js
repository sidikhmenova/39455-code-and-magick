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
  this.isShowGallery = null;

  this.RE = /#photo\/(\S+)/;

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
      this.galleryPicture[i] = pct[i].getAttribute('src');
    }
  };

  /**
   * @param {KeyboardEvent} evt
   */
  this.initialClick = function(evt) {
    evt.preventDefault();
    self.clickedElement = evt.target.getAttribute('src');
    self.currentNum = self.getActivePhoto(self.clickedElement);
    location.hash = '#photo/' + self.galleryPicture[self.currentNum];
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

  this.hashChange = function() {
    var galleryHash = window.location.href.match(this.RE);

    if (galleryHash && self.isShowGallery) {
      self.showActivePhoto();
    } else if(galleryHash && !self.isShowGallery) {
      self.showGallery();
    } else if(!galleryHash && self.isShowGallery) {
      self.closeGallery();
    }
  };

  this.showGallery = function() {
    self.isShowGallery = true;

    self.galleryContainer.classList.remove('invisible');
    self.spanTotal.textContent = self.galleryPicture.length;

    self.element = new Image();
    self.mainPhoto = self.preview.appendChild(self.element);

    self.btnNext.addEventListener('click', self.showNextPage);
    self.btnBefore.addEventListener('click', self.showBeforePage);
    self.btnClose.addEventListener('click', self.onCloseClickGallery);
    window.addEventListener('keydown', self.onCloseKeydownGallery);

    self.showActivePhoto();
  };

  this.showActivePhoto = function() {
    self.currentNum = self.getActivePhoto(window.location.href.match(this.RE)[1]);

    if (self.currentNum) {
      this.mainPhoto.src = self.galleryPicture[self.currentNum];
      this.spanCurrent.textContent = self.currentNum + 1;
      self.visibleButton();
    } else {
      location.hash = '';
    }
  };

  this.visibleButton = function() {
    this.btnBefore.classList.toggle('invisible', self.currentNum === 0);
    this.btnNext.classList.toggle('invisible', (self.currentNum + 1) === self.galleryPicture.length);
  };

  this.closeGallery = function() {
    this.isShowGallery = false;
    this.mainPhoto = this.preview.removeChild(this.element);

    this.btnNext.removeEventListener('click', self.showNextPage);
    this.btnBefore.removeEventListener('click', self.showBeforePage);
    this.btnClose.removeEventListener('click', self.onCloseClickGallery);
    window.removeEventListener('keydown', self.onCloseKeydownGallery);

    this.galleryContainer.classList.add('invisible');
  };

  this.showNextPage = function() {
    self.editLocationHash(1);
  };

  this.showBeforePage = function() {
    self.editLocationHash(-1);
  };

  this.editLocationHash = function(num) {
    self.currentNum = self.currentNum + num;
    location.hash = '#photo/' + self.galleryPicture[self.currentNum];
  };

  this.onCloseClickGallery = function() {
    location.hash = '';
  };

  /**
   * @param {KeyboardEvent} evt
   */
  this.onCloseKeydownGallery = function(evt) {
    if (evt.keyCode === 27) {
      location.hash = '';
    }
  };

  this.element = this.getPhotoGallery(this.photos);
  this.hashChange();

  this.photoGalleryContainer.addEventListener('click', self.initialClick);
  window.addEventListener('hashchange', self.hashChange);
}

module.exports = new Gallery();
