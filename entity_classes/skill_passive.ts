import { DataTemplate } from '../common/base_classes.js';
import { PassiveSkillTemplate } from '../common/interface.js';
import { EmptyPassiveSkill } from '../data/skill_template.js';

/**
 * Skills that provide passive bonuses.
 */
export class PassiveSkill extends DataTemplate {
    /** Skill implementation that outputs results based on the combat state. */
    Skill: PassiveSkillTemplate;
    /** Number of turns of cooldown after use. */
    Cooldown: number;
    /** Number of times this skill can be used in total. -1 for infinite. */
    UseCount: number;
    /** Number of times this skill can be used per turn. -1 for infinite. */
    TurnLimit: number;

    /**
     * Creates a new active skill entry.
     * @param id ID of the skill.
     * @param name Name of the skill.
     * @param desc Note of the skill.
     * @param skill Skill implementation that outputs a result based on the combat state.
     * @param cooldown Number of turns of cooldown after use.
     * @param useCount Number of times this skill can be used in total. -1 for infinite.
     * @param turnLimit Number of times this skill can be used per turn. -1 for infinite. */
    constructor(id: number, skill?: PassiveSkillTemplate, name?: string, desc?: string, cooldown?: number, useCount?: number, turnLimit?: number) {
        super(id, name, desc);
        this.Skill = skill ?? new EmptyPassiveSkill();
        this.Cooldown = cooldown ?? 0;
        this.UseCount = useCount ?? 0;
        this.TurnLimit = turnLimit ?? 0;
    }
}