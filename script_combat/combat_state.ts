import { CombatResult } from "../entity_combat/combat_result.js"
import { CombatActor } from "../entity_combat/combat_actor.js"

/**
 * An isolated instance of combat.
 */
export class CombatState {
    private _active: boolean = false;

    /** Initial list of player characters, for resetting. */
    BasePlayers: CombatActor[]
    /** List of player characters. */
    Players: CombatActor[]
    /** Initial list of enemy characters, for resetting. */
    BaseEnemies: CombatActor[]
    /** List of enemy characters. */
    Enemies: CombatActor[]

    /** List of action results collected so far. Ordered from oldest to newest. */
    CombatLog: CombatResult[]

    /**
     * Create a new combat state and start fighting!
     */
    constructor (players: CombatActor[], enemies: CombatActor[]) {
        this.BasePlayers = players;
        this.BaseEnemies = enemies;
    }

    /**
     * Populates the runtime variables with the initial state.
     */
    start(): void {
        this._active = true;
        this.Players = JSON.parse(JSON.stringify(this.BasePlayers));
        this.Enemies = JSON.parse(JSON.stringify(this.BaseEnemies));
    }

    /**
     * Adds the result to the log and applies it to the current state.
     * @param result The new combat result to add to this state.
     */
    addResult(result: CombatResult): void {
        if (!this._active){
            console.log("Combat not active.");
            return;
        }

        this.CombatLog.push(result);
    }

    /**
     * Clears the runtime variables.
     */
    reset(): void {
        this._active = false;
        this.Players = [];
        this.Enemies = [];
        this.CombatLog = [];
    }
}

/**
 * A command on the timetrack.
 */
class Command {

}