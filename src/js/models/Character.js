"use strict";

import { Player } from "./Player.js";

export class Character {

    constructor(name) {
        this.name = name;
        this.attributes = {
            mind        : 1,
            body        : 1,
            will        : 1
        };
        this.traits = {
            focus       : 1,
            instinct    : 1,
            wits        : 1
        };
    }

    static active() {
        const player = Player.active();
        let index = player.characters.active;
        return player.characters.roster[index];
    }

    /**
     * Convert JSON to the player's character object 
     * (containing the active player plus roster).
     * @param {object} object 
     */
    static loadRoster(object) {
        let roster = [];
        
        for (let character of object.characters.roster) {
            let characterObject = this.loadFromObject(character);
            roster.push(characterObject);
        }

        return {
            active: object.characters.active,
            roster: roster
        }
    }

    /**
    * Convert JSON to actual instance of Character.
    * @param {Object} object
    */
    static loadFromObject(object) {
        let character = new Character();
        character.name = object.name;
        character.attributes = object.attributes;
        character.traits = object.traits;
        return character;
    }
    
}