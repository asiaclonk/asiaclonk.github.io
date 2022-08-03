/**
 * Main script loaded by the homepage.
 */
import { Point } from '../common/utility.js';
import { Data_Map } from '../data/map.js';
import { Party } from '../entity_instance/party.js';
import { PlayerState } from '../entity_instance/player_state.js';
import { VTuberInstance } from '../entity_instance/vtuber.js';
import { GUICollection } from '../gui/collection.js';
import { GUIWindow } from '../gui/gui_window.js';
import { GUIMap } from '../gui/map.js';
document.addEventListener('DOMContentLoaded', function () {
    let buttons = document.getElementsByClassName('bottom-tab');
    for (let i = 0; i < buttons.length; i++) {
        buttons.item(i).onclick = function () { new GUIWindow('Hello World', 180, 240, new GUICollection()); };
    }
    GUIMap.initialize();
    GUIMap.setMap(Data_Map.ID_0000_Debug);
    PlayerState.VTubers.push(new VTuberInstance(0, 0, 0));
    PlayerState.Parties.push(new Party(new Point(100, 100), 0, PlayerState.VTubers));
});
//# sourceMappingURL=main.js.map