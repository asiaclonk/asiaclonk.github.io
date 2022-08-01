/**
 * Main script loaded by the homepage.
 */
import { GUICollection } from '../gui/collection.js';
import { GUIWindow } from '../gui/gui_window.js';
import { GUIMap } from '../gui/map.js';
document.addEventListener('DOMContentLoaded', function () {
    let buttons = document.getElementsByClassName('bottom-tab');
    for (let button of buttons) {
        button.onclick = function () { new GUIWindow('Hello World', 180, 240, new GUICollection()); };
    }
    GUIMap.setSize(2000, 2000);
    GUIMap.enableDrag();
});
//# sourceMappingURL=main.js.map