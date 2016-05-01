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

  this.REG_STRING = /#photo\/(\S+)/;

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
    this.clickedElement = evt.target.getAttribute('src');
    this.currentNum = self.getActivePhoto(this.clickedElement);
    location.hash = '#photo/' + self.galleryPicture[this.currentNum];
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
    var galleryHash = window.location.href.match(self.REG_STRING);

    if (galleryHash && self.isShowGallery) {
      self.showActivePhoto();
    } else if(galleryHash && !self.isShowGallery) {
      self.showGallery();
    } else if(!galleryHash && self.isShowGallery) {
      self.closeGallery();
    }
  };

  this.showGallery = function() {
    this.isShowGallery = true;

    this.galleryContainer.classList.remove('invisible');
    this.spanTotal.textContent = this.galleryPicture.length;

    this.element = new Image();
    this.mainPhoto = this.preview.appendChild(this.element);

    this.btnNext.addEventListener('click', function() {
      self.showNextPage();
    });
    this.btnBefore.addEventListener('click', function() {
      self.showBeforePage();
    });
    this.btnClose.addEventListener('click', function() {
      self.onCloseClickGallery();
    });
    window.addEventListener('keydown', function() {
      self.onCloseKeydownGallery();
    });

    self.showActivePhoto();
  };

  this.showActivePhoto = function() {
    this.currentNum = this.getActivePhoto(window.location.href.match(this.REG_STRING)[1]);

    if (this.currentNum) {
      this.mainPhoto.src = this.galleryPicture[this.currentNum];
      this.spanCurrent.textContent = this.currentNum + 1;
      this.visibleButton();
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

    this.btnNext.removeEventListener('click', function() {
      self.showNextPage();
    });
    this.btnBefore.removeEventListener('click', function() {
      self.showBeforePage();
    });
    this.btnClose.removeEventListener('click', function() {
      self.onCloseClickGallery();
    });
    window.removeEventListener('keydown', function() {
      self.onCloseKeydownGallery();
    });

    this.galleryContainer.classList.add('invisible');
  };

  this.showNextPage = function() {
    self.editLocationHash(1);
  };

  this.showBeforePage = function() {
    self.editLocationHash(-1);
  };

  this.editLocationHash = function(num) {
    this.currentNum = this.currentNum + num;
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

  this.photoGalleryContainer.addEventListener('click', function(evt) {
    self.initialClick(evt);
  });
  window.addEventListener('hashchange', function() {
    self.hashChange();
  });
}

module.exports = new Gallery();
