import { ResultType } from "../common/enum.js";
import { CombatActor } from "./combat_actor.js";
import { Status } from "./status.js";

/**
 * One of many results from a skill activation.
 */
export class ResultPart {
    /** The acting entity of this result. */
    Actor: CombatActor;
    /** The type of effect this result has. */
    Type: ResultType;
    /** The value of this result. Number for damage etc. and a list of status when adding or removing status effects, */
    Value: number | Status[];
    /** List of entities this skill is affecting. */
    Targets: CombatActor[];

    /**
     * Creates a new result part.
     * @param actor The acting entity of this result.
     * @param type The type of effect this result has.
     * @param value The value of this result. Number for damage etc. and a list of status when adding or removing status effects,
     * @param target List of entities this skill is affecting.
     */
    constructor (actor: CombatActor, type: ResultType, value: number | Status[], target: CombatActor[]) {
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
    /** All results, grouped by actor and in order of execution. */
    Results: Map<CombatActor, ResultPart[]>

    constructor () {
        this.Results = new Map();
    }
}