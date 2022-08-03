import { Item } from '../entity_classes/item.js';
import { Party } from './party.js';
import { VTuberInstance } from './vtuber.js';

/**
 * Persistent player data.
 */
export class PlayerState {
    /** The list of parties. */
    static Parties: Party[] = [];
    /** The list of VTubers. */
    static VTubers: VTuberInstance[] = [];
    /** The list of global items. */
    static Items: Item[] = [];
}