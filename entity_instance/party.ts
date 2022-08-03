import { Point, sum } from '../common/utility.js';
import { VTuberInstance } from './vtuber.js';

export class Party {
    /** Current map where the party is on. */
    MapId: number;
    /** Coordinates where the party is currently on */
    Coordinates: Point;
    /** List of VTuber instances. */
    Members: VTuberInstance[]

    constructor(coordinates: Point, mapId: number, members?: VTuberInstance[]) {
        this.Coordinates = coordinates;
        this.MapId = mapId,
        this.Members = members ?? [];
    }

    /** Combined strength of all party members. */
    get TotalStrength(): number {
        return this.Members.map((vtub) => vtub.BaseStrength).reduce(sum, 0);
    }
}