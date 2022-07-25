import { ActiveSkillTemplate } from "../common/interface.js";
import { CombatActor } from "../entity_combat/combat_actor.js";
import { CombatState } from "./combat_state.js";

export class CombatSimulator {
    /**
     * Evaluates the targetlist based on the current combat state and returns an updated list.
     * @param aggressor The entity that is about to act.
     * @param skill The skill that is about to be used.
     * @param targets The current list of targets as desired by the skill.
     * @param combatState The state on which to make an informed decision.
     * @returns An updated list of targets as a result of the current combat state.
     */
    static evaluate_targets (aggressor: CombatActor, skill: ActiveSkillTemplate, targets: CombatActor[], combatState: CombatState): CombatActor[] {
        // TODO: implement
        return targets;
    }
}

