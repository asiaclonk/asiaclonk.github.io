/**
 * Instanced VTubers and enemies for use in the battle simulator.
 */
export class CombatActor {
    /**
     * Creates a new CombatActor.
     * @param name The display name of this actor.
     * @param str Strength of this CombatActor.
     */
    constructor(name, str) {
        this.Name = name;
        this.BaseStrength = str;
        this.Strength = str;
        this.MaxHealth = str;
        this.Health = str;
        this.Status = [];
    }
}
/**
 * Instanced status effects currently applied to an actor.
 */
export class Status {
}
/**
 * One of many results from a skill activation.
 */
export class ResultPart {
    /**
     * Creates a new result.
     * @param {CombatActor} actor The acting entity of this result.
     * @param {ResultType} type The type of effect this result has.
     * @param {number | Status[]} value The value of this result. Number for damage etc. and a list of status when adding or removing status effects,
     * @param {CombatActor[]} target List of entities this skill is affecting.
     */
    constructor(actor, type, value, target) {
        this.Actor = actor;
        this.Type = type;
        this.Value = value;
        this.Targets = target;
    }
}
/**
 * The results of actions for a single turn. For logging purposes.
 */
export class ActionResult {
    constructor() {
        this.Results = new Map();
    }
}
//# sourceMappingURL=combat_entity.js.map