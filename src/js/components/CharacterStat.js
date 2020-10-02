"use strict";

import { BaseComponent } from "./BaseComponent.js";
import { Character } from "../models/Character.js";
import { Player } from "../models/Player.js";
import { $ } from "../utils/helpers.js";

export class CharacterStat extends BaseComponent {
    render() {
        let statName = this.attributes.getNamedItem("data-bind").value;
        let character = Character.active();
        let statValue = character.attributes[statName];

        this.element.innerHTML = 
        `<label>${statName}</label>
        <button class="top">+</button>
        <input type="number" data-bind=${statName} value=${statValue}>
        <button class="bottom">-</button>`;
        this.element.className = "character-stat";
        
        $('input', this.element).onchange = function(ev) {
            let statInput = ev.target;
            let stat = statInput.attributes.getNamedItem("data-bind").value;
            let value = statInput.valueAsNumber;
            Character.active().attributes[stat] = value;
            Player.active().save();
        }

        $('button.top', this.element).onclick = function(ev) {
            let element = $('input', ev.target.parentNode);
            element.value = Number(element.value) + Number(1);
            const e = new Event("change", { target: element });
            element.dispatchEvent(e);
        }
        $('button.bottom', this.element).onclick = function(ev) {
            let element = $('input', ev.target.parentNode);
            element.value = Number(element.value) - Number(1);
            const e = new Event("change", {target: element});
            element.dispatchEvent(e);
        }
    }
}