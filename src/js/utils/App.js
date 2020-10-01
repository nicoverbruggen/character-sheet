"use strict";

import { BaseComponent } from "../components/BaseComponent.js";
import { Player } from "../models/Player.js";
import { CharacterSelect } from "../components/CharacterSelect.js";
import { CharacterStat } from "../components/CharacterStat.js";

export class App {

    constructor() {
        /** @type {BaseComponent[]} */
        this.components = [];

        /** @type {Player} */
        this.player = Player.load();

        // Save the app to the window
        window.app = this;   

        this.loadPlayer();
        this.registerComponents();
    }

    loadPlayer() {
        if (this.player == null) {
            let name = prompt("Enter your name!");
            this.player = new Player(name);
            this.player.save();
        }
    }

    registerComponents() {
        CharacterSelect.register("character-select");
        CharacterStat.register("character-stat");
    }
}