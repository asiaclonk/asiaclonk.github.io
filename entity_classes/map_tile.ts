import { Position } from "../common/struct.js";
import { ItemDropTable } from "./item_droptable.js";

/**
 * A tile on a map.
 */
export class MapTile {
    /** The minimum strength required to be able to earn xp and resources on this tile. */
    RequiredStrength: number;
    /** The amount of xp earned by the party per second. */
    XPGain: number;
    /** The list of item groups and their harvest time */
    Droptable: ItemDropTable;
    /** The icon on this tile, if any. */
    Icon: string;
    /** If the player can change world maps on this tile, a position to the new location will be here. */
    Transition: Position;
    /** The list of locations on this tile, if any. */
    Locations: Location[];

    constructor(requiredStrength: number, xpGain: number, dropTable: ItemDropTable) {
        this.Droptable = dropTable;
        this.RequiredStrength = requiredStrength;
        this.XPGain = xpGain;
    }
}