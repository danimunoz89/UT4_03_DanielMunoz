"use strict";

import { EmptyValueException } from "./errors.js";

export class Category {

    #title;
    #description;

    constructor(title, description) {
        if (!title) {
            throw new EmptyValueException("title");
        }
        this.#title = title;
        this.#description = description;
    }

    get title() {
        return this.#title;
    }

    set title(newTitle) {
        if (!newTitle) {
            throw new EmptyValueException("newTitle");
        }
        this.#title = newTitle;
    }

    get description() {
        return this.#description;
    }

    set description(newDescription) {
        this.#description = newDescription;
    }

}