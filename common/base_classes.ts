import { randomZero } from "./utility.js";

/**
 * Base class for defining enums.
 */
export class EnumType {
    /** The name of this enum entry. */
    Name: string;
    /** The Note of this enum entry. */
    Note: string;

    /**
     * Creates a new enum entry.
     * @param name The name of this enum entry.
     * @param note The Note of this enum entry.
     */
    constructor(name: string, note: string) {
        this.Name = name ?? "Undefined";
        this.Note = note ?? "This is as mysterious as it gets.";
    }
}

/**
 * Base class for data entries.
 */
export class DataTemplate extends EnumType {
    /** The unique identifier of this data entry. */
    ID: number;
    /** The flavor text of this data entry. */
    Lore: string;
    /** The link to an image that represents this data entry. */
    Icon: string;

    /**
     * Creates a new data entry.
     * @param id The ID of this data entry.
     * @param name The name of this data entry.
     * @param note The Note of this data entry.
     * @param lore The flavor text of this data entry.
     * @param icon The link to an image that represents this data entry.
     */
    constructor (id: number, name?: string, note?: string, lore?: string, icon?: string) {
        super(name, note);
        this.ID = id;
        this.Lore = lore ?? "Legend has it that the world beyond the boundaries of this land are rather... broken.";
        this.Icon = icon ?? ""; //TODO: missing texture
    }
}

/**
 * Base class for instanced entities.
 */
export class DataInstance {
    /** The ID of this instance. Must be unique within its respective list. */
    ListID: number;
    /** The Database ID that this instance is based on. */
    DataID: number;

    constructor(listId: number, dataId: number) {
        this.ListID = listId;
        this.DataID = dataId;
    }
}

/**
 * Class for data collections.
 */
export class DataCollection<T extends DataTemplate> extends Array {
    /**
     * Creates a new data collection.
     * @param list List of data entries for this collection.
     */
    constructor (list: T[]) {
        super();
        list.forEach((elem) => this.push(elem));
    }

    /**
     * Fetches an entry given by the ID from the collection.
     * @param id The ID of the data entry to return.
     * @returns A data entry. If the ID is not found, the first element in the collection is returned.
     */
    getById (id: number): T {
        if (this.length == 0)
            throw new RangeError("This DataCollection is empty.");

        return this.find(entry => entry.ID == id) ?? this[0];
    }

    /**
     * Fetches a random entry from the collection.
     * @returns A data entry.
     */
    getRandom(): T {
        if (this.length == 0)
            throw new RangeError("This DataCollection is empty.");
        
        return this[randomZero(this.length)];
    }

    /**
     * Fetches a number of random entries from the collection.
     * @param amount number of entries to return.
     * @returns A list of data entries.
     */
    getRandomList(amount: number): T[] {
        if (this.length == 0)
            throw new RangeError("This DataCollection is empty.");
        
        let list = [];
        for (let i = 0; i < amount; i++) {
            list.push(this[randomZero(this.length)]);
        }
        
        return list;
    }

    /**
     * Fetches a number of random unique entries from the collection.
     * @param amount number of entries to return.
     * @returns A list of data entries.
     */
    getRandomBag(amount: number): T[] {
        if (this.length == 0)
            throw new RangeError("This DataCollection is empty.");
        if (this.length < amount)
            throw new RangeError(`This DataCollection has less elements (${this.length}) than the requested amount (${amount}).`);

        let list = [];
        let bag = [];

        // Indexlist
        for (let i = 1; i <= this.length; i++) {
           bag.push(i);
        }

        // Randomize order
        bag.sort(() => { return Math.floor(Math.random() * 3) - 1; })

        // Populate result
        for (let i = 0; i < amount; i++) {
            list.push(this[bag.pop()]);
        }
            
        return list;
    }
}