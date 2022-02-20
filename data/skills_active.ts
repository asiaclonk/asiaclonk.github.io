import { DataTemplate, DataType } from "../common/base_classes.js";
import { CombatActor, ResultPart } from "../script/combat_entity.js";
import { ResultType } from "../script/combat_enum.js";
import { CombatState } from "../script/combat_state.js";

/**
 * A function type that should take an actor, the state of combat and return a list of result parts.
 */
type SkillAction = (actor: CombatActor, state: CombatState) => ResultPart[];

/**
 * List of skills used in the battle simulator.
 */
export class ActiveSkill extends DataTemplate {
    //#region
    /**
     * Basic 6 damage skill, 10 cost.
     */
    static ID_0000_Strike: ActiveSkill = new ActiveSkill (0, "Strike", "Strike the frontmost enemy for 6 damage.", 10,
    function (actor, combatstate) {
        return [new ResultPart(actor, ResultType.Damage, 6, [combatstate.Enemies[0]])];
    })
    //#endregion
    //#region 
    /**
     * Name of the skill.
     */
    declare Name: string
    /**
     * Description of the skill.
     */
    declare Description: string
    /**
     * Strength cost of the skill.
     */
    Cost: number
    /**
     * The function that defines the outcome of this skill when used on entities.
     */
    Function: SkillAction

    /**
     * Constructor for this list of skills.
     * @param id ID of the skill.
     * @param name Name of the skill.
     * @param desc Description of the skill.
     * @param cost Strength cost of the skill.
     * @param func Function that takes an actor and combat state while returning an ActionResult.
     */
    constructor (id: number, name: string, desc: string, cost: number, func: SkillAction) {
        super(id, name, desc, DataType.ActiveSkill);
        this.Cost = cost;
        this.Function = func;
    }
    //#endregion
}