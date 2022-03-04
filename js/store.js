"use strict";
import { EmptyValueException } from "./errors.js";

export class Store {

    #cif;
    #name;
    #address;
    #phone;
    #coords;

    constructor(cif, name, address, phone, coords) {

        if (!name) {
            throw new EmptyValueException("name");
        }
        this.#cif = cif;
        this.#name = name;
        this.#address = address;
        this.#phone = phone;
        this.#coords = coords;
    }

    get cif() {
        return this.#cif;
    }

    get name() {
        return this.#name;
    }

    set name(newName) {
        if (!newName) {
            throw new EmptyValueException("newName");
        }
        this.#name = newName;
    }

    get address() {
        return this.#address;
    }

    set address(newAddress) {
        this.#address = newAddress;
    }

    get phone() {
        return this.#phone;
    }

    set phone(newPhone) {
        this.#phone = newPhone;
    }

    get coords() {
        return this.#coords;
    }

    set coords(newCoords) {
        this.#coords = newCoords;
    }
}