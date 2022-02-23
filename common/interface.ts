import { CombatActor, ResultPart } from "../script/combat_entity.js";
import { CombatState } from "../script/combat_state.js";

/**
 * Interface for skills that produce results.
 */
export interface ActiveSkillTemplate {
    /** Generates a list of skill result parts. */
    result(actor: CombatActor, targets: CombatActor[], combatState: CombatState): ResultPart[];
}

/**
 * Interface for skills that provide passive bonuses.
 */
export interface PassiveSkillTemplate {
    /** Creates effects as a response to a result caused by someone. */
    trigger_combat_act(actor: CombatActor, result: ResultPart[], combatState: CombatState): ResultPart[];
    /** Creates effects at the end of turn, including before the first turn of battle. (turn 0) */
    trigger_combat_turn(actor: CombatActor, combatState: CombatState): ResultPart[];
    /** Creates effects on every tick in the overworld. */
    trigger_world_tick(): any; //TODO: implement world results
}