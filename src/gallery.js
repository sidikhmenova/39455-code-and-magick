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

/** @type {Array.<string>} */
var galleryPicture = [];
var currentNum = 1;

getPhotoGallery(photos);

function getPhotoGallery(pct) {
  for (var i = 0; i < pct.length; i++) {
    galleryPicture[i] = pct[i].src;
  }
  console.log(galleryPicture);
}

function showGallery(num) {
  galleryContainer.classList.remove('invisible');
  spanTotal.textContent = galleryPicture.length;

  element = new Image();
  mainPhoto = preview.appendChild(element);

  showActivePhoto(num);
}

function showActivePhoto(num) {
  mainPhoto.src = galleryPicture[num];
  spanCurrent.textContent = num + 1;
  visibleButton();
}

function getActivePhoto(clkElement) {
  for (var i = 0; i < galleryPicture.length; i++) {
    if (galleryPicture[i] === clkElement) {
      currentNum = i;
      break;
    }
  }
  return currentNum;
}

function visibleButton() {
  btnBefore.classList.toggle('invisible', currentNum === 0);
  btnNext.classList.toggle('invisible', (currentNum + 1) === galleryPicture.length);
}

function closeGallery() {
  mainPhoto = preview.removeChild(element);
  galleryContainer.classList.add('invisible');
}

photoGalleryContainer.addEventListener('click', function(evt) {
  evt.preventDefault();
  clickedElement = evt.target.src;
  console.log(clickedElement);
  getActivePhoto(clickedElement);
  showGallery(currentNum);
});

btnNext.addEventListener('click', function() {
  ++currentNum;
  showActivePhoto(currentNum);
});

btnBefore.addEventListener('click', function() {
  --currentNum;
  showActivePhoto(currentNum);
});

btnClose.addEventListener('click', function(evt) {
  evt.preventDefault();
  closeGallery();
});

window.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 27) {
    closeGallery();
  }
});

module.exports = getPhotoGallery;
module.exports = showGallery;
