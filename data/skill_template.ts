// Collection of generic skills for ease of reuse

import { ResultType, SkillTarget } from "../common/enum.js";
import { ActiveSkillTemplate, GameEvent, PassiveSkillTemplate } from "../common/interface.js";
import { CombatResultPart } from "../entity_combat/combat_result.js";
import { CombatActor } from "../entity_combat/combat_actor.js";
import { Status } from "../entity_combat/combat_status.js";
import { CombatState } from "../script_combat/combat_state.js";

/** Empty skill effect */
export class EmptyActiveSkill implements ActiveSkillTemplate {
    constructor() {}
    result(_actor: CombatActor, _targets: CombatActor[], _combatState: CombatState): CombatResultPart[] {
        return [];
    }
}

/** Simple skill to apply a single fixed value. */
export class FixedValueSkill implements ActiveSkillTemplate {
    private _fixedValue: number | Status[];
    private _type: ResultType;

    /**
     * Simple skill to apply a single fixed value.
     * @param value Fixed value of this skill. Either a number or a list of status effects.
     * @param type Type of effect that this skill has.
     */
    constructor (value: number | Status[], type: ResultType) {
        this._fixedValue = value;
        this._type = type;
    }

    result(actor: CombatActor, targets: CombatActor[], _combatstate: CombatState): CombatResultPart[] {
        return [new CombatResultPart(actor, this._type, this._fixedValue, targets)];
    }
}

/** Empty passive effect */
export class EmptyPassiveSkill implements PassiveSkillTemplate {
    constructor() {}
    triggerOnAction(_actor: CombatActor, _result: CombatResultPart[], _combatState: CombatState): CombatResultPart[] {
        return [];
    }
    triggerOnTurn(_actor: CombatActor, _combatState: CombatState): CombatResultPart[] {
        return [];
    }
    triggerOnTick() {
        return [];
    }
}

/** Simple passive to provide status effects. */
export class FixedValueCombatPassive implements PassiveSkillTemplate {
    private _fixedValue: number | Status[];
    private _type: ResultType;
    private _targets: SkillTarget;

    /**
     * Simple passive to provide status effects.
     * @param value Fixed value of this skill. Either a number or a list of status effects.
     * @param type Type of effect that this skill has.
     */
    constructor (value: number | Status[], type: ResultType) {
        this._fixedValue = value;
        this._type = type;
    }

    triggerOnAction(_actor: CombatActor, _result: CombatResultPart[], _combatstate: CombatState): CombatResultPart[] {
        return [];
    }
    triggerOnTurn(actor: CombatActor, _combatstate: CombatState): CombatResultPart[] {
        return [new CombatResultPart(actor, this._type, this._fixedValue, [actor])];
    }
    triggerOnTick(): void {
        return;
    }
    triggerOnEvent(_event: GameEvent): void {
        return;
    }
}