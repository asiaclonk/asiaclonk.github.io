import { Item } from '../entity_classes/item.js';
import { ActiveSkill } from '../entity_classes/skill_active.js';
import { PassiveSkill } from '../entity_classes/skill_passive.js';
import { ItemInstance } from '../entity_instance/item.js';
import { Flag } from './flag.js';

/**
 * Sum function for use in reduce.
 * @param a Summand 1.
 * @param b Summand 2.
 * @returns The sum of a and b.
 */
export function sum(a: number, b: number) {
    return a + b;
}

/**
 * Rolls a random integer between a and b, both inclusive.
 * @param a One of the limits.
 * @param b The other limit.
 * @returns A random integer between a and b.
 */
export function randomInt(a: number, b: number): number {
    var range = Math.abs(b - a) + 1;
    return Math.min(a, b) + Math.floor(Math.random() * range);
}

/**
 * Rolls a random integer between 0 and max, but not including max.
 * @param max The upper limit.
 * @returns A random integer between 0 and max, not inclusive.
 */
export function randomZero(max: number): number {
    return Math.floor(Math.random() * max);
}

/**
 * Class for object oriented programming events.
 */
export class ClassEvent {
    /** List of registered callbacks */
    private _callbacks: ((eventArgs: any) => void)[];

    /** Registers the given function to be called when the event is raised. */
    register(callback: (eventArgs: any) => void): void {
        this._callbacks.push(callback);
    }

    /** Removes the given function from the registered entries. */
    unregister(callback: (eventArgs: any) => void): void {
        let index = this._callbacks.indexOf(callback);
        if (index != -1)
            this._callbacks.splice(index, 1);
    }

    /** Raises the event, calling all functions that have been registered so far */
    raise(eventArgs: any): void {
        this._callbacks.forEach(callback => callback(eventArgs));
    }
}

/**
 * A point in a two dimensional space.
 */
export class Point {
    /** Horizontal coordinate. */
    X: number;
    /** Vertical coordinate. */
    Y: number;

    constructor(x: number, y: number) {
        this.X = x;
        this.Y = y;
    }
}

/**
 * A line between two points.
 */
export class Edge {
    /** Startpoint of the edge. */
    Start: Point;
    /** Endpoint of the edge. */
    End: Point;
}

/**
 * Class that defines a shape made of multiple edges.
 */
export class Shape {
    /** Collection of edges that create an enclosing shape. */
    Edges: Edge[];

    checkPoint(point: Point): boolean;
    checkPoint(x: number, y: number): boolean;

    checkPoint(first: number | Point, second?: number): boolean {
        if (first instanceof Point) {
            return this.checkPoint_intern(first);
        }
        else if (typeof first === 'number' && typeof second === 'number') {
            let point = new Point(first, second);
            return this.checkPoint_intern(point);
        }
    }

    private checkPoint_intern(point: Point): boolean {
        return false // TODO: calculate
    }
}

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