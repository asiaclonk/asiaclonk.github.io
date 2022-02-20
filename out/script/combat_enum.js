import { EnumType } from "../common/base_classes.js";
/**
 * Collection of types of possible action results.
 */
export class ResultType extends EnumType {
}
/**
 * The acting entity is dealing damage.
 */
ResultType.Damage = new ResultType("Damage", "The acting entity is dealing damage.");
/**
 * The acting entity is applying block.
 */
ResultType.Block = new ResultType("Block", "The acting entity is applying block.");
/**
 * The acting entity is recovering health.
 */
ResultType.Heal = new ResultType("Heal", "The acting entity is recovering health.");
/**
 * The acting entity is applying a status effect on a target.
 */
ResultType.Status = new ResultType("Status", "The acting entity is applying a status effect on a target.");
/**
 * The acting entity is removing a status effect from a target.
 */
ResultType.Cleanse = new ResultType("Cleanse", "The acting entity is removing a status effect from a target.");
/**
 * Collection of possible targets for skill targeting descriptions.
 */
export class ResultTarget extends EnumType {
}
/**
 * @type {ResultTarget} Front player character.
 */
ResultTarget.PlayerFront = new ResultTarget("Front player character", "The player character at the front of your party.");
/**
 * @type {ResultTarget} Back player character.
 */
ResultTarget.PlayerBack = new ResultTarget("Back player character", "The player character at the back of your party.");
/**
 * @type {ResultTarget} Front enemy character.
 */
ResultTarget.EnemyFront = new ResultTarget("Front enemy character", "The enemy character at the front of their party.");
/**
 * @type {ResultTarget} Back enemy character.
 */
ResultTarget.EnemyBack = new ResultTarget("Back enemy character", "The enemy character at the back of their party.");
/**
 * @type {ResultTarget} Any character. Skill description only.
 */
ResultTarget.Any = new ResultTarget("Any character", "Any character.");
/**
 * @type {ResultTarget} Any player character. Skill description only.
 */
ResultTarget.PlayerAny = new ResultTarget("Any player character", "Any player character in your party.");
/**
 * @type {ResultTarget} Any single target. Skill description only.
 */
ResultTarget.EnemyAny = new ResultTarget("Any enemy character", "Any enemy character in their party.");
/**
* @type {ResultTarget} The entire player party. Skill description only.
*/
ResultTarget.PlayerParty = new ResultTarget("Player party", "The entire player party.");
/**
 * @type {ResultTarget} The entire enemy party. Skill description only.
 */
ResultTarget.EnemyParty = new ResultTarget("Enemy party", "The entire enemy party.");
/**
 * @type {ResultTarget} True random. Skill description only.
 */
ResultTarget.Random = new ResultTarget("Random", "A random player or enemy character.");
/**
 * @type {ResultTarget} Random player character. Skill description only.
 */
ResultTarget.PlayerRandom = new ResultTarget("Random player character", "A random player character.");
/**
 * @type {ResultTarget} Random enemy character. Skill description only.
 */
ResultTarget.EnemyRandom = new ResultTarget("Random enemy character", "A random enemy character.");
/**
 * Different attributes that a skill might have.
 */
export class SkillTag extends EnumType {
}
/**
 * @type {SkillTag} Adjacant entities will be affected by 50% of the skill.
 */
SkillTag.Splash = new SkillTag("Splash", "Adjacant entities will be affected by 50% of the skill.");
/**
 * @type {SkillTag} The main target switches places with the entity behind them.
 */
SkillTag.Push = new SkillTag("Push", "The main target switches places with the entity behind them.");
/**
 * @type {SkillTag} The main target switches places with the entity in front of them.
 */
SkillTag.Pull = new SkillTag("Pull", "The main target switches places with the entity in front of them.");
/**
 * Different amounts that a status can decrease by.
 */
export class ExpirationAmount extends EnumType {
}
/**
 * @type {ExpirationAmount} All stacks will be lost.
 */
ExpirationAmount.All = new ExpirationAmount("All", "All stacks will be lost.");
/**
 * @type {ExpirationAmount} Stacks will not expire.
 */
ExpirationAmount.None = new ExpirationAmount("None", "Stacks will not expire.");
/**
 * @type {ExpirationAmount} Half of the stacks will be lost.
 */
ExpirationAmount.Half = new ExpirationAmount("Half", "Half of the stacks will be lost.");
/**
 * @type {ExpirationAmount} Stacks will be reduced by one.
 */
ExpirationAmount.One = new ExpirationAmount("One", "Stacks will be reduced by one.");
/**
 * Different trigger points for decreasing status effects.
 */
export class ExpirationTrigger extends EnumType {
}
/**
 * @type {ExpirationTrigger} Expiration triggers at the end of the entitie's turn.
 */
ExpirationTrigger.TurnEnd = new ExpirationTrigger("Turn end", "Expiration triggers at the end of the entitie's turn.");
/**
 * @type {ExpirationTrigger} Expiration triggers when the status effect is activated.
 */
ExpirationTrigger.Move = new ExpirationTrigger("Move", "Expiration triggers when the entity changes position.");
/**
 * @type {ExpirationTrigger} Expiration triggers when the entity takes any damage.
 */
ExpirationTrigger.DamageTaken = new ExpirationTrigger("Damage taken", "Expiration triggers when the entity takes any damage.");
/**
 * @type {ExpirationTrigger} Expiration triggers when the entity is targeted by an attack.
 */
ExpirationTrigger.Attacked = new ExpirationTrigger("Attacked", "Expiration triggers when the entity is targeted by an attack.");
/**
 * @type {ExpirationTrigger} Expiration triggers when the entity makes an attack.
 */
ExpirationTrigger.Attacking = new ExpirationTrigger("Attacking", "Expiration triggers when the entity makes an attack.");
/**
 * @type {ExpirationTrigger} Expiration triggers when the entity makes an attack.
 */
ExpirationTrigger.StatusApplied = new ExpirationTrigger("Status applied", "Expiration triggers when another status is applied on the entity.");
/**
* @type {ExpirationTrigger} No expiration occurs.
*/
ExpirationTrigger.None = new ExpirationTrigger("None", "No expiration occurs.");
/**
 * All the different status effects.
 */
export class StatusType extends EnumType {
}
/**
 * @type {StatusType} Increases damage of physical attacks by the stack amount times two. Lost on activation.
 */
StatusType.Rage = new StatusType("Rage", "Increases damage of the next attack by the stack amount times two.");
/**
 * @type {StatusType} Prevents the stack amount of block from expiring next turn.
 */
StatusType.OnGuard = new StatusType("On guard", "Prevents the stack amount of block from expiring next turn.");
//# sourceMappingURL=combat_enum.js.map