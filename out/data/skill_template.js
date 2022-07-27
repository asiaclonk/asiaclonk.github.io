// Collection of generic skills for ease of reuse
import { CombatResultPart } from "../entity_combat/combat_result.js";
/** Empty skill effect */
export class EmptyActiveSkill {
    constructor() { }
    result(_actor, _targets, _combatState) {
        return [];
    }
}
/** Simple skill to apply a single fixed value. */
export class FixedValueSkill {
    /**
     * Simple skill to apply a single fixed value.
     * @param value Fixed value of this skill. Either a number or a list of status effects.
     * @param type Type of effect that this skill has.
     */
    constructor(value, type) {
        this._fixedValue = value;
        this._type = type;
    }
    result(actor, targets, _combatstate) {
        return [new CombatResultPart(actor, this._type, this._fixedValue, targets)];
    }
}
/** Empty passive effect */
export class EmptyPassiveSkill {
    constructor() { }
    triggerOnAction(_actor, _result, _combatState) {
        return [];
    }
    triggerOnTurn(_actor, _combatState) {
        return [];
    }
    triggerOnTick() {
        return [];
    }
    triggerOnEvent(_event) {
        return;
    }
}
/** Simple passive to provide status effects. */
export class FixedValueCombatPassive {
    /**
     * Simple passive to provide status effects.
     * @param value Fixed value of this skill. Either a number or a list of status effects.
     * @param type Type of effect that this skill has.
     */
    constructor(value, type) {
        this._fixedValue = value;
        this._type = type;
    }
    triggerOnAction(_actor, _result, _combatstate) {
        return [];
    }
    triggerOnTurn(actor, _combatstate) {
        return [new CombatResultPart(actor, this._type, this._fixedValue, [actor])];
    }
    triggerOnTick() {
        return;
    }
    triggerOnEvent(_event) {
        return;
    }
}
//# sourceMappingURL=skill_template.js.map