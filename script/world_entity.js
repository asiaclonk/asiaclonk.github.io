import {VTProp} from '../data/vtubers.js';

class VTuber {
    constructor (data) {
        this.name = data[VTProp.Name]
    }
}