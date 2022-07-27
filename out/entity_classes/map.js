import { DataCollection, DataTemplate } from "../common/base_classes.js";
/**
 *
 */
export class WorldMap extends DataTemplate {
    constructor(mapData, id, name, note, lore, icon) {
        super(id, name, note, lore, icon);
    }
}
//#region Map entries
/** The main world map. */
WorldMap.ID_0000_WorldMap = new WorldMap([
    []
], 0, "World Map", "", "A world torn by isolation. Ripe with dungeons and loot!", "");
//#endregion
/** The list of all maps. */
WorldMap.Maps = new DataCollection([
    WorldMap.ID_0000_WorldMap
]);
//# sourceMappingURL=map.js.map