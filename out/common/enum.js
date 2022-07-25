import { EnumType } from "./base_classes.js";
/**
 * Collection of types of possible action results.
 */
export class ResultType extends EnumType {
}
/** The acting entity is dealing damage. */
ResultType.Damage = new ResultType("Damage", "The acting entity is dealing damage.");
/** The acting entity is applying block. */
ResultType.Block = new ResultType("Block", "The acting entity is applying block.");
/** The acting entity is recovering health. */
ResultType.Heal = new ResultType("Heal", "The acting entity is recovering health.");
/** The acting entity is applying a status effect on a target. */
ResultType.Status = new ResultType("Status", "The acting entity is applying a status effect on a target.");
/** The acting entity is removing a status effect from a target. */
ResultType.Cleanse = new ResultType("Cleanse", "The acting entity is removing a status effect from a target.");
/** The acting entity is causing movement of entities. */
ResultType.Move = new ResultType("Move", "The acting entity is causing movement of entities.");
/**
 * Collection of possible targets for skill targeting notes.
 */
export class SkillTarget extends EnumType {
}
/** The front player character. */
SkillTarget.PlayerFront = new SkillTarget("Front player character", "The player character at the front of your party.");
/** The back player character. */
SkillTarget.PlayerBack = new SkillTarget("Back player character", "The player character at the back of your party.");
/** The front enemy character. */
SkillTarget.EnemyFront = new SkillTarget("Front enemy character", "The enemy character at the front of their party.");
/** The back enemy character. */
SkillTarget.EnemyBack = new SkillTarget("Back enemy character", "The enemy character at the back of their party.");
/** Any character. */
SkillTarget.Any = new SkillTarget("Any character", "Any character.");
/** Any player character. */
SkillTarget.PlayerAny = new SkillTarget("Any player character", "Any player character in your party.");
/** Any enemy character. */
SkillTarget.EnemyAny = new SkillTarget("Any enemy character", "Any enemy character in their party.");
/** The entire player party. */
SkillTarget.PlayerParty = new SkillTarget("Player party", "The entire player party.");
/** The entire enemy party. */
SkillTarget.EnemyParty = new SkillTarget("Enemy party", "The entire enemy party.");
/** The skill user. */
SkillTarget.Self = new SkillTarget("Self", "The skill user.");
/** No target. */
SkillTarget.None = new SkillTarget("No target", "This skill doesn't target anything.");
/**
 * Different attributes that a skill might have.
 */
export class SkillTag extends EnumType {
}
/** Adjacant entities will be affected by 50% of the skill. */
SkillTag.Splash = new SkillTag("Splash", "Adjacant entities will be affected by 50% of the skill.");
/** The main target switches places with the entity behind them. */
SkillTag.Push = new SkillTag("Push", "The main target switches places with the entity behind them.");
/** The main target switches places with the entity in front of them. */
SkillTag.Pull = new SkillTag("Pull", "The main target switches places with the entity in front of them.");
/**
 * Different amounts that a status can decrease by.
 */
export class ExpirationAmount extends EnumType {
}
/** All stacks will be lost. */
ExpirationAmount.All = new ExpirationAmount("All", "All stacks will be lost.");
/** Stacks will not expire. */
ExpirationAmount.None = new ExpirationAmount("None", "Stacks will not expire.");
/** Half of the stacks will be lost. */
ExpirationAmount.Half = new ExpirationAmount("Half", "Half of the stacks will be lost.");
/** Stacks will be reduced by one. */
ExpirationAmount.One = new ExpirationAmount("One", "Stacks will be reduced by one.");
/**
 * Different trigger points for decreasing status effects.
 */
export class ExpirationTrigger extends EnumType {
}
/** Expiration triggers at the end of the entitie's turn. */
ExpirationTrigger.TurnEnd = new ExpirationTrigger("Turn end", "Expiration triggers at the end of the entitie's turn.");
/** Expiration triggers when the status effect is activated. */
ExpirationTrigger.Move = new ExpirationTrigger("Move", "Expiration triggers when the entity changes position.");
/** Expiration triggers when the entity takes any damage. */
ExpirationTrigger.DamageTaken = new ExpirationTrigger("Damage taken", "Expiration triggers when the entity takes any damage.");
/** Expiration triggers when the entity is targeted by an attack. */
ExpirationTrigger.Attacked = new ExpirationTrigger("Attacked", "Expiration triggers when the entity is targeted by an attack.");
/** Expiration triggers when the entity makes an attack. */
ExpirationTrigger.Attacking = new ExpirationTrigger("Attacking", "Expiration triggers when the entity makes an attack.");
/** Expiration triggers when the entity makes an attack. */
ExpirationTrigger.StatusApplied = new ExpirationTrigger("Status applied", "Expiration triggers when another status is applied on the entity.");
/** No expiration occurs. */
ExpirationTrigger.None = new ExpirationTrigger("None", "No expiration occurs.");
/**
 * All the different status effects.
 */
export class StatusType extends EnumType {
}
/** Increases damage of physical attacks by the stack amount times two. */
StatusType.Rage = new StatusType("Rage", "Increases damage of the next offensive skill by the stack amount times two.");
/** Prevents the stack amount of block from expiring next turn. */
StatusType.OnGuard = new StatusType("On guard", "Prevents the stack amount of block from expiring next turn.");
/**
 * Collection of common rarity descriptors.
 */
export class RarityText {
}
RarityText.Broken = "broken";
RarityText.Common = "common";
RarityText.Uncommon = "uncommon";
RarityText.Rare = "rare";
RarityText.Unique = "unique";
/**
 * Collection of common item categories.
 */
export class CategoryText {
}
CategoryText.Material = "material";
CategoryText.Currency = "currency";
CategoryText.Book = "book";
CategoryText.Equipment = "equipment";
/**
 * Collection of common Descriptions.
 */
export class NoteText {
}
NoteText.Book = "Read to gain its benefits.";
NoteText.Currency = "Spend it somewhere.";
NoteText.Material = "Used in recipes.";
//# sourceMappingURL=enum.js.map