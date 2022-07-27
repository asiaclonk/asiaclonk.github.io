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
//# sourceMappingURL=utility.js.map