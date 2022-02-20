import { DataTemplate, DataType } from "../common/base_classes.js";
import { ResultPart } from "../script/combat_entity.js";
import { ResultType } from "../script/combat_enum.js";
/**
 * List of skills used in the battle simulator.
 */
export class ActiveSkill extends DataTemplate {
    /**
     * Constructor for this list of skills.
     * @param id ID of the skill.
     * @param name Name of the skill.
     * @param desc Description of the skill.
     * @param cost Strength cost of the skill.
     * @param func Function that takes an actor and combat state while returning an ActionResult.
     */
    constructor(id, name, desc, cost, func) {
        super(id, name, desc, DataType.ActiveSkill);
        this.Cost = cost;
        this.Function = func;
    }
}
//#region
/**
 * Basic 6 damage skill, 10 cost.
 */
ActiveSkill.ID_0000_Strike = new ActiveSkill(0, "Strike", "Strike the frontmost enemy for 6 damage.", 10, function (actor, combatstate) {
    return [new ResultPart(actor, ResultType.Damage, 6, [combatstate.Enemies[0]])];
});
//# sourceMappingURL=skills_active.js.map