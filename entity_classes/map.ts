import { DataCollection, DataTemplate } from "../common/base_classes.js";
import { MapTile } from "./map_tile.js";

/**
 * 
 */
export class WorldMap extends DataTemplate {
    //#region Map entries
    /** The main world map. */
    static ID_0000_WorldMap = new WorldMap([
        []
    ], 0, "World Map", "", "A world torn by isolation. Ripe with dungeons and loot!", "");
    //#endregion

    /** The list of all maps. */
    static Maps = new DataCollection<WorldMap>([
        WorldMap.ID_0000_WorldMap
    ]);

    //#region Class definition
    /** The matrix of tiledata. */
    MapData: MapTile[][];

    constructor(mapData: MapTile[][], id: number, name?: string, note?: string, lore?: string, icon?: string) {
        super(id, name, note, lore, icon);
    }
    //#endregion
}
