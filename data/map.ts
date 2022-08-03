import { DataCollection } from '../common/base_classes.js';
import { Edge, Point, Shape } from '../common/utility.js';
import { GameMap, Place, Region } from '../entity_classes/map.js';
import { Data_Place } from './place.js';

export class Data_Map {
    /** The main world map. */
    static ID_0000_Debug = new GameMap(0,
        [
            new Region(0, 0, 1, Shape.fromPoints(new Point(0,0), new Point(512,0), new Point(512,512), new Point(0,512)), 0)
        ], [], [Data_Place.ID_0000_Debug], "./media/images/map/demo.png", new Point(512,512), 'Demo Map', 'Do not use', 'Buy me a coffee while you are here');

    /** The list of all maps. */
    static Maps = new DataCollection<GameMap>([
        Data_Map.ID_0000_Debug
    ]);
}