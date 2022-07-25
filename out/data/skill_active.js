import { DataCollection, DataTemplate } from "../common/base_classes.js";
import { SkillTarget, ResultType } from "../common/enum.js";
import { EmptyActiveSkill, FixedValueSkill } from "./skill_template.js";
/**
 * Skills used in the battle simulator.
 */
export class ActiveSkill extends DataTemplate {
    /**
     * Creates a new active skill entry.
     * @param id The ID of this skill.
     * @param name The name of this skill.
     * @param desc The note of this skill.
     * @param lore The flavor text of this skill.
     * @param icon The link to an image that represents this skill.
     * @param cost The initial strength cost of this skill.
     * @param skill The skill implementation that outputs a result based on the combat state.
     * @param targeting The list of valid targets for this skill.
     * @param targetCount The number of selectable targets allowed, for use with targeting types where the user can select.
     * @param cooldown The number of turns of cooldown after use.
     * @param useCount The number of times this skill can be used in total. -1 for infinite.
     * @param turnLimit The number of times this skill can be used per turn. -1 for infinite. */
    constructor(id, skill, name, desc, lore, icon, cost, targeting, targetCount, cooldown, useCount, turnLimit) {
        super(id, name, desc, lore, icon);
        this.BaseCost = cost !== null && cost !== void 0 ? cost : 0;
        this.Skill = skill !== null && skill !== void 0 ? skill : new EmptyActiveSkill();
        this.Targeting = targeting !== null && targeting !== void 0 ? targeting : [SkillTarget.None];
        this.TargetCount = targetCount !== null && targetCount !== void 0 ? targetCount : 0;
        this.Cooldown = cooldown !== null && cooldown !== void 0 ? cooldown : 0;
        this.UseCount = useCount !== null && useCount !== void 0 ? useCount : 0;
        this.TurnLimit = turnLimit !== null && turnLimit !== void 0 ? turnLimit : 0;
    }
}
//#region Active skill entries
/** Basic 6 damage skill. 10 cost. Front only. */
ActiveSkill.ID_0000_InaccurateStrike = new ActiveSkill(0, new FixedValueSkill(6, ResultType.Damage), "Inaccurate Strike", "Strike the frontmost enemy for 6 damage.", "A familiar move for many veteran adventurers, but hard to master for newcomers.", "", 5, [SkillTarget.EnemyFront], 0, 0, -1, 3);
/** Basic 6 damage skill. 10 cost. */
ActiveSkill.ID_0001_Strike = new ActiveSkill(0, new FixedValueSkill(6, ResultType.Damage), "Strike", "Strike any enemy for 6 damage.", "Practice and experience.", "", 8, [SkillTarget.EnemyAny], 0, 0, -1, 3);
//#endregion
/** The list of all active skills. */
ActiveSkill.List = new DataCollection([
    ActiveSkill.ID_0000_InaccurateStrike
]);
//# sourceMappingURL=skill_active.js.map