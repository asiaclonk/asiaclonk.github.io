import { DataCollection } from '../common/base_classes.js';
import { WorldMap } from '../entity_classes/map.js';

export class Data_Map {
    /** The main world map. */
    static ID_0000_WorldMap = new WorldMap(0, 'World Map', '', 'A world torn by isolation. Ripe with dungeons and loot!', '');

    /** The list of all maps. */
    static Maps = new DataCollection<WorldMap>([
        Data_Map.ID_0000_WorldMap
    ]);
}