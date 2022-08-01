import { DataCollection } from '../common/base_classes.js';
import { WorldMap } from '../entity_classes/map.js';
export class Data_Map {
}
/** The main world map. */
Data_Map.ID_0000_WorldMap = new WorldMap(0, 'World Map', '', 'A world torn by isolation. Ripe with dungeons and loot!', '');
/** The list of all maps. */
Data_Map.Maps = new DataCollection([
    Data_Map.ID_0000_WorldMap
]);
//# sourceMappingURL=map.js.map