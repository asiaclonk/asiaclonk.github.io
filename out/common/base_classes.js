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
     * @param type The type that this data entry represents.
     * @param name The name of this data entry.
     * @param description The description of this data entry.
    */
    constructor(id, name, description, type) {
        super(name, description);
        this.ID = id;
        this.Type = type;
    }
}
/**
 * Collection of data types.
 */
export class DataType extends EnumType {
}
/**
 * VTuber templates contain information about the actual VTuber and stat definitions.
 */
DataType.VTuber = new DataType("VTuber", "VTubers are the main characters in this game. Feel free to check out their channels!");
/**
 * Active skills for use in the combat simulator.
 */
DataType.ActiveSkill = new DataType("Active skills", "Active skills are used in combat. They require a certain amount of strength to use each turn.");
/**
 * Passive skills affect both the overworld and combat.
 */
DataType.PassiveSkill = new DataType("Passive skills", "Passive skills provide bonuses in the overworld and sometimes in combat as well.");
/**
 * Agencies.
 */
DataType.Agency = new DataType("Agency", "Sometimes VTubers come together under one banner, usually an agency such as Nijisanji or Hololive.");
//# sourceMappingURL=base_classes.js.map