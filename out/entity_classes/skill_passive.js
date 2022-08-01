import { DataTemplate } from '../common/base_classes.js';
import { EmptyPassiveSkill } from '../data/skill_template.js';
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
//# sourceMappingURL=skill_passive.js.map