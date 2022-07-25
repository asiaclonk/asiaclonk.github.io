/**
 * One of many results from a skill activation.
 */
export class ResultPart {
    /**
     * Creates a new result part.
     * @param actor The acting entity of this result.
     * @param type The type of effect this result has.
     * @param value The value of this result. Number for damage etc. and a list of status when adding or removing status effects,
     * @param target List of entities this skill is affecting.
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
//# sourceMappingURL=action_result.js.map