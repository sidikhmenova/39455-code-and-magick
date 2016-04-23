/**
 * Created by Катэ on 20.04.2016.
 */
'use strict';

var cloudBlock = document.querySelector('.header-clouds');

function moveCloud() {
  var cloudPosition = cloudBlock.getBoundingClientRect();
  var isCloudAvailable = window.innerHeight - (cloudPosition.height - cloudPosition.top);

  if (isCloudAvailable > -cloudPosition.height ) {
    cloudBlock.style.backgroundPosition = -window.pageYOffset + 'px';
  }
}

module.exports = moveCloud;
