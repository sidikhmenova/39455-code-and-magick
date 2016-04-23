/**
 * Created by Катэ on 20.04.2016.
 */
'use strict';

/** @constant {number} */
var PAGE_SIZE = 3;

/** @param {Array.<Object>} data
 * @param {number} page
 * @return {Array.<Object>}
 * */
function paigination(data, page, btn) {

  var from = page * PAGE_SIZE;
  var to = from + PAGE_SIZE;
  var pageReview = data.slice(from, to);

  if (page + 1 < Math.floor(data.length / PAGE_SIZE)) {
    btn.classList.remove('invisible');
  } else {
    btn.classList.add('invisible');
  }

  return pageReview;
}

module.exports = paigination;
