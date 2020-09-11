"use strict";

import { $$ } from "../utils/helpers.js";

export class BaseComponent {

    /**
     * 
     * @param {HTMLElement} newElement 
     * @param {HTMLElement} originalElement
     */
    constructor(newElement, originalElement) {
        /** @type {Node} */
        this.element = newElement;
        /** @type {NamedNodeMap} */
        this.attributes = originalElement.attributes

        this.render();
    }

    render() {
        this.element.innerHTML = "You have no template defined.";
    }

    static register(selector) {
        // 1. find the selector and replace the element with a component
        let items = $$(selector);
        for (const foundElement of items) {
            let element = document.createElement("div");
            foundElement.replaceWith(element);
            // create a new component instance
            let component = new this(element, foundElement);
            // 2. push the newly created component to a master list of components
            window.app.components.push(component);
        }
    }

} 