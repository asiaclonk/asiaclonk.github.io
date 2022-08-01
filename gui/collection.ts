import { GUIElement } from './gui_element.js';

export class GUICollection extends GUIElement {
    constructor() {
        super('flex');
        this.Container.innerHTML = 'absolutely riveting content';
    }
}