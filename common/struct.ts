import { Item } from "../entity_classes/item.js";
import { ActiveSkill } from "../entity_classes/skill_active.js";
import { PassiveSkill } from "../entity_classes/skill_passive.js";
import { ItemInstance } from "../entity_instance/item.js";
import { Flag } from "./flag.js";

/** Grouping of all kinds of different things. */
export class StateRequirement {
    /** Requirement of having particular items in your inventory. */
    Items: ItemInstance[];
    /** Requirement of having set specific flags. */
    Flags: Flag[];
}

/**
 * Grouping of skills and level requirements.
 */
export class SkillLevelRequirement {
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

/**
 * Grouping of item and drop probability.
 */
export class ItemDrop {
    /** The item in question. */
    Item: Item;
    /** The amount of stacks that drops from this. */
    Amount: number;
    /** The dropweight of the item compared to others. */
    Weight: number;

    /**
     * Creates a new item drop.
     * @param amount The amount of stacks that drops from this.
     * @param item The item in question.
     * @param weight The dropweight of the item compared to others.
     */
    constructor(item: Item, amount: number, weight: number) {
        this.Item = item;
        this.Amount = amount;
        this.Weight = weight;
    }
}

/**
 * Defines the position of a party in the game, on the map and inside dungeons.
 */
export class Position {
    /** The ID of the current map. */
    MapID: number;
    /** The X position on the current map. */
    XPos: number;
    /** The Y position on the current map. */
    YPos: number;

    /**
     * Creates a new position.
     * @param x The X position on the current map.
     * @param y The Y position on the current map.
     */
    constructor (x: number, y: number) {
        this.XPos = x;
        this.YPos = y;
    }
}