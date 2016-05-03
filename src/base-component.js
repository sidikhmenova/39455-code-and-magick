/**
 * Created by Катэ on 02.05.2016.
 */

'use strict';

/**
 * @param {Object} data
 * @param {String} container
 * @constructor
 */
function BaseComponent(data, container) {
  this.element = data;
  this.container = container;
}

/**
 * Функция создания объекта
 */
BaseComponent.prototype.create = function() {
  this.container.appendChild(this.element);
};

/**
 * Функция удаления объекта
 */
BaseComponent.prototype.remove = function() {
  this.element.parentNode.removeChild(this.element);
};

module.exports = BaseComponent;
