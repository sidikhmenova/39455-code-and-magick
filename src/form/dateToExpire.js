/**
 * Created by Катэ on 20.04.2016.
 */

'use strict';

/**
 * Функция получения кол-во дней хранения куки
 */
function dateToExpire() {
  var today = new Date();
  var dateBD = new Date(today.getFullYear(), 3, 8);
  var dateExp;

  if (dateBD > today) {
    dateBD.setFullYear(dateBD.getFullYear() - 1);
    dateExp = +today - +dateBD;
  } else {
    dateExp = +today - +dateBD;
  }

  var dateEnd = +Date.now() + +dateExp;

  return new Date(dateEnd).toUTCString();
}

module.exports = dateToExpire;
