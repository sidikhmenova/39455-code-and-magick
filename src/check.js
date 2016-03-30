/**
 * Created by Катэ on 23.03.2016.
 */

function getMessage (a, b) {
  var result;

  //если первый аргумент логический тип
  if (typeof a === 'boolean') {
    if (a) {
      result = 'Я попал в ' + b;
    }
    else {
      result = 'Я никуда не попал';
    }
  }

  //если числовой тип
  else if (typeof a === 'number') {
    result = 'Я прыгнул на ' + a*100 + ' сантиметров';
  }

  //если оба массивы
  else if (typeof a === 'object' && typeof b === 'object') {
    var length = 0;
    for (var i = 0; i < a.length; i++) {
      if (i < b.length) {
        length += a[i] * b[i];
      }
    }
    result = 'Я прошёл ' + length + ' метров';
  }

  //если массив только а
  else if (typeof a === 'object') {
    var sum = 0;
    for (var i = 0; i < a.length; i++) {
      sum += a[i];
    }
    result = 'Я прошёл ' + sum + ' шагов';
  }

  return result;
}