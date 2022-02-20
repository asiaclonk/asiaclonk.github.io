/**
 * Base class for defining enums.
 */
export class EnumType {
    /** The name of this enum entry. */
    Name: string
    /** The description of this enum entry. */
    Description: string

    /**
     * Constructor for defining this enum.
     * @param name The name of this enum entry.
     * @param description The description of this enum entry.
     */
    constructor(name: string, description: string) {
        this.Name = name;
        this.Description = description;
    }
}

/**
 * Base class for data entries.
 */
export class DataTemplate extends EnumType {
    /** The unique identifier of this data entry. */
    ID: number

    /**
     * Creates a new data entry.
     * @param id The ID of this data entry.
     * @param name The name of this data entry.
     * @param description The description of this data entry.
    */
    constructor (id: number, name: string, description: string) {
        super(name, description);
        this.ID = id;
    }
}

