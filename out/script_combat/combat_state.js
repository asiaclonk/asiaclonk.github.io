/**
 * An isolated instance of combat.
 */
export class CombatState {
    /**
     * Create a new combat state and start fighting!
     */
    constructor(players, enemies) {
        this._active = false;
        this.BasePlayers = players;
        this.BaseEnemies = enemies;
    }
    /**
     * Populates the runtime variables with the initial state.
     */
    start() {
        this._active = true;
        this.Players = JSON.parse(JSON.stringify(this.BasePlayers));
        this.Enemies = JSON.parse(JSON.stringify(this.BaseEnemies));
    }
    /**
     * Adds the result to the log and applies it to the current state.
     * @param result The new combat result to add to this state.
     */
    addResult(result) {
        if (!this._active) {
            console.log('Combat not active.');
            return;
        }
        this.CombatLog.push(result);
    }
    /**
     * Clears the runtime variables.
     */
    reset() {
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
//# sourceMappingURL=combat_state.js.map