"use strict";

import { $$ } from "./utils/Helpers.js";
import { CharacterSelect } from "./components/CharacterSelect.js";

window.components = [];
CharacterSelect.register("character-select");
console.log(window.components);