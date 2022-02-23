import { CombatActor } from "./combat_entity.js";
import { CombatState } from "./combat_state.js";

/**
 * Evaluates the targetlist based on the current combat state and returns an updated list.
 * @param targets The current list of targets as desired by a skill.
 * @param combatstate The current combat state.
 */
function evaluate_targets (targets: CombatActor[], combatstate: CombatState): CombatActor[] {
    // TODO: implement
    return targets;
}