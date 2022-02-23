/**
 * Base class for defining enums.
 */
export class EnumType {
    /** The name of this enum entry. */
    Name: string;
    /** The description of this enum entry. */
    Description: string;

    /**
     * Creates a new enum entry.
     * @param name The name of this enum entry.
     * @param description The description of this enum entry.
     */
    constructor(name: string, description: string) {
        this.Name = name ?? "Undefined";
        this.Description = description ?? "This is as mysterious as it gets.";
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
     * @param description The description of this data entry.
     * @param lore The flavor text of this data entry.
     * @param icon The link to an image that represents this data entry.
     */
    constructor (id: number, name?: string, description?: string, lore?: string, icon?: string) {
        super(name, description);
        this.ID = id;
        this.Lore = lore ?? "Legend has it that the world beyond the boundaries of this land are rather... broken.";
        this.Icon = icon ?? ""; //TODO: missing texture
    }
}

/**
 * Class for data collections.
 */
export class DataCollection<T extends DataTemplate> {
    /** The data collection. */
    List: T[];

    /**
     * Creates a new data collection.
     * @param list List of data entries for this collection.
     */
    constructor (list: T[]) {
        this.List = list;
    }

    /**
     * Fetches an entry given by the ID from the collection.
     * @param id The ID of the data entry to return.
     * @returns A data entry. The first one in the collection if the ID is not found.
     */
    get_by_id (id: number): T {
        return this.List.find(entry => entry.ID == id) ?? this.List[0];
    }
}