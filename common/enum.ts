import { EnumType } from "./base_classes";

/**
 * Collection of types of possible action results.
 */
 export class ResultType extends EnumType {
    /** The acting entity is dealing damage. */
    static Damage = new ResultType("Damage", "The acting entity is dealing damage.");
    /** The acting entity is applying block. */
    static Block = new ResultType("Block", "The acting entity is applying block.");
    /** The acting entity is recovering health. */
    static Heal = new ResultType("Heal", "The acting entity is recovering health.");
    /** The acting entity is applying a status effect on a target. */
    static Status = new ResultType("Status", "The acting entity is applying a status effect on a target.");
    /** The acting entity is removing a status effect from a target. */
    static Cleanse = new ResultType("Cleanse", "The acting entity is removing a status effect from a target.");
    /** The acting entity is causing movement of entities. */
    static Move = new ResultType("Move", "The acting entity is causing movement of entities.");
}

/**
 * Collection of possible targets for skill targeting descriptions.
 */
export class SkillTarget extends EnumType {
    /** The front player character. */
    static PlayerFront = new SkillTarget("Front player character", "The player character at the front of your party.");
    /** The back player character. */
    static PlayerBack = new SkillTarget("Back player character", "The player character at the back of your party.");
    /** The front enemy character. */
    static EnemyFront = new SkillTarget("Front enemy character", "The enemy character at the front of their party.");
    /** The back enemy character. */
    static EnemyBack = new SkillTarget("Back enemy character", "The enemy character at the back of their party.");
    /** Any character. */
    static Any = new SkillTarget("Any character", "Any character.");
    /** Any player character. */
    static PlayerAny = new SkillTarget("Any player character", "Any player character in your party.");
    /** Any enemy character. */
    static EnemyAny = new SkillTarget("Any enemy character", "Any enemy character in their party.");
    /** The entire player party. */
    static PlayerParty = new SkillTarget("Player party", "The entire player party.");
    /** The entire enemy party. */
    static EnemyParty = new SkillTarget("Enemy party", "The entire enemy party.");
    /** The skill user. */
    static Self = new SkillTarget("Self", "The skill user.");
    /** No target. */
    static None = new SkillTarget("No target", "This skill doesn't target anything.");
}

/**
 * Different attributes that a skill might have.
 */
export class SkillTag extends EnumType {
    /** Adjacant entities will be affected by 50% of the skill. */
    static Splash = new SkillTag("Splash", "Adjacant entities will be affected by 50% of the skill.");
    /** The main target switches places with the entity behind them. */
    static Push = new SkillTag("Push", "The main target switches places with the entity behind them.");
    /** The main target switches places with the entity in front of them. */
    static Pull = new SkillTag("Pull", "The main target switches places with the entity in front of them.");
}

/**
 * Different amounts that a status can decrease by.
 */
export class ExpirationAmount extends EnumType {
    /** All stacks will be lost. */
    static All = new ExpirationAmount("All", "All stacks will be lost.");
    /** Stacks will not expire. */
    static None = new ExpirationAmount("None", "Stacks will not expire.");
    /** Half of the stacks will be lost. */
    static Half = new ExpirationAmount("Half", "Half of the stacks will be lost.");
    /** Stacks will be reduced by one. */
    static One = new ExpirationAmount("One", "Stacks will be reduced by one.");
}

/**
 * Different trigger points for decreasing status effects.
 */
export class ExpirationTrigger extends EnumType {
    /** Expiration triggers at the end of the entitie's turn. */
    static TurnEnd = new ExpirationTrigger("Turn end", "Expiration triggers at the end of the entitie's turn.");
    /** Expiration triggers when the status effect is activated. */
    static Move = new ExpirationTrigger("Move", "Expiration triggers when the entity changes position.");
    /** Expiration triggers when the entity takes any damage. */
    static DamageTaken = new ExpirationTrigger("Damage taken", "Expiration triggers when the entity takes any damage.");
    /** Expiration triggers when the entity is targeted by an attack. */
    static Attacked = new ExpirationTrigger("Attacked", "Expiration triggers when the entity is targeted by an attack.");
    /** Expiration triggers when the entity makes an attack. */
    static Attacking = new ExpirationTrigger("Attacking", "Expiration triggers when the entity makes an attack.");
    /** Expiration triggers when the entity makes an attack. */
    static StatusApplied = new ExpirationTrigger("Status applied", "Expiration triggers when another status is applied on the entity."); /** * @type {ExpirationTrigger} No expiration occurs. */ static None = new ExpirationTrigger("None", "No expiration occurs.");
}

/**
 * All the different status effects.
 */
export class StatusType extends EnumType {
    /** Increases damage of physical attacks by the stack amount times two. */
    static Rage = new StatusType("Rage", "Increases damage of the next offensive skill by the stack amount times two.");
    /** Prevents the stack amount of block from expiring next turn. */
    static OnGuard = new StatusType("On guard", "Prevents the stack amount of block from expiring next turn.");
}