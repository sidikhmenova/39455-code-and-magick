/**
 * Created by Катэ on 20.04.2016.
 */

'use strict';

/**
 * @param {Array.<Object>} reviews
 * @param {string} id
 * @return {Array.<Object>}
 */
function filter(id, reviews) {
  var filteredReviews = reviews.slice(0);

  switch (id) {
    case 'reviews-all':
      break;
    // показывает список отзывов, оставленных за две недели, отсортированных по убыванию даты
    case 'reviews-recent':
      filteredReviews = filteredReviews.sort(function(a, b) {
        return b.date - a.date;
      });
      filteredReviews = filteredReviews.filter(function(a) {
        var lastDate = new Date();
        lastDate.setDate(lastDate.getDate() - 14);
        return a.date > lastDate;
      });
      break;
    //  с рейтингом не ниже 3, отсортированные по убыванию рейтинга
    case 'reviews-good':
      filteredReviews = filteredReviews.filter(function(a) {
        return a.rating > 2;
      });
      filteredReviews = filteredReviews.sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;
    //  с рейтингом не выше 2, отсортированные по возрастанию рейтинга
    case 'reviews-bad':
      filteredReviews = filteredReviews.filter(function(a) {
        return a.rating < 3;
      });
      filteredReviews = filteredReviews.sort(function(a, b) {
        return a.rating - b.rating;
      });
      break;
    case 'reviews-popular':
      //  отсортированные по убыванию оценки отзыва
      filteredReviews = filteredReviews.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
      break;
  }

  return filteredReviews;
}

module.exports = filter;
