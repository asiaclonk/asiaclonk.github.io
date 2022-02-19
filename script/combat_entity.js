//@ts-check
/**
 * Instanced VTubers and enemies for use in the battle simulator.
 */
class CombatActor {
    /**
     * The display name of this actor.
     * @type {string}
     */
    Name
    /**
     * The base strength of this actor, including equipment. This also acts as their base maximum health.
     * @type {number}
     */
    BaseStrength
    /**
     * The current strength of this actor, including status effects. This is used each turn to allocate usable skills.
     * @type {number}
     */
    Strength
    /**
     * The current maximum health of this actor, including status effects.
     * @type {number}
     */
    MaxHealth
    /**
     * The current health of this actor. Actors become incapacitated if it falls to 0.
     * @type {number}
     */
    Health
    /**
     * Collection of status effects currently applied to this actor.
     * @type {Status[]}
     */
    Status

    /**
     * Creates a new CombatActor.
     * @param {string} name The display name of this actor.
     * @param {number} str Strength of this CombatActor.
     */
    constructor (name, str) {
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
class Status {
    /**
     * The type of this Status.
     * @type {StatusType}
     */
    Type
    /**
     * If true, shows the amount of stacks on this status.
     * @type {boolean}
     */
    ShowStacks
    /**
     * The current amount of stacks on this status.
     * @type {number}
     */
    Stacks
}

class ResultPart {
    /**
     * The type of effect this result has.
     * @type {ResultType}
     */
    Type
    /**
     * The value of the effect caused by this result.
     * @type {number | Status}
     */
    Value
    /**
     * The positions that this effect targets.
     * @type {ResultTarget}
     */
    Target

    constructor (type, value, target) {
        this.Type = type;
        this.value = value;
        this.target = target;
    }

    oof () {
        this.target = 4;
    }
}

class ActionResult {
    constructor () {
        this.PlayerResult = [];
        this.EnemyResult = [];
    }
}