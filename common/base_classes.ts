/**
 * Base class for defining enums.
 */
export class EnumType {
    /**
     * The name of this enum entry.
     */
    Name: string
    /**
     * The description of this enum entry.
     */
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
    /**
     * The unique identifier of this data entry.
     */
    ID: number
    /**
     * The type that this data entry represents.
     */
    Type: DataType

    /**
     * Creates a new data entry.
     * @param id The ID of this data entry.
     * @param type The type that this data entry represents.
     * @param name The name of this data entry.
     * @param description The description of this data entry.
    */
    constructor (id: number, name: string, description: string, type: DataType) {
        super(name, description);
        this.ID = id;
        this.Type = type;
    }
}

/**
 * Collection of data types.
 */
 export class DataType extends EnumType {
    /**
     * VTuber templates contain information about the actual VTuber and stat definitions.
     */
    static VTuber = new DataType("VTuber", "VTubers are the main characters in this game. Feel free to check out their channels!");
    /**
     * Active skills for use in the combat simulator.
     */
    static ActiveSkill = new DataType("Active skills", "Active skills are used in combat. They require a certain amount of strength to use each turn.");
    /**
     * Passive skills affect both the overworld and combat.
     */
    static PassiveSkill = new DataType("Passive skills", "Passive skills provide bonuses in the overworld and sometimes in combat as well.");
    /**
     * Agencies.
     */
    static Agency = new DataType("Agency", "Sometimes VTubers come together under one banner, usually an agency such as Nijisanji or Hololive.");
}