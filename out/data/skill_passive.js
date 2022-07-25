import { DataCollection, DataTemplate } from "../common/base_classes.js";
import { ResultType } from "../common/enum.js";
import { EmptyPassiveSkill, FixedValueCombatPassive } from "./skill_template.js";
/**
 * Skills that provide passive bonuses.
 */
export class PassiveSkill extends DataTemplate {
    /**
     * Creates a new active skill entry.
     * @param id ID of the skill.
     * @param name Name of the skill.
     * @param desc Note of the skill.
     * @param skill Skill implementation that outputs a result based on the combat state.
     * @param cooldown Number of turns of cooldown after use.
     * @param useCount Number of times this skill can be used in total. -1 for infinite.
     * @param turnLimit Number of times this skill can be used per turn. -1 for infinite. */
    constructor(id, skill, name, desc, cooldown, useCount, turnLimit) {
        super(id, name, desc);
        this.Skill = skill !== null && skill !== void 0 ? skill : new EmptyPassiveSkill();
        this.Cooldown = cooldown !== null && cooldown !== void 0 ? cooldown : 0;
        this.UseCount = useCount !== null && useCount !== void 0 ? useCount : 0;
        this.TurnLimit = turnLimit !== null && turnLimit !== void 0 ? turnLimit : 0;
    }
}
//#region Passive skill entries
/** Basic 2 block passive */
PassiveSkill.ID_0000_FlimsyArmor = new PassiveSkill(0, new FixedValueCombatPassive(2, ResultType.Block), "Flimsy armor", "Block 2 damage every turn.", 0, -1);
//#endregion
/** The list of all passive skills. */
PassiveSkill.List = new DataCollection([
    PassiveSkill.ID_0000_FlimsyArmor
]);
//# sourceMappingURL=skill_passive.js.map