import { Item } from "../data/item.js";
import { Party } from "./party.js";
import { VTuberInstance } from "./vtuber";

/**
 * Persistent player data.
 */
export class PlayerState {
    /** The list of parties. */
    Parties: Party[];
    /** The list of VTubers. */
    VTubers: VTuberInstance[];
    /** The list of global items. */
    Items: Item[];
}