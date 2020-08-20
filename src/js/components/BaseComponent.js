"use strict";

import { $$ } from "../utils/helpers.js";

export class BaseComponent {

    constructor(element) {
        this.element = element;
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
            let component = new this(element);
            // 2. push the newly created component to a master list of components
            window.components.push(component);
        }
    }

} 