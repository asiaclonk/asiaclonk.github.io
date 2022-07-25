import { random_zerobase } from "./utility.js";
/**
 * Base class for defining enums.
 */
export class EnumType {
    /**
     * Creates a new enum entry.
     * @param name The name of this enum entry.
     * @param note The Note of this enum entry.
     */
    constructor(name, note) {
        this.Name = name !== null && name !== void 0 ? name : "Undefined";
        this.Note = note !== null && note !== void 0 ? note : "This is as mysterious as it gets.";
    }
}
/**
 * Base class for data entries.
 */
export class DataTemplate extends EnumType {
    /**
     * Creates a new data entry.
     * @param id The ID of this data entry.
     * @param name The name of this data entry.
     * @param note The Note of this data entry.
     * @param lore The flavor text of this data entry.
     * @param icon The link to an image that represents this data entry.
     */
    constructor(id, name, note, lore, icon) {
        super(name, note);
        this.ID = id;
        this.Lore = lore !== null && lore !== void 0 ? lore : "Legend has it that the world beyond the boundaries of this land are rather... broken.";
        this.Icon = icon !== null && icon !== void 0 ? icon : ""; //TODO: missing texture
    }
}
/**
 * Base class for instanced entities.
 */
export class DataInstance {
}
/**
 * Class for data collections.
 */
export class DataCollection extends Array {
    /**
     * Creates a new data collection.
     * @param list List of data entries for this collection.
     */
    constructor(list) {
        super();
        list.forEach((elem) => this.push(elem));
    }
    /**
     * Fetches an entry given by the ID from the collection.
     * @param id The ID of the data entry to return.
     * @returns A data entry. The first one in the collection if the ID is not found.
     */
    get_by_id(id) {
        var _a;
        if (this.length == 0)
            throw new RangeError(`This DataCollection is empty.`);
        return (_a = this.find(entry => entry.ID == id)) !== null && _a !== void 0 ? _a : this[0];
    }
    /**
     * Fetches a random entry from the collection.
     * @returns A data entry.
     */
    get_random() {
        if (this.length == 0)
            throw new RangeError(`This DataCollection is empty.`);
        return this[random_zerobase(this.length)];
    }
}
//# sourceMappingURL=base_classes.js.map