"use strict";

import { BaseComponent } from "./BaseComponent.js";

export class CharacterSelect extends BaseComponent {
    
    render() {
        let template = `<p>Characters</p>`;
        this.element.innerHTML = template;
    }

}