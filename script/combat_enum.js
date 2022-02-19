//@ts-check
/**
 * Collection of types of possible action results.
 */
class ResultType {
    /**
     * @type {ResultType} The acting entity is dealing damage.
     */
    static Damage = new ResultType("Damage", "The acting entity is dealing damage.");
    /**
     * The acting entity is applying block.
     * @type {ResultType}
     */
    static Block = new ResultType("Block", "The acting entity is applying block.");
    /**
     * The acting entity is recovering health.
     * @type {ResultType}
     */
    static Heal = new ResultType("Heal", "The acting entity is recovering health.");
    /**
     * The acting entity is applying a status effect on a target.
     * @type {ResultType}
     */
    static Status = new ResultType("Status", "The acting entity is applying a status effect on a target.");
    /**
     * The acting entity is removing a status effect from a target.
     * @type {ResultType}
     */
    static Cleanse = new ResultType("Cleanse", "The acting entity is removing a status effect from a target.");

    /**
     * The name of this type.
     * @type {string}
     */
    Name
    /**
     * The description of this type.
     * @type {string}
     */
    Description

    /**
     * Constructor for defining this enum.
     * @param {string} name The name of this type.
     * @param {string} description The description of this type.
     */
    constructor(name, description) {
        this.Name = name;
        this.Description = description;
    }
}

/**
 * Collection of possible targets for result effects as well as skill targeting descriptions.
 */
class ResultTarget {
    /**
     * Front player character.
     * @type {ResultTarget}
     */
    static PlayerFront = new ResultTarget("Front player character", "The player character at the front of your party.");
    /**
     * Middle player character.
     * @type {ResultTarget}
     */
    static PlayerMiddle = new ResultTarget("Middle player character", "The player character in the middle of your party.");
    /**
     * Back player character.
     * @type {ResultTarget}
     */
    static PlayerBack = new ResultTarget("Back player character", "The player character at the back of your party.");
    /**
     * Front enemy character.
     * @type {ResultTarget}
     */
    static EnemyFront = new ResultTarget("Front enemy character", "The enemy character at the front of their party.");
    /**
     * Middle enemy character.
     * @type {ResultTarget}
     */
    static EnemyMiddle = new ResultTarget("Middle enemy character", "The enemy character in the middle of their party.");
    /**
     * Back enemy character.
     * @type {ResultTarget}
     */
    static EnemyBack = new ResultTarget("Back enemy character", "The enemy character at the back of their party.");
    /**
     * The entire player party. Skill description only.
     * @type {ResultTarget}
     */
    static PlayerParty = new ResultTarget("Player party", "The entire player party.");
    /**
     * The entire enemy party. Skill description only.
     * @type {ResultTarget}
     */
    static EnemyParty = new ResultTarget("Enemy party", "The entire enemy party.");
    /**
     * True random. Skill description only.
     * @type {ResultTarget}
     */
    static Random = new ResultTarget("Random", "A random player or enemy character.");
    /**
     * Random player character. Skill description only.
     * @type {ResultTarget}
     */
    static PlayerRandom = new ResultTarget("Random player character", "A random player character.");
    /**
     * Random enemy character. Skill description only.
     * @type {ResultTarget}
     */
    static EnemyRandom = new ResultTarget("Random enemy character", "A random enemy character.");

    /**
     * The name of this type.
     * @type {string}
     */
    Name
    /**
     * The description of this type.
     * @type {string}
     */
    Description

    /**
     * Constructor for defining this enum.
     * @param {string} name The name of this type.
     * @param {string} description The description of this type.
     */
    constructor(name, description) {
        this.Name = name;
        this.Description = description;
    }
}

/**
 * Different attributes that a skill might have.
 */
class SkillTag {
    /**
     * Adjacant entities will be affected by 50% of the skill.
     * @type {SkillTag}
     */
    static Splash = new SkillTag("Splash", "Adjacant entities will be affected by 50% of the skill.");
    /**
     * The main target switches places with the entity behind them.
     * @type {SkillTag}
     */
    static Push = new SkillTag("Push", "The main target switches places with the entity behind them.");
    /**
     * The main target switches places with the entity in front of them.
     * @type {SkillTag}
     */
    static Pull = new SkillTag("Pull", "The main target switches places with the entity in front of them.");

    /**
     * The name of this type.
     * @type {string}
     */
    Name
    /**
     * The description of this type.
     * @type {string}
     */
    Description

    /**
     * Constructor for defining this enum.
     * @param {string} name The name of this type.
     * @param {string} description The description of this type.
     */
    constructor(name, description) {
        this.Name = name;
        this.Description = description;
    }
}

class ExpirationAmount {
    /**
     * All stacks will be lost.
     * @type {ExpirationAmount}
     */
     static All = new ExpirationAmount("All", "All stacks will be lost.");
    /**
     * Stacks will not expire.
     * @type {ExpirationAmount}
     */
     static None = new ExpirationAmount("None", "Stacks will not expire.");
    /**
     * Half of the stacks will be lost.
     * @type {ExpirationAmount}
     */
     static Half = new ExpirationAmount("Half", "Half of the stacks will be lost.");
    /**
     * Stacks will be reduced by one.
     * @type {ExpirationAmount}
     */
     static One = new ExpirationAmount("One", "Stacks will be reduced by one.");

     /**
     * The name of this type.
     * @type {string}
     */
    Name
    /**
     * The description of this type.
     * @type {string}
     */
    Description

    /**
     * Constructor for defining this enum.
     * @param {string} name The name of this type.
     * @param {string} description The description of this type.
     */
    constructor(name, description) {
        this.Name = name;
        this.Description = description;
    }
}

class ExpirationTrigger {
    /**
     * Expiration triggers at the end of the entitie's turn.
     * @type {ExpirationTrigger}
     */
     static TurnEnd = new ExpirationTrigger("Turn end", "Expiration triggers at the end of the entitie's turn.");
    /**
     * Expiration triggers when the status effect is activated.
     * @type {ExpirationTrigger}
     */
     static Move = new ExpirationTrigger("Move", "Expiration triggers when the entity changes position.");
    /**
     * Expiration triggers when the entity takes any damage.
     * @type {ExpirationTrigger}
     */
     static DamageTaken = new ExpirationTrigger("Damage taken", "Expiration triggers when the entity takes any damage.");
    /**
     * Expiration triggers when the entity is targeted by an attack.
     * @type {ExpirationTrigger}
     */
     static Attacked = new ExpirationTrigger("Attacked", "Expiration triggers when the entity is targeted by an attack.");
    /**
     * Expiration triggers when the entity makes an attack.
     * @type {ExpirationTrigger}
     */
     static Attacking = new ExpirationTrigger("Attacking", "Expiration triggers when the entity makes an attack.");
    /**
     * Expiration triggers when the entity makes an attack.
     * @type {ExpirationTrigger}
     */
     static StatusApplied = new ExpirationTrigger("Status applied", "Expiration triggers when another status is applied on the entity.");
     /**
     * No expiration occurs.
     * @type {ExpirationTrigger}
     */
     static None = new ExpirationTrigger("None", "No expiration occurs.");

     /**
     * The name of this type.
     * @type {string}
     */
    Name
    /**
     * The description of this type.
     * @type {string}
     */
    Description

    /**
     * Constructor for defining this enum.
     * @param {string} name The name of this type.
     * @param {string} description The description of this type.
     */
    constructor(name, description) {
        this.Name = name;
        this.Description = description;
    }
}

/**
 * All the different status effects.
 */
class StatusType {
    /**
     * Increases damage of physical attacks by the stack amount times two. Lost on activation.
     * @type {StatusType}
     */
    static Rage = new StatusType("Rage", "Increases damage of the next attack by the stack amount times two.");
    /**
     * Prevents the stack amount of block from expiring next turn.
     * @type {StatusType}
     */
    static OnGuard = new StatusType("On guard", "Prevents the stack amount of block from expiring next turn.");

    /**
     * The name of this type.
     * @type {string}
     */
    Name
    /**
     * The description of this type.
     * @type {string}
     */
    Description

    /**
     * Constructor for defining this enum.
     * @param {string} name The name of this type.
     * @param {string} description The description of this type.
     */
    constructor(name, description) {
        this.Name = name;
        this.Description = description;
    }
}