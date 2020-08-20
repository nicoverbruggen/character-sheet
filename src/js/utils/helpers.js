"use strict";

/**
 * 
 * @param {String} selector 
 * @param {*} scope
 * @returns {ChildNode}
 */
export function $(selector, scope = document) {
    return scope.querySelector(selector);
}

/**
 * query selector all
 * @param {String} selector 
 * @param {*} scope
 * @returns {Array.<ChildNode>} 
 */
export function $$(selector, scope = document) {
    return Array.from(scope.querySelectorAll(selector));
}