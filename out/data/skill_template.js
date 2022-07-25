// Collection of generic skills for ease of reuse
import { ResultPart } from "../entity_combat/action_result.js";
/** Empty skill effect */
export class EmptyActiveSkill {
    constructor() { }
    result(actor, targets, combatState) {
        return [];
    }
}
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
    result(actor, targets, combatstate) {
        return [new ResultPart(actor, this._type, this._fixedValue, targets)];
    }
}
/** Empty passive effect */
export class EmptyPassiveSkill {
    constructor() { }
    trigger_combat_act(actor, result, combatState) {
        return [];
    }
    trigger_combat_turn(actor, combatState) {
        return [];
    }
    trigger_world_tick() {
        return [];
    }
}
/** Simple passive to provide status effects at the start of combat. */
export class FixedValueCombatPassive {
    /**
     * Simple passive to provide status effects at the start of combat.
     * @param value Fixed value of this skill. Either a number or a list of status effects.
     * @param type Type of effect that this skill has.
     */
    constructor(value, type) {
        this._fixedValue = value;
        this._type = type;
    }
    trigger_combat_act(actor, result, combatstate) {
        return [];
    }
    trigger_combat_turn(actor, combatstate) {
        return [new ResultPart(actor, this._type, this._fixedValue, [actor])];
    }
    trigger_world_tick() {
        return [];
    }
}
//# sourceMappingURL=skill_template.js.map