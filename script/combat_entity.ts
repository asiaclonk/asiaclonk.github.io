import { ResultType, StatusType } from "../common/enum"

/**
 * Instanced VTubers and enemies for use in the battle simulator.
 */
export class CombatActor {
    /**
     * The display name of this actor.
     */
    Name: string
    /**
     * The base strength of this actor, including equipment. This also acts as their base maximum health.
     */
    BaseStrength: number
    /**
     * The current strength of this actor, including status effects. This is used each turn to allocate usable skills.
     */
    Strength: number
    /**
     * The current maximum health of this actor, including status effects.
     */
    MaxHealth: number
    /**
     * The current health of this actor. Actors become incapacitated if it falls to 0.
     */
    Health: number
    /**
     * Collection of status effects currently applied to this actor.
     */
    Status: Status[]

    /**
     * Creates a new CombatActor.
     * @param name The display name of this actor.
     * @param str Strength of this CombatActor.
     */
    constructor (name: string, str: number) {
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
    /**
     * The type of this Status.
     */
    Type: StatusType
    /**
     * If true, shows the amount of stacks on this status.
     */
    ShowStacks: boolean
    /**
     * The current amount of stacks on this status.
     */
    Stacks: number
}

/**
 * One of many results from a skill activation.
 */
export class ResultPart {
    /**
     * The acting entity of this result.
     */
    Actor: CombatActor
    /**
     * The type of effect this result has.
     */
    Type: ResultType
    /**
     * The value of this result. Number for damage etc. and a list of status when adding or removing status effects,
     */
    Value: number | Status[]
    /**
     * List of entities this skill is affecting.
     */
    Targets: CombatActor[]

    /**
     * Creates a new result.
     * @param {CombatActor} actor The acting entity of this result.
     * @param {ResultType} type The type of effect this result has.
     * @param {number | Status[]} value The value of this result. Number for damage etc. and a list of status when adding or removing status effects,
     * @param {CombatActor[]} target List of entities this skill is affecting.
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
    /**
     * All results, grouped by actor and in order of execution.
     */
    Results: Map<CombatActor, ResultPart[]>

    constructor () {
        this.Results = new Map();
    }
}