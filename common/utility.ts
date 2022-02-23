import { ActiveSkill } from "../data/skill_active.js";
import { PassiveSkill } from "../data/skill_passive.js";

/**
 * Rolls a random integer between a and b, both inclusive.
 * @param a One of the limits.
 * @param b The other limit.
 * @returns A random integer between a and b.
 */
export function random_int(a: number, b: number): number {
    var range = Math.abs(b - a) + 1;
    return Math.min(a, b) + Math.floor(Math.random() * range);
}

/**
 * Rolls a random integer between 0 and max, but not including max.
 * @param max The upper limit.
 * @returns A random integer between 0 and max, not inclusive.
 */
export function random_zerobase(max: number): number {
    return Math.floor(Math.random() * max);
}

/**
 * Object for holding coordinates.
 */
export class Coordinate {
    /** The X position. */
    XPos: number;
    /** The Y position. */
    YPos: number;

    /**
     * Creates a new coordinate.
     * @param x The X position.
     * @param y The Y position.
     */
    constructor (x: number, y: number) {
        this.XPos = x;
        this.YPos = y;
    }
}

/**
 * Object for bundling skills and level requirements.
 */
export class SkillRequirement {
    /** The level requirement for unlocking the accompanying skill. */
    RequiredLevel: number;
    /** The skill being locked behind the level requirement. */
    Skill: ActiveSkill | PassiveSkill;

    /**
     * Creates a new skill with a level requirement.
     * @param requirement The level requirement for unlocking the accompanying skill.
     * @param skill The skill being locked behind the level requirement.
     */
    constructor (requirement: number, skill: ActiveSkill | PassiveSkill) {
        this.RequiredLevel = requirement;
        this.Skill = skill;
    }
}