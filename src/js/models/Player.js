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
            activeId: null,
            /** @type {Character[]} */
            roster: [
                new Character("Anthony Stark"),
                new Character("Steve Rogers")
            ]
        };
    }

    /**
     * Returns the currently active player, if one exists in the window.app.player property.
     * @returns {Player|null}
     */
    static active() {
        if (typeof window.app.player === 'undefined') {
            return null;
        }
        return window.app.player;
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
        player.characters = Character.loadRoster(object);
        return player;
    }

    /**
     * Persists the current player to local storage (uses JSON.stringify).
     */
    save() {
        localStorage.setItem("player", JSON.stringify(this));
    }
}