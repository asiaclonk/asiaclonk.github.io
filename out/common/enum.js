import { EnumType } from "./base_classes";
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
export class SkillTarget extends EnumType {
}
/**
 * @type {SkillTarget} Front player character.
 */
SkillTarget.PlayerFront = new SkillTarget("Front player character", "The player character at the front of your party.");
/**
 * @type {SkillTarget} Back player character.
 */
SkillTarget.PlayerBack = new SkillTarget("Back player character", "The player character at the back of your party.");
/**
 * @type {SkillTarget} Front enemy character.
 */
SkillTarget.EnemyFront = new SkillTarget("Front enemy character", "The enemy character at the front of their party.");
/**
 * @type {SkillTarget} Back enemy character.
 */
SkillTarget.EnemyBack = new SkillTarget("Back enemy character", "The enemy character at the back of their party.");
/**
 * @type {SkillTarget} Any character.
 */
SkillTarget.Any = new SkillTarget("Any character", "Any character.");
/**
 * @type {SkillTarget} Any player character.
 */
SkillTarget.PlayerAny = new SkillTarget("Any player character", "Any player character in your party.");
/**
 * @type {SkillTarget} Any single target.
 */
SkillTarget.EnemyAny = new SkillTarget("Any enemy character", "Any enemy character in their party.");
/**
* @type {SkillTarget} The entire player party.
*/
SkillTarget.PlayerParty = new SkillTarget("Player party", "The entire player party.");
/**
 * @type {SkillTarget} The entire enemy party.
 */
SkillTarget.EnemyParty = new SkillTarget("Enemy party", "The entire enemy party.");
/**
 * @type {SkillTarget} True random.
 */
SkillTarget.Random = new SkillTarget("Random", "A random player or enemy character.");
/**
 * @type {SkillTarget} Random player character.
 */
SkillTarget.PlayerRandom = new SkillTarget("Random player character", "A random player character.");
/**
 * @type {SkillTarget} Random enemy character.
 */
SkillTarget.EnemyRandom = new SkillTarget("Random enemy character", "A random enemy character.");
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
//# sourceMappingURL=enum.js.map