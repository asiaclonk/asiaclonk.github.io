import { Item } from "../entity_classes/item.js";
import { Party } from "./party.js";
import { VTuberInstance } from "./vtuber.js";

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