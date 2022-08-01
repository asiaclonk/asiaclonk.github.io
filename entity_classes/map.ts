import { DataTemplate } from '../common/base_classes.js';

/**
 * Class for defining map properties such as gold gain and movement speed.
 */
export class WorldMap extends DataTemplate {
    /** The matrix of movespeed multipliers. */
    Move: number[][];
    /** The matrix of XP gain per second. */
    XP: number[][];
    /** The matrix of gold gain per second. */
    Gold: number[][];
    /** The matrix of strength requirements. */
    Danger: number[][];
    /** The matrix of blocking tiles. */
    Block: boolean[][];

    /** A link to the image of the map. */
    Image: string;

    constructor(id: number, name?: string, note?: string, lore?: string, icon?: string) {
        super(id, name, note, lore, icon);
    }
}
