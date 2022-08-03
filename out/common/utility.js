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
    constructor() {
        /** List of registered callbacks. */
        this._callbacks = [];
    }
    /**
     * Registers a function to be called when the event is raised.
     * @param callback The function to add to the call list.
     */
    register(callback) {
        this._callbacks.push(callback);
    }
    /**
     * Removes the given function from the registered entries.
     * @param callback The function to remove from the call list.
     */
    unregister(callback) {
        let index = this._callbacks.indexOf(callback);
        if (index != -1)
            this._callbacks.splice(index, 1);
    }
    /**
     * Raises the event, calling all functions that have been registered so far.
     * @param eventArgs Data to be passed to listeners of the event.
     */
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
    /**
     * Checks if the given point is at the same coordinates as this point.
     * @param point The point to check against.
     */
    equals(point) {
        return this.X == point.X && this.Y == point.Y;
    }
}
/**
 * A line between two points.
 */
export class Edge {
    constructor(start, end) {
        this.Start = start;
        this.End = end;
    }
    /**
     * Checks if a point is directly on the edge.
     * @param point The point to check against.
     */
    onEdge(point) {
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
    orientation(point) {
        let val = (this.Start.Y - this.End.Y) * (point.X - this.Start.X) - (this.Start.X - this.End.X) * (point.Y - this.Start.Y);
        return Math.sign(val);
    }
    /**
     * Checks if an edge intersects with this one.
     * Taken from https://www.geeksforgeeks.org/check-if-two-given-line-segments-intersect/
     * @param edge The other edge to check against.
     */
    intersects(edge) {
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
        if (o1 == 0 && this.onEdge(edge.Start))
            return true;
        // p1, q1 and q2 are collinear and q2 lies on segment p1q1
        if (o2 == 0 && this.onEdge(edge.End))
            return true;
        // p2, q2 and p1 are collinear and p1 lies on segment p2q2
        if (o3 == 0 && edge.onEdge(this.Start))
            return true;
        // p2, q2 and q1 are collinear and q1 lies on segment p2q2
        if (o4 == 0 && edge.onEdge(this.End))
            return true;
        return false; // Doesn't fall in any of the above cases
    }
    /** Checks if a point going right intersects with this edge as part of a shape check. */
    rightIntersect(point) {
        let edge = new Edge(point, new Point(9999999, point.Y));
        return this.intersects(edge);
    }
}
/**
 * Class that defines a shape made of multiple edges.
 */
export class Shape {
    constructor(edges) {
        this.Edges = edges;
    }
    /** Creates a shape defined by an ordered set of points. */
    static fromPoints(...points) {
        if (points.length < 3)
            throw Error('A full 2D shape requires at least 3 points.');
        let edges = [];
        for (let i = 0; i < points.length - 1; i++) {
            // All edges until second to last
            edges.push(new Edge(points[i], points[i + 1]));
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
    checkPoint(point) {
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
    isComplete() {
        let points = this.Edges.flatMap(edge => [edge.Start, edge.End]);
        return !points.some(point => points.filter(other => other.equals(point)).length <= 1);
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
//# sourceMappingURL=utility.js.map