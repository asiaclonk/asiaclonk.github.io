import { Item } from '../entity_classes/item.js';
import { ActiveSkill, PassiveSkill } from '../entity_classes/skill.js';
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
    /** List of registered callbacks. */
    private _callbacks: ((eventArgs: any) => void)[] = [];

    /**
     * Registers a function to be called when the event is raised.
     * @param callback The function to add to the call list.
     */
    register(callback: (eventArgs: any) => void): void {
        this._callbacks.push(callback);
    }

    /**
     * Removes the given function from the registered entries.
     * @param callback The function to remove from the call list.
     */
    unregister(callback: (eventArgs: any) => void): void {
        let index = this._callbacks.indexOf(callback);
        if (index != -1)
            this._callbacks.splice(index, 1);
    }

    /**
     * Raises the event, calling all functions that have been registered so far.
     * @param eventArgs Data to be passed to listeners of the event.
     */
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

    /**
     * Checks if the given point is at the same coordinates as this point.
     * @param point The point to check against.
     */
    equals(point: Point) {
        return this.X == point.X && this.Y == point.Y;
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

    constructor(start: Point, end: Point) {
        this.Start = start;
        this.End = end;
    }

    /**
     * Checks if a point is directly on the edge.
     * @param point The point to check against.
     */
    onEdge(point: Point): boolean {
        return this.Start.X <= Math.max(this.End.Y, point.X) &&
               this.Start.X >= Math.min(this.End.X, point.X) &&
               this.Start.Y <= Math.max(this.End.Y, point.Y) &&
               this.Start.Y >= Math.min(this.End.Y, point.Y);
    }

    /**
     * Determines the orientation of a point relative to this edge.
     * @param point The point to check against.
     * @returns -1 if counterclockwise, 0 if collinear, 1 if clockwise
     */
    orientation(point: Point): number {
        let val = (this.Start.Y - this.End.Y) * (point.X - this.Start.X) - (this.Start.X - this.End.X) * (point.Y - this.Start.Y);
        return Math.sign(val);
    }

    /**
     * Checks if an edge intersects with this one.
     * Taken from https://www.geeksforgeeks.org/check-if-two-given-line-segments-intersect/
     * @param edge The other edge to check against.
     */
    intersects(edge: Edge): boolean {
        // Find the four orientations needed for general and special cases
        let o1 = this.orientation(edge.Start);
        let o2 = this.orientation(edge.End);
        let o3 = edge.orientation(this.Start);
        let o4 = edge.orientation(this.End);
        
        // General case
        if (o1 != o2 && o3 != o4)
            return true;
        
        // Special Cases
        // p1, q1 and p2 are collinear and p2 lies on segment p1q1
        if (o1 == 0 && this.onEdge(edge.Start)) return true;
        
        // p1, q1 and q2 are collinear and q2 lies on segment p1q1
        if (o2 == 0 && this.onEdge(edge.End)) return true;
        
        // p2, q2 and p1 are collinear and p1 lies on segment p2q2
        if (o3 == 0 && edge.onEdge(this.Start)) return true;
        
        // p2, q2 and q1 are collinear and q1 lies on segment p2q2
        if (o4 == 0 && edge.onEdge(this.End)) return true;
        
        return false; // Doesn't fall in any of the above cases
    }

    /** Checks if a point going right intersects with this edge as part of a shape check. */
    rightIntersect(point: Point): boolean {
        let edge = new Edge(point, new Point(9999999, point.Y));
        return this.intersects(edge);
    }
}

/**
 * Class that defines a shape made of multiple edges.
 */
export class Shape {
    /** Collection of edges that create an enclosing shape. */
    Edges: Edge[];

    constructor(edges: Edge[]) {
        this.Edges = edges;
    }

    /** Creates a shape defined by an ordered set of points. */
    static fromPoints(...points: Point[]): Shape {
        if (points.length < 3)
            throw Error('A full 2D shape requires at least 3 points.');

        let edges = [];
        for (let i = 0; i < points.length - 1; i++) {
            // All edges until second to last
            edges.push(new Edge(points[i], points[i+1]));
        }
        // Last edge
        edges.push(new Edge(points[-1], points[0]));

        return new Shape(edges);
    }

    /**
     * Checks if a point is inside this shape.
     * The theory is that if the number of intersections of a rightgoing point is odd, it is inside the shape.
     * @param point The point to check against.
     */
    checkPoint(point: Point): boolean {
        console.assert(this.isComplete(), 'This shape is not fully enclosing.');

        let intersections = 0;
        this.Edges.forEach(edge => {
            if (edge.rightIntersect(point))
                intersections++;
        });

        return intersections % 2 == 1;
    }

    /**
     * Debug function to test if the shape is actually a full shape.
     */
    private isComplete(): boolean {
        let points = this.Edges.flatMap(edge => [edge.Start, edge.End]);
        return !points.some(point => points.filter(other => other.equals(point)).length <= 1);
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