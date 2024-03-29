import { DataTemplate } from '../common/base_classes.js';
import { SkillTarget } from '../common/enum.js';
import { ActiveSkillTemplate, PassiveSkillTemplate } from '../common/interface.js';
import { EmptyActiveSkill, EmptyPassiveSkill } from '../data/skill_template.js';

/**
 * Skills used in the battle simulator.
 */
export class ActiveSkill extends DataTemplate {
    /** The initial strength cost of the skill. */
    BaseCost: number;
    /** The skill implementation that outputs a result based on the combat state. */
    Skill: ActiveSkillTemplate;
    /** The list of valid targets for this skill. */
    Targeting: SkillTarget[];
    /** The number of selectable targets allowed, for use with targeting types where the user can select. */
    TargetCount: number;
    /** The number of turns of cooldown after use. */
    Cooldown: number;
    /** The number of times this skill can be used in total. -1 for infinite. */
    UseCount: number;
    /** The number of times this skill can be used per turn. -1 for infinite. */
    TurnLimit: number;

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
    constructor(id: number, skill?: ActiveSkillTemplate, name?: string, desc?: string, lore?: string, icon?: string, cost?: number, targeting?: SkillTarget[], targetCount?: number, cooldown?: number, useCount?: number, turnLimit?: number) {
        super(id, name, desc, lore, icon);
        this.BaseCost = cost ?? 0;
        this.Skill = skill ?? new EmptyActiveSkill();
        this.Targeting = targeting ?? [SkillTarget.None];
        this.TargetCount = targetCount ?? 0;
        this.Cooldown = cooldown ?? 0;
        this.UseCount = useCount ?? 0;
        this.TurnLimit = turnLimit ?? 0;
    }
}

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