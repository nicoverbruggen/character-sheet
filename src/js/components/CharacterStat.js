"use strict";

import { BaseComponent } from "./BaseComponent.js";
import { Character } from "../models/Character.js";
import { Player } from "../models/Player.js";
import { $ } from "../utils/helpers.js";

export class CharacterStat extends BaseComponent {
    render() {
        let statName = this.attributes.getNamedItem("data-bind").value;
        let statValue = Character.active().attributes[statName];

        // Set up HTML that will be displayed
        this.element.innerHTML = 
        `<label>${statName}</label>
        <button class="top">+</button>
        <input type="number" data-bind=${statName} value=${statValue}>
        <button class="bottom">-</button>`;
        this.element.className = "character-stat";
        
        // Set up event listeners 
        $('input', this.element).onchange = function(ev) {
            CharacterStat.onValueChange(ev);
        }
        $('button.top', this.element).onclick = function(ev) {
            CharacterStat.onButtonClick(ev, +1);
        }
        $('button.bottom', this.element).onclick = function(ev) {
            CharacterStat.onButtonClick(ev, -1);
        }
    }

    /**
     * Fired when the value of the character stat has changed.
     * @param {Event} event 
     */
    static onValueChange(event) {
        let stat = event.target.attributes.getNamedItem("data-bind").value;
        let value = event.target.valueAsNumber;
        Character.active().attributes[stat] = value;
        Player.active().save();
    }

    /**
     * Adds a certain number to the existing stat value.
     * If a negative number is added, the number is subtracted.
     * This triggers the `onchange` event.
     * @param {Event} event 
     * @param {Number} value 
     */
    static onButtonClick(event, value) {
        let element = $('input', event.target.parentNode);
        element.value = Number(element.value) + value;
        element.onchange({ target: element });
    } 
}