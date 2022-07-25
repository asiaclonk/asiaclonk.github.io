/**
 * Instanced VTubers and enemies for use in the battle simulator.
 */
export class CombatActor {
    /**
     * Creates a new CombatActor.
     * @param name The display name of this actor.
     * @param str Strength of this CombatActor.
     */
    constructor(name, str) {
        this.Name = name;
        this.BaseStrength = str;
        this.Strength = str;
        this.MaxHealth = str;
        this.Health = str;
        this.Status = [];
    }
}
//# sourceMappingURL=combat_actor.js.map