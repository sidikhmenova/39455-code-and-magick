/**
 * Created by Катэ on 20.04.2016.
 */

'use strict';

//Вычисояем кол-во дней для хранения Куки
//Вычесляется как:
//1) Определяем кол-во дней, прошедших с последнего дня рождения
//2) Прибавляем к текущей дате
function getDateExpire() {
  var today = new Date();
  var dateBD = new Date(today.getFullYear(), 3, 8);
  var dateExp;

  if (dateBD > today) {
    dateBD.setFullYear(dateBD.getFullYear() - 1);
    dateExp = +today - +dateBD;
  } else {
    dateExp = +today - +dateBD;
  }

  var dateToExpire = +Date.now() + +dateExp;

  return new Date(dateToExpire).toUTCString();
}

module.exports = getDateExpire;