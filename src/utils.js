/**
 * Created by Катэ on 02.05.2016.
 */

'use strict';

/**
 * Вспомогательная функция, наследующая класс из source и продлевающая цепочку прототипов target с использованием пустого конструктора
 * @param {Object} target
 * @param {Object} source
 */
function inherit(target, source) {
  function EmptyCtor() {}
  EmptyCtor.prototype = source.prototype;
  target.prototype = new EmptyCtor();
}

module.exports = inherit;
