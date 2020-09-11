"use strict";

import { BaseComponent } from "./BaseComponent.js";
import { Player } from "../models/Player.js";
import { $ } from "../utils/helpers.js";
import { CharacterStat } from "./CharacterStat.js";

export class CharacterSelect extends BaseComponent {
    
    render() {
        let player = Player.active();
        let characters = player.characters.roster;

        let characterOptions = ""
        for (let index = 0; index < characters.length; index++) {
            const character = characters[index];
            let active = (index == player.characters.activeId) ? " selected" : "";
            characterOptions += `<option value=${index}${active}>${character.name}</option>`
        }

        let element = `<select>${characterOptions}</select>`;
        this.element.innerHTML = element;

        this.addEventListener();
    }

    addEventListener() {
        let dropDown = $("select", this.element);
        dropDown.onchange = function (selection) {
            let player = Player.active();
            player.characters.activeId = Number(selection.target.value);
            player.save();
            
            for (const component of window.app.components) {
                // only re-render stat components
                if (component instanceof CharacterStat) {
                    component.render();
                } else {
                    console.log(`Component is instance of ${component.constructor.name}, not a stat`)
                }
            }
        };
    }
}