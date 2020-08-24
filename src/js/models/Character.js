"use strict";

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