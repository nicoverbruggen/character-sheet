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
            roster: [
                new Character("Anthony Stark"),
                new Character("Steve Rogers")
            ]
        };
    }

    /**
     * Loads the player from storage and converts the saved object into a valid Player instance.
     * @returns {Player}
     */
    static load() {
        let data = JSON.parse(localStorage.getItem("player"));
        if (data == null) {
            return null; 
        }
        return this.loadFromObject(data);
    }

    /**
     * Convert JSON to actual instance of Player.
     * @param {Object} object 
     */
    static loadFromObject(object) {
        let player = new Player(object.name);

        let roster = [];
        for (let character of object.characters.roster) {
            let characterObject = Character.loadFromObject(character);
            roster.push(characterObject);
        }

        player.characters = {
            active: object.characters.active,
            roster: roster
        }
        return player;
    }

    /**
     * Persists the current player to local storage (uses JSON.stringify).
     */
    save() {
        localStorage.setItem("player", JSON.stringify(this));
    }
}