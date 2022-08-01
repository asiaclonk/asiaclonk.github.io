/**
 * Sum function for use in reduce.
 * @param a Summand 1.
 * @param b Summand 2.
 * @returns The sum of a and b.
 */
export function sum(a, b) {
    return a + b;
}
/**
 * Rolls a random integer between a and b, both inclusive.
 * @param a One of the limits.
 * @param b The other limit.
 * @returns A random integer between a and b.
 */
export function randomInt(a, b) {
    var range = Math.abs(b - a) + 1;
    return Math.min(a, b) + Math.floor(Math.random() * range);
}
/**
 * Rolls a random integer between 0 and max, but not including max.
 * @param max The upper limit.
 * @returns A random integer between 0 and max, not inclusive.
 */
export function randomZero(max) {
    return Math.floor(Math.random() * max);
}
/**
 * Class for object oriented programming events.
 */
export class ClassEvent {
    /** Registers the given function to be called when the event is raised. */
    register(callback) {
        this._callbacks.push(callback);
    }
    /** Removes the given function from the registered entries. */
    unregister(callback) {
        let index = this._callbacks.indexOf(callback);
        if (index != -1)
            this._callbacks.splice(index, 1);
    }
    /** Raises the event, calling all functions that have been registered so far */
    raise(eventArgs) {
        this._callbacks.forEach(callback => callback(eventArgs));
    }
}
/**
 * A point in a two dimensional space.
 */
export class Point {
    constructor(x, y) {
        this.X = x;
        this.Y = y;
    }
}
/**
 * A line between two points.
 */
export class Edge {
}
/**
 * Class that defines a shape made of multiple edges.
 */
export class Shape {
    checkPoint(first, second) {
        if (first instanceof Point) {
            return this.checkPoint_intern(first);
        }
        else if (typeof first === 'number' && typeof second === 'number') {
            let point = new Point(first, second);
            return this.checkPoint_intern(point);
        }
    }
    checkPoint_intern(point) {
        return false; // TODO: calculate
    }
}
/** Grouping of all kinds of different things. */
export class StateRequirement {
}
/**
 * Grouping of skills and level requirements.
 */
export class SkillLevelRequirement {
    /**
     * Creates a new skill with a level requirement.
     * @param requirement The level requirement for unlocking the accompanying skill.
     * @param skill The skill being locked behind the level requirement.
     */
    constructor(requirement, skill) {
        this.RequiredLevel = requirement;
        this.Skill = skill;
    }
}
/**
 * Grouping of item and drop probability.
 */
export class ItemDrop {
    /**
     * Creates a new item drop.
     * @param amount The amount of stacks that drops from this.
     * @param item The item in question.
     * @param weight The dropweight of the item compared to others.
     */
    constructor(item, amount, weight) {
        this.Item = item;
        this.Amount = amount;
        this.Weight = weight;
    }
}
/**
 * Defines the position of a party in the game, on the map and inside dungeons.
 */
export class Position {
    /**
     * Creates a new position.
     * @param x The X position on the current map.
     * @param y The Y position on the current map.
     */
    constructor(x, y) {
        this.XPos = x;
        this.YPos = y;
    }
}
//# sourceMappingURL=utility.js.map