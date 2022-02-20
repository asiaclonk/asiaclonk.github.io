import { CombatActor } from "./combat_entity.js"
import { ActionResult } from "./combat_entity.js"

/**
 * An isolated instance of combat.
 */
export class CombatState {
    /**
     * Initial list of player characters, for resetting. Ordered from front to back.
     */
    BasePlayers: CombatActor[]
    /**
     * List of player characters. Ordered from front to back.
     */
    Players: CombatActor[]
    /**
     * Initial list of enemy characters, for resetting. Ordered from front to back.
     */
    BaseEnemies: CombatActor[]
    /**
     * List of enemy characters. Ordered from front to back.
     */
    Enemies: CombatActor[]

    /**
     * List of action results collected so far. Ordered from oldest to newest.
     */
    CombatLog: ActionResult[]

    /**
     * Create a new combat state and start fighting!
     */
    constructor (players: CombatActor[], enemies: CombatActor[]) {
        this.Players = players;
        this.Enemies = enemies;
    }

    reset() {

    }
}

/**
 * A command on the timetrack.
 */
class Command {

}