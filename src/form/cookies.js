/**
 * Created by Катэ on 20.04.2016.
 */

'use strict';

var cookies = require('browser-cookies');

//Вычисояем кол-во дней для хранения Куки
//Вычесляется как:
//1) Определяем кол-во дней, прошедших с последнего дня рождения
//2) Прибавляем к текущей дате
function setCookies(user, mark) {
  user.value = cookies.get('user');
  mark.value = cookies.get('mark') || 3;

  cookies.set('user', user.value, dateToExpire);
  cookies.set('mark', mark.value, dateToExpire);

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
}

module.exports = setCookies;
