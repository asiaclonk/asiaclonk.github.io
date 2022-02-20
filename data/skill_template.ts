// Collection of generic skills for ease of reuse

import { DataTemplate } from "../common/base_classes";
import { ResultType } from "../common/enum";
import { CombatActor, ResultPart, Status } from "../script/combat_entity";
import { CombatState } from "../script/combat_state";

/**
 * Interface for skills that produce results.
 */
export interface ActiveSkillTemplate {
    /** Generates a list of skill result parts */
    Result(actor: CombatActor, targets: CombatActor[], combatstate: CombatState): ResultPart[];
}

/** Simple skill to apply fixed values. */
export class FixedValueSkill implements ActiveSkillTemplate {
    private _fixedValue: number | Status[];
    private _type: ResultType;

    /**
     * Simple skill to apply fixed values.
     * @param value Fixed value of this skill. Either a number or a list of status effects.
     * @param type Type of effect that this skill has.
     */
    constructor (value: number | Status[], type: ResultType) {
        this._fixedValue = value;
        this._type = type;
    }

    Result(actor: CombatActor, targets: CombatActor[], combatstate: CombatState): ResultPart[] {
        var newtargets = evaluate_targets(targets, combatstate);
        return [new ResultPart(actor, this._type, this._fixedValue, newtargets)];
    }
}

/**
 * Evaluates the targetlist based on the current combat state and returns an updated list of targets with target changing effects taken into account.
 * @param targets The current list of targets as desired by a skill.
 * @param combatstate The current combat state.
 */
function evaluate_targets (targets: CombatActor[], combatstate: CombatState): CombatActor[] {
    throw new Error("Method not implemented.");
}