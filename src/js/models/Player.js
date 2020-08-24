"use strict";

import { Character } from "./Character.js";

export class Player {

    /**
     * Creates a new player object, with a specific name.
     * @param {String} name 
     */
    constructor(name) {
        this.name = name;
        this.characters = {
            /** @type {Number} */
            active: null,
            /** @type {Character[]} */
            roster: []
        };
    }

    /**
     * Convert JSON to actual instance of Player.
     * @param {Object} object 
     */
    static loadFromObject(object) {
        let player = new Player();

        let roster = [];
        for (let character in object.characters.roster) {
            let characterObject = Character.loadFromObject(character);
            roster.push(characterObject);
        }

        player.name = object.name;
        player.characters = {
            active: object.characters.active,
            roster: roster
        }
        return player;
    }

    static load() {
        let data = JSON.parse(localStorage.getItem("player"));
        return this.loadFromObject(data);
    }

    save() {
        localStorage.setItem("player", JSON.stringify(this));
    }
}