/**
 * Base class for defining enums.
 */
export class EnumType {
    /**
     * Constructor for defining this enum.
     * @param name The name of this enum entry.
     * @param description The description of this enum entry.
     */
    constructor(name, description) {
        this.Name = name;
        this.Description = description;
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
     * @param description The description of this data entry.
    */
    constructor(id, name, description) {
        super(name, description);
        this.ID = id;
    }
}
//# sourceMappingURL=base_classes.js.map