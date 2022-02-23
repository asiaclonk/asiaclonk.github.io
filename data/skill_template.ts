// Collection of generic skills for ease of reuse

import { ResultType } from "../common/enum.js";
import { ActiveSkillTemplate, PassiveSkillTemplate } from "../common/interface.js";
import { CombatActor, ResultPart, Status } from "../script/combat_entity.js";
import { CombatState } from "../script/combat_state.js";

/** Empty skill effect */
export class EmptyActiveSkill implements ActiveSkillTemplate {
    constructor() {}
    result(actor: CombatActor, targets: CombatActor[], combatState: CombatState): ResultPart[] {
        return [];
    }
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

    result(actor: CombatActor, targets: CombatActor[], combatstate: CombatState): ResultPart[] {
        return [new ResultPart(actor, this._type, this._fixedValue, targets)];
    }
}

/** Empty passive effect */
export class EmptyPassiveSkill implements PassiveSkillTemplate {
    constructor() {}
    trigger_combat_act(actor: CombatActor, result: ResultPart[], combatState: CombatState): ResultPart[] {
        return [];
    }
    trigger_combat_turn(actor: CombatActor, combatState: CombatState): ResultPart[] {
        return [];
    }
    trigger_world_tick() {
        return [];
    }
}

/** Simple passive to provide status effects at the start of combat. */
export class FixedValueCombatPassive implements PassiveSkillTemplate {
    private _fixedValue: number | Status[];
    private _type: ResultType;

    /**
     * Simple passive to provide status effects at the start of combat.
     * @param value Fixed value of this skill. Either a number or a list of status effects.
     * @param type Type of effect that this skill has.
     */
    constructor (value: number | Status[], type: ResultType) {
        this._fixedValue = value;
        this._type = type;
    }

    trigger_combat_act(actor: CombatActor, result: ResultPart[], combatstate: CombatState): ResultPart[] {
        return [];
    }
    trigger_combat_turn(actor: CombatActor, combatstate: CombatState): ResultPart[] {
        return [new ResultPart(actor, this._type, this._fixedValue, [actor])];
    }
    trigger_world_tick() {
        return [];
    }
}