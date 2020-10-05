"use strict";

import { BaseComponent } from "./BaseComponent.js";
import { Player } from "../models/Player.js";
import { $ } from "../utils/helpers.js";
import { CharacterStat } from "./CharacterStat.js";
import { Character } from "../models/Character.js";

export class CharacterSelect extends BaseComponent {
    render() {
        let player = Player.active();
        let characters = player.characters.roster;

        let characterOptions = this.getCharacterOptions(characters, player);

        let element = `<select>${characterOptions}</select>`;
        this.element.innerHTML = element;
        
        $("select", this.element).onchange = function (ev) {
            CharacterSelect.onCharacterChange(ev)
        };
    }

    /**
     * Gets a string representing the list of characters as <option> elements.
     * @param {Character[]} characters 
     * @param {Player} player 
     */
    getCharacterOptions(characters, player) {
        let characterOptions = "";
        for (let index = 0; index < characters.length; index++) {
            const character = characters[index];
            let active = (index == player.characters.activeId) ? " selected" : "";
            characterOptions += `<option value=${index}${active}>${character.name}</option>`;
        }
        return characterOptions;
    }

    /**
     * When the user selects a new character, save the new character.
     * Also re-renders the components.
     * @param {Event} event 
     */
    static onCharacterChange(event) {
        let player = Player.active();
        player.characters.activeId = Number(event.target.value);
        player.save();

        for (const component of window.app.components) {
            // only re-render stat components
            if (component instanceof CharacterStat) {
                component.render();
            } else {
                console.log(`Component is instance of ${component.constructor.name}, not a stat`)
            }
        }
    } 
}