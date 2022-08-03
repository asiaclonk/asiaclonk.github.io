import { DataCollection } from '../common/base_classes.js';
import { Point } from '../common/utility.js';
import { Place } from '../entity_classes/map.js';

export class Data_Place {
    /** Test location. */
    static ID_0000_Debug = new Place(0, new Point(397, 354), [], './media/images/icon/map_icon.png', 'Zombo.com', 'Welcome to Zombo.com', 'Welcome ... to ZomboCom.\nThis ... is ... ZomboCom. Welcome. This is ZomboCom; welcome ... to ZomboCom. You can do anything at ZomboCom. Anything at all. The only limit is yourself. Welcome ... to ZomboCom.\nWelcome ... to ZomboCom. This is ... ZomboCom. Welcome ... to ZomboCom! This is ZomboCom, welcome! Yes ... This ... is ZomboCom.\nThis is ZomboCom! And welcome to you, who have come to ZomboCom. Anything ... is possible ... at ZomboCom. You can do ... anything at ZomboCom. The infinite is possible at ZomboCom. The unattainable is unknown at ZomboCom. Welcome to ZomboCom. This ... is ZomboCom.\nWelcome to ZomboCom. Welcome. This ... is ... ZomboCom. Welcome ... to ZomboCom! Welcome ... to ZomboCom.', './media/images/icon/map_icon.png');

    /** The list of all places. */
    static List = new DataCollection<Place>([
        Data_Place.ID_0000_Debug,
    ]);
}