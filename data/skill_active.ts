import { DataTemplate } from "../common/base_classes.js";
import { SkillTarget, ResultType } from "../common/enum.js";
import { ActiveSkillTemplate, FixedValueSkill } from "./skill_template.js";

/**
 * List of skills used in the battle simulator.
 */
export class ActiveSkill extends DataTemplate {
    //#region
    /** Basic 6 damage skill, 10 cost. */
    static ID_0000_Strike = new ActiveSkill(0, new FixedValueSkill(6, ResultType.Damage), "Strike", "Strike the frontmost enemy for 6 damage.", 5, [SkillTarget.EnemyFront], 1, 0 ,3);
    //#endregion

    /** List of active skills. */
    static List: ActiveSkill[] = [
        ActiveSkill.ID_0000_Strike
    ]

    /**
     * Fetches the skill by its ID from the list.
     * @param id The ID of the data entry to return.
     * @returns An active skill.
     */
    static get_by_id (id: number): ActiveSkill {
        return this.List.find(skill => skill.ID == id) ?? new ActiveSkill(id);
    }

    //#region 
    /** Name of the skill. */
    declare Name: string;
    /** Description of the skill. */
    declare Description: string;
    /** Initial strength cost of the skill. */
    BaseCost: number;
    /** Skill implementation that outputs a result based on the combat state. */
    Skill: ActiveSkillTemplate;
    /** List of valid targets for this skill. */
    Targeting: SkillTarget[];
    /** Number of selectable targets allowed. */
    TargetCount: number;
    /** Number of turns of cooldown after use. */
    Cooldown: number;
    /** Number of times this skill can be used per turn. */
    UseCount: number;

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
    constructor(id: number, skill?: ActiveSkillTemplate, name?: string, desc?: string, cost?: number, targeting?: SkillTarget[], targetcount?: number, cooldown?: number, usecount?: number) {
        super(id, name ?? "Undefined", desc ?? "This is as mysterious as it gets.");
        this.BaseCost = cost ?? 5;
        this.Skill = skill ?? new FixedValueSkill(6, ResultType.Damage);
        this.Targeting = targeting ?? [SkillTarget.EnemyFront];
        this.TargetCount = targetcount ?? 1;
        this.Cooldown = cooldown ?? 0;
        this.UseCount = usecount ?? 3;
    }
    //#endregion
}