// Collection of generic skills for ease of reuse
import { ResultPart } from "../script/combat_entity";
/** Simple skill to apply fixed values. */
export class FixedValueSkill {
    /**
     * Simple skill to apply fixed values.
     * @param value Fixed value of this skill. Either a number or a list of status effects.
     * @param type Type of effect that this skill has.
     */
    constructor(value, type) {
        this._fixedValue = value;
        this._type = type;
    }
    Result(actor, targets, combatstate) {
        var newtargets = evaluate_targets(targets, combatstate);
        return [new ResultPart(actor, this._type, this._fixedValue, newtargets)];
    }
}
/**
 * Evaluates the targetlist based on the current combat state and returns an updated list of targets with target changing effects taken into account.
 * @param targets The current list of targets as desired by a skill.
 * @param combatstate The current combat state.
 */
function evaluate_targets(targets, combatstate) {
    throw new Error("Method not implemented.");
}
//# sourceMappingURL=skill_template.js.map