/**
 * Rolls a random integer between a and b, both inclusive.
 * @param a One of the limits.
 * @param b The other limit.
 * @returns A random integer between a and b.
 */
export function random_int(a, b) {
    var range = Math.abs(b - a) + 1;
    return Math.min(a, b) + Math.floor(Math.random() * range);
}
/**
 * Rolls a random integer between 0 and max, but not including max.
 * @param max The upper limit.
 * @returns A random integer between 0 and max, not inclusive.
 */
export function random_zerobase(max) {
    return Math.floor(Math.random() * max);
}
//# sourceMappingURL=utility.js.map