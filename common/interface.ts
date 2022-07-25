import { CombatResultPart } from "../entity_combat/combat_result.js";
import { CombatActor } from "../entity_combat/combat_actor.js";
import { CombatState } from "../script_combat/combat_state.js";
import { EventType } from "./enum.js";

/**
 * Interface for skills that produce results.
 */
export interface ActiveSkillTemplate {
    /**
     * Generates a list of skill result parts.
     * @param actor The user of this skill.
     * @param targets A list of targets that were determined by the skill's targeting type or user selection.
     * @param combatState The current state of the battle.
     */
    result(actor: CombatActor, targets: CombatActor[], combatState: CombatState): CombatResultPart[];
}

/**
 * Interface for skills that provide passive bonuses.
 */
export interface PassiveSkillTemplate {
    /**
     * Creates effects as a response to a result caused by someone.
     * @param actor The user of this skill.
     * @param result A list of combat results that this passive skill is reacting to.
     * @param combatState The current state of the battle.
     */
    triggerOnAction(actor: CombatActor, result: CombatResultPart[], combatState: CombatState): CombatResultPart[];

    /**
     * Creates effects at the end of turn, including before the first turn of battle. (turn 0)
     * @param actor The user of this skill.
     * @param combatState The current state of the battle.
     */
    triggerOnTurn(actor: CombatActor, combatState: CombatState): CombatResultPart[];

    /**
     * Creates effects on every tick in the overworld.
     */
    triggerOnTick(): void;
    
    /**
     * Creates effects in response to events.
     * @param event 
     */
    triggerOnEvent(event: GameEvent): void;
}

/**
 * Interface of events for passive skills and game systems to react to.
 */
export interface GameEvent {
    /** The type of event that this instance represents. */
    EventType: EventType;
    /** The sender of this event. */
    Sender: any;
}