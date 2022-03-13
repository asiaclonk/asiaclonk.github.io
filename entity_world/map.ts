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
    /** The current floor when inside a dungeon. 0 means outside. */
    Floor: number;

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