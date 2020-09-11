"use strict";

import { BaseComponent } from "./BaseComponent.js";
import { Character } from "../models/Character.js";

export class CharacterStat extends BaseComponent {
    render() {
        let statName = this.attributes.getNamedItem("data-bind").value;
        let character = Character.active();
        let statValue = character.attributes[statName];
        this.element.innerHTML = `<input type="number" value=${statValue}>`;
    }
}