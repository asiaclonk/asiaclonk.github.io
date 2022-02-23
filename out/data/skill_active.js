import { DataTemplate } from "../common/base_classes.js";
import { SkillTarget, ResultType } from "../common/enum.js";
import { FixedValueSkill } from "./skill_template.js";
/**
 * List of skills used in the battle simulator.
 */
export class ActiveSkill extends DataTemplate {
    /**
     * Constructor for this list of skills.
     * @param id ID of the skill.
     * @param name Name of the skill.
     * @param desc Description of the skill.
     * @param cost Initial strength cost of the skill.
     * @param skill Skill implementation that outputs a result based on the combat state.
     * @param targeting List of valid targets for this skill.
     * @param targetcount Number of selectable targets allowed.
     * @param cooldown Number of turns of cooldown after use.
     * @param usecount Number of times this skill can be used per turn. */
    constructor(id, skill, name, desc, cost, targeting, targetcount, cooldown, usecount) {
        super(id, name !== null && name !== void 0 ? name : "Undefined", desc !== null && desc !== void 0 ? desc : "This is as mysterious as it gets.");
        this.BaseCost = cost !== null && cost !== void 0 ? cost : 5;
        this.Skill = skill !== null && skill !== void 0 ? skill : new FixedValueSkill(6, ResultType.Damage);
        this.Targeting = targeting !== null && targeting !== void 0 ? targeting : [SkillTarget.EnemyFront];
        this.TargetCount = targetcount !== null && targetcount !== void 0 ? targetcount : 1;
        this.Cooldown = cooldown !== null && cooldown !== void 0 ? cooldown : 0;
        this.UseCount = usecount !== null && usecount !== void 0 ? usecount : 3;
    }
    /**
     * Fetches the skill by its ID from the list.
     * @param id The ID of the data entry to return.
     * @returns An active skill.
     */
    static get_by_id(id) {
        var _a;
        return (_a = this.List.find(skill => skill.ID == id)) !== null && _a !== void 0 ? _a : new ActiveSkill(id);
    }
}
//#region
/** Basic 6 damage skill, 10 cost. */
ActiveSkill.ID_0000_Strike = new ActiveSkill(0, new FixedValueSkill(6, ResultType.Damage), "Strike", "Strike the frontmost enemy for 6 damage.", 5, [SkillTarget.EnemyFront], 1, 0, 3);
//#endregion
/** List of active skills. */
ActiveSkill.List = [
    ActiveSkill.ID_0000_Strike
];
//# sourceMappingURL=skill_active.js.map