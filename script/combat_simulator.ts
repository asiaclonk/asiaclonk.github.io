import { CombatActor } from "../entity_combat/combat_actor.js";
import { CombatState } from "./combat_state.js";

/**
 * Evaluates the targetlist based on the current combat state and returns an updated list.
 * @param targets The current list of targets as desired by a skill.
 * @param combatstate The current combat state.
 */
function evaluate_targets (aggressor: CombatActor, targets: CombatActor[], combatstate: CombatState): CombatActor[] {
    // TODO: implement
    return targets;
}