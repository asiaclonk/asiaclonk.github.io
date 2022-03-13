import { Status } from "./status.js";

/**
 * Instanced VTubers and enemies for use in the battle simulator.
 */
export class CombatActor {
    /** The display name of this actor. */
    Name: string;
    /** The base strength of this actor, including equipment. This also acts as their base maximum health. */
    BaseStrength: number;
    /** The current strength of this actor, including status effects. This is used each turn to allocate usable skills. */
    Strength: number;
    /** The current maximum health of this actor, including status effects. */
    MaxHealth: number;
    /** The current health of this actor. Actors become incapacitated if it falls to 0. */
    Health: number;
    /** Collection of status effects currently applied to this actor. */
    Status: Status[];

    /**
     * Creates a new CombatActor.
     * @param name The display name of this actor.
     * @param str Strength of this CombatActor.
     */
    constructor (name: string, str: number) {
        this.Name = name;
        this.BaseStrength = str;
        this.Strength = str;
        this.MaxHealth = str;
        this.Health = str;
        this.Status = [];
    }
}

